import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {getComments} from "../../util/apiUtils/CommentUtils";

class AllComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: []
        };
    }

    componentDidMount() {
        getComments(this.props.entryId)
            .then(response => {
                this.setState({
                    comments: response
                });
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.entryToUpdate !== prevProps.entryToUpdate) {
            getComments(this.props.entryId)
                .then(response => {
                    this.setState({
                        comments: response
                    });
                });
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.comments && this.state.comments.map(comment => (
                        <Row key={comment.id} style={{marginBottom: '3px'}}>
                            <Card bg={"dark"} style={{width: '100%'}}>
                                <Card.Header style={{paddingBottom: '3px', paddingTop: '3px'}}>
                                    <Row>
                                        <Col md="auto">
                                            {comment.author.username}
                                        </Col>
                                        <Col>
                                            {comment.createdAt}
                                        </Col>
                                        <Col className="text-right" xs={"auto"}>
                                            {comment.score}
                                        </Col>
                                    </Row>
                                </Card.Header>
                                <Card.Body style={{paddingBottom: '3px', paddingTop: '3px'}}>
                                    <Row>
                                        <Col>{comment.value}</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Row>
                    ))
                }
            </React.Fragment>
        );
    }
}

export default AllComments;