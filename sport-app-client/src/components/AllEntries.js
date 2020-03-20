import React, { Component } from 'react';

import { getAllEntries, addPointToEntry } from '../util/APIUtils';

import { Card, Row, Col, Button } from 'react-bootstrap';

export default class AllEntries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: []
        };
    }

    handleAddButton = (id, e) => {
        console.log(id);
        const addPointRequest = {
            id: id
        }
        let entriesCopy = this.state.entries;
        let length = this.state.entries.length;

        addPointToEntry(addPointRequest)
            .then(response => {
                entriesCopy[length - id].score = response;
            });
        this.setState({
            entries: entriesCopy
        });
    }

    componentDidMount() {
        getAllEntries()
            .then(response => {
                this.setState({
                    entries: response
                });
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.entries && this.state.entries.map((entry) => (
                        <Card key={entry.id} bg="dark" text="white" style={{ width: '50%', marginBottom: '5px' }}>
                            <Card.Header>
                                <Row>
                                    <Col>{entry.author.username}</Col>
                                    <Col>{entry.entryTime}</Col>
                                    <Col className="text-right" xs={"auto"}>{entry.score}</Col>
                                    <Col className="text-right" xs={"auto"}><Button onClick={(e) => this.handleAddButton(entry.id, e)}><b>+</b></Button></Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>{entry.value}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div >);
    }


}