import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";

class Entry extends Component {

    render() {
        const {entry} = this.props;

        return (
            <Card bg="dark" text="white" style={{marginBottom: '5px'}}>
                <Card.Header>
                    <Row>
                        <Col>{entry.createdAt}</Col>
                        <Col className="text-right" xs={"auto"}>{entry.score}</Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <Row>
                        <Col>{entry.value}</Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default Entry;