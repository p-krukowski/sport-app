import React, {Component} from "react";
import {Col, Form, Image, Row} from "react-bootstrap";

class CustomNewsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            external: true,
            imageURL: 'https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png'
        }
    }

    setChecked(name) {
        if (name === "external") {
            this.setState({
                external: true
            })
        } else {
            this.setState({
                external: false
            })
        }

    }

    render() {
        return (
            <Form>
                <Form.Group>
                    <Row>
                        <Col sm="8" lg="8" md="8">
                            <Form.Control placeholder="Tytuł"
                                          maxLength='90'
                                          style={{marginBottom: "20px"}}/>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows="3" placeholder="Opis..."/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Image src={this.state.imageURL}
                                   rounded
                                   fluid
                                   style={{height: "145px", marginBottom: "20px"}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Control as="textarea" placeholder="Treść" rows="5"/>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        );
    }
}

export default CustomNewsForm;