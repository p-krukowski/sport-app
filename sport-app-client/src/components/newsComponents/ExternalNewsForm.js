import React, {Component} from "react";
import {Spinner, Col, Form, Image, Row} from "react-bootstrap";
import {fetchArticle} from "../../util/scrape";


class ExternalNewsForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false,
            isFetched: false,
            content: {
                imageURL: 'https://cdn.pixabay.com/photo/2015/12/22/04/00/photo-1103595_960_720.png',
                title: null,
                description: null,
            }
        }
    }

    loadFromLink = (url) => {
        this.setState({
            fetching: true
        });
        fetchArticle(url)
            .then(response => {
                if (response.description.length > 350) {
                    response.description = response.description.slice(0, 347);
                    response.description = response.description.concat('...');
                }
                if (response.title.length > 90) {
                    response.title = response.title.slice(0, 87);
                    response.title = response.title.concat('...');
                }
                this.setState({
                    content: {
                        title: response.title,
                        description: response.description,
                        imageURL: response.imageURL,
                        link: url
                    },
                    fetching: false,
                    isFetched: true
                });
                this.props.updateFields(this.state.content);
            })
    }

    handleChange = (e) => {
        let content = this.state.content;
        if (e.target.name === "title") {
            this.setState({
                content: {
                    ...this.state.content,
                    title: e.target.value
                }
            })
            content = {
                ...content,
                title: e.target.value
            }
        } else if (e.target.name === "description") {
            this.setState({
                content: {
                    ...this.state.content,
                    description: e.target.value
                }
            })
            content = {
                ...content,
                title: e.target.value
            }
        }
        this.props.updateFields(content);
    }

    render() {
        return (
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="1">
                        Link
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control onChange={e => this.loadFromLink(e.target.value)}
                                      placeholder="http://..."/>
                    </Col>
                    <Col>
                        {
                            this.state.fetching &&
                            <Spinner animation="grow" variant="primary"/>
                        }
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col sm="8" lg="8" md="8">
                            <Form.Control name="title"
                                          placeholder="Tytuł"
                                          style={{marginBottom: "20px"}}
                                          defaultValue={this.state.content.title}
                                          disabled={!this.state.isFetched}
                                          onChange={e => this.handleChange(e)}
                                          maxLength='90'
                            />
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control name="description"
                                              as="textarea"
                                              rows="3"
                                              placeholder="Opis..."
                                              defaultValue={this.state.content.description}
                                              disabled={!this.state.isFetched}
                                              onChange={e => this.handleChange(e)}
                                              maxLength='350'
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Image src={this.state.content.imageURL}
                                   rounded
                                   fluid
                                   style={{height: "145px"}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        );
    }
}

export default ExternalNewsForm;
