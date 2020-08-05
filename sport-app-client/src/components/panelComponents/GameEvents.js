import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Events from "./Events";

class GameEvents extends Component {
    render() {
        return (
            <Card bg="dark" text="white" style={{width: "300px"}}>
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