import React, {Component} from 'react';
import styled from "styled-components";
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import Button from "../common/Button";

const showCommentsText = "Pokaż komentarze";
const hideCommentsText = "Ukryj komentarze";

class CommentsSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showComments: false,
      buttonText: showCommentsText,
      entryToUpdate: null,
      showNewComment: false
    }
  }

  handleShowComments = () => {
    if (!this.state.showComments) {
      this.showComments();
    } else {
      this.hideComments();
    }
  };

  showComments = () => {
    this.setState({
      showComments: true,
      buttonText: hideCommentsText
    });
  };

  hideComments = () => {
    this.setState({
      showComments: false,
      buttonText: showCommentsText
    });
  };

  updateComments = (entryId) => {
    this.setState({
      entryToUpdate: entryId
    })
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
      this.showComments();
    }
  }

  render() {
    return (
        <CommentsSectionLayout>
          <CommentsSectionOptions>
            <Button onClick={this.handleShowComments}>
              {this.state.buttonText} ({this.props.commentsAmount})
            </Button>
            {
              this.props.isAuthenticated &&
              <Button onClick={this.handleComment}
                      disabled={this.state.showNewComment}>
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
            <AllComments entryId={this.props.entryId}
                         entryToUpdate={this.state.entryToUpdate}/>
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