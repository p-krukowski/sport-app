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
    addPointToEntry(entryId)
    .then(response => {
      this.setState({
        entry: {
          ...this.state.entry,
          score: response
        }
      });
    })
    .catch(error => {
      alert("Błąd serwera");
    });
  };

  formatText(text) {
    let textArray = text.split(' ');
    let newTextArray = "";
    for (let word of textArray) {
      if (word.match("[#]{1}[\\w]{3,}")) {
        word = word.bold();
      }
      newTextArray = newTextArray.concat(" ", word);
    }
    return {__html: newTextArray};
  }

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
                    onClick={() => this.handleAddButton(
                        entry.id)}><b>+</b></Button></Col>
              }
            </Row>
          </Card.Header>
          <Card.Body style={{
            padding: '10px',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}>
            <Row>
             <Col dangerouslySetInnerHTML={this.formatText(entry.value)}/>
            </Row>
          </Card.Body>
          <Card.Footer style={{
            padding: '0px',
            paddingRight: '20px',
            paddingLeft: '20px'
          }}>
            <CommentsSection entryId={entry.id}
                             commentsAmount={entry.commentsAmount}
                             isAuthenticated={this.props.isAuthenticated}/>
          </Card.Footer>
        </Card>
    );
  }
}

export default Entry;