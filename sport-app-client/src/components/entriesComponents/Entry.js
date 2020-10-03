import React, {Component} from 'react';
import styled from "styled-components";

import CommentsSection from "./CommentsSection";
import {addPointToEntry} from "../../util/apiUtils/EntriesUtils";
import {ImageModal, ImageModalContent} from "../common/ImageModal";
import {Card, CardBody, CardFoot, CardHeader} from "../common/CardC";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Button from "../common/Button";
import {dateTimeToWords} from "../../util/timeFormat";

class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entry: this.props.entry,
      showImageModal: false
    };
  }

  handleAddButton = (entryId) => {
    addPointToEntry(entryId)
    .then(response => {
      this.setState({
        entry: {
          ...this.state.entry,
          score: response
        }
      });
    })
    .catch(error => {
      alert("Błąd serwera");
    });
  };

  formatText(text) {
    let textArray = text.split(' ');
    let newTextArray = "";
    for (let word of textArray) {
      if (word.match("[#]{1}[\\w]{3,}")) {
        word = word.bold();
      }
      newTextArray = newTextArray.concat(" ", word);
    }
    return {__html: newTextArray};
  }

  handleClick = () => {
    this.setState({
      showImageModal: false
    })
  }

  showImageModal = () => {
    if (this.state.showImageModal) {
      document.removeEventListener('mousedown', this.handleClick);
      this.setState({
        showImageModal: false
      })
    } else {
      document.addEventListener('mousedown', this.handleClick);
      this.setState({
        showImageModal: true
      })
    }
  }

  render() {
    const {entry} = this.state;
    const entryTime = dateTimeToWords(entry.createdAt);

    return (
        <Card>
          <CardHeader style={{fontSize: '1rem'}}>
            <b style={{marginRight: '7px'}}>{entry.author.username}</b>
            {entryTime}
            <div style={{margin: "0 5px 0 auto"}}>{entry.score}</div>
            {
              this.props.isAuthenticated &&
              <Button onClick={() => this.handleAddButton(
                  entry.id)}>
                <ArrowDropUpIcon />
              </Button>
            }
          </CardHeader>
          <CardBody >
             <div dangerouslySetInnerHTML={this.formatText(entry.value)}/>
            {
              entry.imageUrl !== null &&
              <>
                <ImageDiv>
                  <ImageCustom src={entry.imageUrl}
                               onClick={this.showImageModal}/>
                </ImageDiv>
                <ImageLink href={entry.imageUrl}
                           target="_blank">Źródło</ImageLink>
              </>
            }
          </CardBody>
          <CardFoot style={{fontSize: '1rem'}}>
            <CommentsSection entryId={entry.id}
                             commentsAmount={entry.commentsAmount}
                             isAuthenticated={this.props.isAuthenticated}/>
          </CardFoot>

          {
            this.state.showImageModal &&
            <ImageModal>
              <ImageModalContent src={entry.imageUrl}/>
            </ImageModal>
          }
        </Card>
    );
  }
}

export default Entry;

const ImageDiv = styled.div`
  margin-top: 10px;
  overflow: scroll;   
  width: 100%;
  max-height: 500px;
  
  @media only screen and (min-width: 768px) {
    max-height: 500px;
    width: 50%;
  }
`

const ImageCustom = styled.img`
  max-width: 100%;
  cursor: zoom-in;
`

const ImageLink = styled.a`
  color: white;
  transition: color .2s;
  
  :hover {
    color: lightgray;
    text-decoration: none;
  }
`