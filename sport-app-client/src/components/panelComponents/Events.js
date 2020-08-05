import React, {Component} from 'react';

import EventSoccer from "./EventSoccer";
import {Card, Col, Row} from "react-bootstrap";

class Events extends Component {
    render() {
        return (
            <>
                <Card bg='dark'>
                    <Card.Header style={{paddingTop: "4px", textAlign: "center"}}>
                        <Row style={{textAlign: "center"}}>
                            <Col>
                                <b>Piłka nożna</b>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body style={{padding: 0}}>
                        <EventSoccer/>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Events;