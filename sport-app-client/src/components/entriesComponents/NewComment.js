import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {addComment, getComments} from "../../util/apiUtils/CommentUtils";

class NewComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCommentField: false,
            showCommentId: null,
            comments: []
        };
    }

    showCommentField = (id) => {
        this.setState({
            showCommentField: true,
            showCommentId: id
        });
        this.props.showComments();
    };
    hideCommentField = () => {
        this.setState({
            showCommentField: false,
            showCommentId: null
        })
    };

    handleAddComment = (e, entryId) => {
        e.preventDefault();

        const commentData = {
            value: this.state.value,
            entryId: entryId
        };

        this.setState({
            commentValue: '',
            showCommentField: false
        });

        addComment(commentData)
            .then(response => {
                return getComments(this.props.entryId)
                    .then(responseComments => {
                        this.setState({
                            comments: responseComments
                        });
                        this.props.updateComments(this.props.entryId);
                    });
            });

    };

    commentChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        const {commentValue} = this.state;

        return (
            <React.Fragment>
                {
                    this.props.isAuthenticated &&
                    <Row>
                        {
                            !this.state.showCommentField &&
                            <Col className="text-right">
                                <Nav.Link eventKey={this.props.entryId}
                                          onSelect={() => this.showCommentField(this.props.entryId)}
                                          style={{color: 'white'}}>skomentuj</Nav.Link>
                            </Col>
                        }

                        {
                            this.state.showCommentField &&
                            <Form inline onSubmit={(e) => this.handleAddComment(e, this.props.entryId)}
                                  style={{alignItems: 'stretch', width: '100%', marginTop: '10px', marginBottom: '10px'}}>

                                <Col style={{paddingLeft: '0px'}}>
                                    <Form.Control
                                        required
                                        name="value"
                                        value={commentValue}
                                        onChange={this.commentChange}
                                        as="textarea"
                                        rows="2"
                                        placeholder="Napisz komentarz..."
                                        style={{width: '100%'}}
                                    />

                                </Col>
                                <Col md="auto" style={{paddingLeft: '0', paddingRight: '5px'}}>
                                    <Button type="submit" style={{height: '100%'}}>Ok</Button>
                                </Col>
                                <Col md="auto" style={{paddingLeft: '0', paddingRight: '0'}}>
                                    <Button onClick={() => this.hideCommentField()} variant="light"
                                            style={{height: '100%'}}>X</Button>
                                </Col>

                            </Form>
                        }
                    </Row>
                }
            </React.Fragment>
        );
    }
}

export default NewComment;