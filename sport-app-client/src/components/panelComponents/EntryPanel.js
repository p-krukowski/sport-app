import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";

class Entry extends Component {

  formatText(text) {
    let textArray = text.split(' ');
    let newTextArray = "";
    for (let word of textArray) {
      if (word.match("[#]{1}[\\w]{3,}")) {
        word = word.bold();
      }
      newTextArray = newTextArray.concat(" ", word);
    }
    console.log(newTextArray)
    return {__html: newTextArray};
  }

    render() {
        const {entry} = this.props;

        return (
            <Card bg="dark" text="white" style={{marginBottom: '5px'}}>
                <Card.Header>
                    <Row>
                        <Col>{entry.createdAt}</Col>
                        <Col className="text-right" xs={"auto"}>{entry.score}</Col>
                    </Row>
                </Card.Header>
                <Card.Body style={{padding: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                    <Row>
                        <Col dangerouslySetInnerHTML={this.formatText(entry.value)}/>
                    </Row>
                </Card.Body>
            </Card>
        );
    }
}

export default Entry;