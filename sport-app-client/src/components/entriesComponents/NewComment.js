import React, {Component} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import {addComment} from "../../util/apiUtils/CommentUtils";

class NewComment extends Component {

  handleAddComment = (e) => {
    e.preventDefault();

    const comment = {
      value: e.target.commentValue.value
    };

    addComment(comment, this.props.entryId)
    .then(response => {
      this.props.hideNewComment();
      this.props.updateComments();
    });
  };


  render() {
    return (
        <Row>
          <Col>
            <Form inline
                  onSubmit={(e) => this.handleAddComment(e)}
                  style={{
                    alignItems: 'stretch',
                    width: '100%',
                    marginTop: '10px',
                    marginBottom: '10px'
                  }}>

              <Col style={{paddingLeft: '0px'}}>
                <Form.Control
                    required
                    name="commentValue"
                    as="textarea"
                    rows="2"
                    placeholder="Napisz komentarz..."
                    style={{width: '100%'}}
                />

              </Col>
              <Col md="auto" style={{paddingLeft: '0', paddingRight: '5px'}}>
                <Button type="submit" style={{height: '100%'}}>Ok</Button>
              </Col>
              <Col md="auto" style={{paddingLeft: '0', paddingRight: '0'}}>
                <Button onClick={this.props.hideNewComment} variant="light"
                        style={{height: '100%'}}>X</Button>
              </Col>
            </Form>
          </Col>
        </Row>
    );
  }
}

export default NewComment;