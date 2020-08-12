import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import Events from "./Events";

class GameEvents extends Component {
    render() {
        return (
            <Card bg="dark" text="white">
                <Card.Header style={{padding: "3px 15px"}}>
                    <Row>
                        <Col style={{lineHeight: '38px', textAlign: 'left'}}>
                                <span style={{verticalAlign: 'middle'}}>
                                        <p style={{fontSize: '17px', margin: 0}}>Wyniki</p>
                                </span>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: "8px"}}>
                    <Events/>
                </Card.Body>
            </Card>
        );
    }
}

export default GameEvents;