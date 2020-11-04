import React, {Component} from "react";
import styled from "styled-components";
import {Image} from "react-bootstrap";
import {fetchArticle} from "../../util/scrape";
import LinearProgress from "@material-ui/core/LinearProgress";
import {Form, Formik} from "formik";
import Button from "@material-ui/core/Button";
import {TextInput} from "../common/customInputs";
import * as Yup from 'yup';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import {addNews} from "../../util/apiUtils/NewsUtils";

class ExternalNewsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetching: false,
      isFetched: false,
      content: {
        imageURL: 'https://portalkomunalny.pl/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
        title: '',
        description: '',
        link: ''
      }
    }
  }

  loadFromLink = (url) => {
    this.setState({
      fetching: true
    });
    fetchArticle(url)
    .then(response => {
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
    })
  }

  handleCreate = (values) => {
    const content = {
      title: values.title,
      description: values.description,
      imageURL: this.state.content.imageURL,
      link: values.url
    }
    addNews(content)
    .then(response => {
      window.location.reload();
    });
  }

  render() {
    return (
        <ExternalNewsFormLayout>
          <Formik
              initialValues={{
                url: ''
              }}
              validationSchema={Yup.object({
                url: Yup.string()
                .url("Wpisany link jest niepoprawny")
                .required("Najpierw wpisz link")
              })}
              onSubmit={values => {
                this.loadFromLink(values.url);
              }}>
            <Form autoComplete="off">
              <UrlDiv>
                <TextInput
                    name="url"
                    label="Link: https://"
                    disabled={this.state.fetching}
                />
                <Button type="submit" variant="outlined" color="primary">
                  <SystemUpdateAltIcon color="primary"/>
                </Button>
              </UrlDiv>
            </Form>
          </Formik>
          {
            this.state.fetching ?
                <LinearProgress/>
                :
                <LinearProgress variant="determinate" value={0}/>
          }
          <Formik
              enableReinitialize
              initialValues={{
                url: this.state.content.link,
                title: this.state.content.title,
                description: this.state.content.description,
                tags: ''
              }}
              validationSchema={Yup.object({
                title: Yup.string()
                .max(90, "Wpisz nie więcej niż 90 znaków")
                .min(10, "Wpisz co najmniej 10 znaków")
                .required("To pole jest wymagane"),
                description: Yup.string()
                .max(350, "Wpisz nie więcej niż 350 znaków")
                .min(10, "Wpisz co najmniej 10 znaków")
                .required("To pole jest wymagane"),
              })}
              onSubmit={(values, {setSubmitting}) => {
                this.handleCreate(values);
              }}>
            <Form autoComplete="off">
              <BasicDataLayout>
                <Inputs>
                  <TextInput
                      name="title"
                      inputProps={{maxLength: 90}}
                      label="Tytuł"
                      disabled={!this.state.isFetched}
                  />
                  <TextInput
                      name="description"
                      multiline
                      rows={3}
                      inputProps={{maxLength: 350}}
                      label="Opis..."
                      disabled={!this.state.isFetched}
                  />
                </Inputs>
                <Image src={this.state.content.imageURL}
                       rounded
                       fluid
                       style={{height: "145px"}}/>
              </BasicDataLayout>
              <TextInput
                  name="tags"
                  inputProps={{maxLength: 100}}
                  label="#tag1 #tag2 ..."
                  disabled={!this.state.isFetched}
              />
              <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
              >
                Utwórz
              </Button>
            </Form>
          </Formik>
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
const UrlDiv = styled.div`
  display: flex;
`