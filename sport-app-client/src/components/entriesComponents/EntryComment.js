import React, {Component} from "react";
import styled from "styled-components";
import {Card, CardBody, CardHeader} from "../common/CardC";
import {theme} from "../../util/theme";
import {dateTimeToWords} from "../../util/timeFormat";
import Button from "../common/Button";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import {addPointToComment} from "../../util/apiUtils/CommentUtils";
import {formatText} from "../../util/textFormat";

class EntryComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment
    }
  }

  handleUpvoteButton = (commentId) => {
    addPointToComment(commentId)
    .then(response => {
      this.setState({
        comment: {
          ...this.state.comment,
          score: response
        }
      });
    })
    .catch(error => {
      alert("Błąd serwera");
    });
  };

  render() {
    const {comment} = this.state;
    const commentTime = dateTimeToWords(comment.createdAt);

    return (
        <EntryCommentLayout>
          <CardHeader style={{fontSize: "1rem"}}>
            <b
                style={{marginRight: '7px'}}>{comment.author.username}</b>
            <span>{commentTime}</span>
            <span style={{marginLeft: 'auto'}}>{comment.score}</span>
            {
              this.props.isAuthenticated &&
              <Button onClick={() =>
                  this.handleUpvoteButton(comment.id)}>
                <ArrowDropUpIcon />
              </Button>
            }
          </CardHeader>
          <CardBody>
            <div dangerouslySetInnerHTML={formatText(comment.value)}/>
            {
              comment.imageUrl !== null &&
              <>
                <ImageDiv>
                  <ImageCustom src={comment.imageUrl}
                               onClick={this.showImageModal}/>
                </ImageDiv>
                <ImageLink href={comment.imageUrl}
                           target="_blank">Źródło</ImageLink>
              </>
            }
          </CardBody>
        </EntryCommentLayout>
    );
  }
}

export default EntryComment;

const EntryCommentLayout = styled(Card)`
  background: ${theme.colors.background};
  border-color: ${theme.colors.navbar};
  margin-bottom: 3px;
`

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