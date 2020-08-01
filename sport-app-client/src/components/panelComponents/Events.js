import React, {Component} from 'react';
import {Card, Col, Nav, Row} from "react-bootstrap";
import EventSoccer from "./EventSoccer";

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
                        <Row>
                            <Nav fill variant="tabs" defaultActiveKey="#first" style={{marginLeft: 0, width: '100%'}}>
                                <Nav.Item>
                                    <Nav.Link href="#first" name="4328"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>PL</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#second" name="4331"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>BUND</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#third" name="4332"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>SA</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#fourth" name="4334"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>F1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#fifth" name="4335"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>LL</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="#sixth" name="4422"
                                              style={{padding: "5px", paddingTop: "3px", paddingBottom: "3px"}}>EK</Nav.Link>
                                </Nav.Item>
                            </Nav>
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