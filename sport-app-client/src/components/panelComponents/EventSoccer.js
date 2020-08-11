import React, {Component} from 'react';
import {Card, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

class EventSoccer extends Component {

    render() {
        const event = this.props.event;

        return (
            <Card bg='primary' style={{
                fontSize: '14px',
                margin: '10px',
                padding: '2px 8px',
                textAlign: 'center'
            }}>
                <Row className="justify-content-md-center">
                    <Col md='auto' style={{margin: 0, padding: '5px', paddingRight: 0}}>
                        <Badge pill variant="light" style={{fontSize: '15px'}}>{event.date}</Badge>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col style={{margin: "auto 0px", padding: "5px 5px", textAlign: 'right'}}>
                        <b>{event.homeTeamName}</b>
                    </Col>
                    <Col md='auto' style={{margin: 'auto', padding: "5px 0",}}>
                        <Badge variant="light" style={{fontSize: 'inherit'}}>
                            {event.homeScore}:{event.awayScore}
                        </Badge>
                    </Col>
                    <Col style={{margin: "auto 0", padding: "5px 5px", textAlign: 'left'}}>
                        <b>{event.awayTeamName}</b>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default EventSoccer;