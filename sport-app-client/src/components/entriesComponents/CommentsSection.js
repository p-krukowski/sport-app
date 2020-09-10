import React, {Component} from 'react';
import styled from "styled-components";
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import Button from "../common/Button";
import {getComments} from "../../util/apiUtils/CommentUtils";

const showCommentsText = "Pokaż komentarze";
const hideCommentsText = "Ukryj komentarze";

class CommentsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      buttonText: showCommentsText,
      showNewComment: false,
      commentsAmount: this.props.commentsAmount
    }
  }

  setShowComments = (b) => {
    if (b) {
      this.showComments();
    } else {
      this.hideComments();
    }
  };

  showComments = () => {
    this.updateComments();
  };

  hideComments = () => {
    this.setState({
      showComments: false,
      buttonText: showCommentsText
    });
  };

  updateComments = () => {
    getComments(this.props.entryId)
    .then(response => {
      this.setState({
        comments: response,
        commentsAmount: response.length,
        showComments: true,
        buttonText: hideCommentsText
      });
    });
  };

  handleComment = () => {
    if (this.state.showNewComment) {
      this.setState({
        showNewComment: false
      });
    } else {
      this.setState({
        showNewComment: true
      });
      if (!this.state.showComments) {
        this.showComments(true);
      }
    }
  }

  render() {
    return (
        <CommentsSectionLayout>
          <CommentsSectionOptions>
            <Button
                onClick={() => this.setShowComments(!this.state.showComments)}>
              {this.state.buttonText} ({this.state.commentsAmount})
            </Button>
            {
              this.props.isAuthenticated &&
              <Button onClick={this.handleComment}>
                Skomentuj
              </Button>
            }
          </CommentsSectionOptions>
          {
            this.state.showNewComment &&
            <NewComment entryId={this.props.entryId}
                        updateComments={this.updateComments}
                        hideNewComment={this.handleComment}
            />
          }
          {
            this.state.showComments &&
            <AllComments comments={this.state.comments}/>
          }
        </CommentsSectionLayout>
    );
  }
}

export default CommentsSection;

const CommentsSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CommentsSectionOptions = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
`