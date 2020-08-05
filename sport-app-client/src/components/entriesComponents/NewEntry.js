import React, {Component} from 'react';

import {Button, Card, Col, Form, Row} from 'react-bootstrap';

import {addEntry} from '../../util/apiUtils/EntriesUtils';

export default class NewEntry extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        value: ''
    };

    handleAddEntry = event => {
        const entry = {
            value: this.state.value
        };
        return addEntry(entry)
            .then(response => {
                console.log("OK");
                return response;
            })
            .catch(error => {
                console.log("Internal server error");
                return entry.value;
            });
    };

    entryChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const { entryValue } = this.state;

        return (
            <React.Fragment>
                <Card bg="dark" text="white" style={{marginBottom: '5px' }}>
                    <Card.Body>
                        <Form onSubmit={event => this.handleAddEntry(event)}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control
                                            required 
                                            name="value"
                                            value={entryValue}
                                            onChange={this.entryChange}
                                            as="textarea"
                                            rows="2"
                                            placeholder="Utwórz wpis" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ textAlign: "right" }}>
                                    <Button variant="primary" type="submit">
                                        Utwórz
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </React.Fragment>
        );
    }
}