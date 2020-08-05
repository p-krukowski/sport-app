import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {addComment, getComments} from "../../util/apiUtils/CommentUtils";

class NewComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCommentField: true,
            showCommentId: null,
            comments: []
        };
    }

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
                        this.props.hideNewComment();
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
            <Row>
                <Col>
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
                            <Button onClick={this.props.hideNewComment} variant="light"
                                    style={{height: '100%'}}>X</Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        );
    }
}

export default NewComment;