import React, {Component} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import CommentsSection from "./CommentsSection";
import {addPointToEntry} from "../../util/apiUtils/EntriesUtils";

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
          entry: this.props.entry
        };
    }

    handleAddButton = (entryId) => {

        const entryTemp = this.state.entry;

                addPointToEntry(entryId)
                    .then(response => {
                        entryTemp.score = response;
                        this.setState({
                            entry: entryTemp
                        });
                    })
                    .catch(error => {
                        alert("Błąd serwera");
                    });
};

    render() {
        const {entry} = this.state;

        return (
            <Card bg="dark" text="white" style={{marginBottom: '5px'}}>
                <Card.Header>
                    <Row>
                        <Col md="auto">{entry.author.username}</Col>
                        <Col>{entry.createdAt}</Col>
                        <Col className="text-right" xs={"auto"}>{entry.score}</Col>
                        {
                            this.props.isAuthenticated &&
                            <Col className="text-right" xs={"auto"}><Button
                                onClick={() => this.handleAddButton(entry.id)}><b>+</b></Button></Col>
                        }
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <Row>
                        <Col>{entry.value}</Col>
                    </Row>
                </Card.Body>
                <Card.Footer style={{padding: '0px', paddingRight: '20px', paddingLeft: '20px'}}>
                    <CommentsSection entryId={entry.id} isAuthenticated={this.props.isAuthenticated}/>
                </Card.Footer>
            </Card>
        );
    }
}

export default Entry;