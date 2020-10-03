import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from "../common/CardC";
import styled from "styled-components";
import {dateTimeToWords} from "../../util/timeFormat";
import {formatText} from "../../util/textFormat";

class Entry extends Component {

  render() {
    const {entry} = this.props;
    const entryTime = dateTimeToWords(entry.createdAt);

    return (
        <Card>
          <CardHeader style={{fontSize: '1rem'}}>
            <b style={{marginRight: '7px'}}>{entry.author.username}</b>
            {entryTime}
            <div style={{margin: "0 5px 0 auto"}}>{entry.score}</div>
          </CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={formatText(entry.value)}/>
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