import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from "../common/CardC";
import styled from "styled-components";

class Entry extends Component {

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

  render() {
    const {entry} = this.props;

    return (
        <Card>
          <CardHeader style={{fontSize: '1rem'}}>
            <b style={{marginRight: '7px'}}>{entry.author.username}</b>
            {entry.createdAt}
            <div style={{margin: "0 5px 0 auto"}}>{entry.score}</div>
          </CardHeader>
          <CardBody>
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