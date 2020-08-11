import React, {Component} from 'react';

import EventSoccer from "./EventSoccer";
import {Card, Col, Row} from "react-bootstrap";
import {fetchRecentEventsByLeagueId} from "../../util/apiUtils/EventsUtils";

class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isComponentReady: false
        }
    }

    fetchEvents = () => {
        fetchRecentEventsByLeagueId(4328)
            .then(response => {
                this.setState({
                    recentEvents: response,
                    isComponentReady: true
                })
            })
    }

    componentDidMount() {
        this.fetchEvents();
    }

    render() {
        return (
            this.state.isComponentReady &&
            <Card bg='dark'>
                <Card.Header style={{paddingTop: "4px", textAlign: "center"}}>
                    <Row style={{textAlign: "center"}}>
                        <Col>
                            <b>Piłka nożna</b>
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: 0}}>
                    {
                        this.state.recentEvents.map((event, index) => (
                            <EventSoccer key={index}
                                         event={event}/>
                        ))
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Events;