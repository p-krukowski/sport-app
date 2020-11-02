import React, {Component} from "react";
import styled from "styled-components";
import {Image} from "react-bootstrap";
import {fetchArticle} from "../../util/scrape";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";

class ExternalNewsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      isFetched: false,
      content: {
        imageURL: 'https://portalkomunalny.pl/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
        title: null,
        description: null,
      }
    }
  }

  loadFromLink = (url) => {
    this.setState({
      fetching: true
    });
    fetchArticle(url)
    .then(response => {
      let content;
      if (response.description.length > 350) {
        response.description = response.description.slice(0, 347);
        response.description = response.description.concat('...');
      }
      if (response.title.length > 90) {
        response.title = response.title.slice(0, 87);
        response.title = response.title.concat('...');
      }
      content = {
        title: response.title,
        description: response.description,
        imageURL: response.imageURL,
        link: url
      }
      this.setState({
        content: {
          title: response.title,
          description: response.description,
          imageURL: response.imageURL,
          link: url
        },
        fetching: false,
        isFetched: true
      });
      this.props.updateFields(content);
    })
  }

  handleChange = (e) => {
    let content = this.state.content;
    this.setState({
      content: {
        ...this.state.content,
        [e.target.name]: e.target.value
      }
    })
    content = {
      ...content,
      [e.target.name]: e.target.value
    }
    this.props.updateFields(content);
  }

  render() {
    return (
        <ExternalNewsFormLayout>
          <form noValidate autoComplete="off">
            <TextField required
                       type="url"
                       label="Link: https://"
                       onChange={e => this.loadFromLink(e.target.value)}/>
            {
              this.state.fetching ?
                  <LinearProgress/>
                  :
                  <LinearProgress variant="determinate" value={0}/>
            }

            <BasicDataLayout>
              <Inputs>
                <TextField required
                           name="title"
                           maxLength='90'
                           label="Tytuł"
                           defaultValue={this.state.content.title}
                           disabled={!this.state.isFetched}
                           onChange={e => this.handleChange(e)}/>
                <TextField required
                           name="description"
                           multiline
                           rows={3}
                           maxLength='350'
                           label="Opis..."
                           defaultValue={this.state.content.description}
                           disabled={!this.state.isFetched}
                           onChange={e => this.handleChange(e)}/>
              </Inputs>
              <Image src={this.state.content.imageURL}
                     rounded
                     fluid
                     style={{height: "145px"}}/>
            </BasicDataLayout>
            <TextField name="tags"
                       rows={3}
                       maxLength='90'
                       label="#tag1 #tag2 ..."
                       disabled={!this.state.isFetched}
                       onChange={e => this.handleChange(e)}/>
          </form>
        </ExternalNewsFormLayout>
    );
  }
}

export default ExternalNewsForm;

const ExternalNewsFormLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  
  form > * {
    margin-top: 10px; 
  }
`
const BasicDataLayout = styled.div`
  display: flex;
`
const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
