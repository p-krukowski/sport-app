import React, {Component} from 'react';
import NewComment from "./NewComment";
import AllComments from "./AllComments";
import {Button, Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";

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
            <>
                <Row>
                    <Col>
                        <Button onClick={this.handleShowComments}
                                variant={"primary"}
                                style={{width: '100%', marginBottom: '10px', padding: '2px'}}>
                            {this.state.buttonText} ({this.props.commentsAmount})
                        </Button>
                    </Col>
                    {
                        this.props.isAuthenticated &&
                        <Col md='auto'>
                            <Button variant={"primary"}
                                    style={{width: '100%', marginBottom: '10px', padding: '2px'}}
                                    onClick={this.handleComment}
                                    disabled={this.state.showNewComment}>
                                Skomentuj
                            </Button>
                        </Col>
                    }
                </Row>
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
            </>
        );
    }
}

export default CommentsSection;