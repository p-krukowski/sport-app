import React, { Component } from 'react';

import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import { addEntry } from '../util/APIUtils';

export default class NewEntry extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        value: ''
    }

    addEntry = event => {

        const entry = {
            value: this.state.value
        };

        addEntry(entry);
        
    }

    entryChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { entryValue } = this.state;

        return (
            <div>
                <Card bg="dark" text="white" style={{ width: '50%', marginBottom: '5px' }}>
                    <Card.Body>
                        <Form onSubmit={this.addEntry}>
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
            </div>
        );
    }
}