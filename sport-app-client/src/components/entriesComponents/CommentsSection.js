import React, {Component} from 'react';
import styled from "styled-components";
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import Button from "../common/Button";
import {getComments} from "../../util/apiUtils/CommentUtils";
import ToastCustom from "../common/Toast";

const showCommentsText = "Pokaż komentarze";
const hideCommentsText = "Ukryj komentarze";

class CommentsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      buttonText: showCommentsText,
      commentsAmount: this.props.commentsAmount,
      showNewComment: false,
      showToast: false
    }
  }

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
    this.showComments();
    this.setState({
      showNewComment: !this.state.showNewComment
    })
  }

  showToast = () => {
    this.setState({
      showToast: true
    })
  }

  hideToast = () => {
    this.setState({
      showToast: false
    })
  }

  render() {
    const {showComments, buttonText, commentsAmount, showNewComment, comments} = this.state;
    return (
        <CommentsSectionLayout>
          <CommentsSectionOptions>
            <Button
                onClick={showComments ? this.hideComments : this.showComments}>
              {buttonText} ({commentsAmount})
            </Button>
            {
              this.props.isAuthenticated &&
              <Button onClick={this.handleComment}>
                Skomentuj
              </Button>
            }
          </CommentsSectionOptions>
          <NewComment entryId={this.props.entryId}
                      updateComments={this.updateComments}
                      show={showNewComment}
                      showToast={this.showToast}/>
          {
            showComments &&
            <AllComments comments={comments}
                         isAuthenticated={this.props.isAuthenticated}/>
          }

          <ToastCustom show={this.state.showToast}
                 onClose={this.hideToast}
                 delay={10000}
                 autohide>
            <ToastCustom.Header>
              <strong className="mr-auto">SportApp</strong>
              <small>teraz</small>
            </ToastCustom.Header>
            <ToastCustom.Body>Dodano komentarz</ToastCustom.Body>
          </ToastCustom>
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