import React, {Component} from 'react';
import {Card, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

class EventSoccer extends Component {
    render() {
        return (
            <Card bg='dark' style={{textAlign: 'center'}}>
                <Card.Header style={{padding: '7px', backgroundColor: 'rgb(108, 117, 125)'}}>
                    <b>Premier League</b>
                </Card.Header>
                <Card.Body style={{padding: 0}}>
                    <Card bg='primary' style={{fontSize: '14px',
                                                margin: '10px',
                                                padding: '2px 8px'}}>
                        <Row className="justify-content-md-center">
                            <Col md='auto' style={{margin: 0, padding: '5px', paddingRight: 0}}>
                                <Badge pill variant="light" style={{fontSize: '15px'}}>20.05</Badge>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col style={{margin: "auto 0px", padding: "5px 5px", textAlign: 'right'}}>
                                <b>Chelsea Londyn</b>
                            </Col>
                            <Col md='auto' style={{margin: 'auto', padding: "5px 0",}}>
                                <Badge variant="light" style={{fontSize: 'inherit'}}>2:2</Badge>
                            </Col>
                            <Col style={{margin: "auto 0", padding: "5px 5px", textAlign: 'left'}}>
                                <b>Chelsea Londyn</b>
                            </Col>
                        </Row>
                    </Card>
                </Card.Body>
            </Card>
        );
    }
}

export default EventSoccer;