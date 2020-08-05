import React, {Component} from "react";
import {Card, Col, Image, Row} from "react-bootstrap";

class News extends Component {
    render() {
        return (
            <>
                <Row style={{margin: '10px'}}>
                    <Col sm="auto" style={{padding: '0px', marginLeft: '-10px'}}>
                        <Image src={this.props.news.imageUrl}
                               height="130px"
                               width='210px'
                               style={{
                                   borderBottomLeftRadius: '5px',
                                   borderTopLeftRadius: '5px'
                               }}/>
                    </Col>
                    <Col style={{paddingLeft: '0px'}}>
                        <Card bg='dark'
                              text="white"
                              border='dark'
                              style={{
                                  height: '130px',
                                  borderRadius: '0',
                                  borderBottomRightRadius: '5px',
                                  borderTopRightRadius: '5px'
                              }}>
                            <Card.Header>
                                {this.props.news.title}
                            </Card.Header>
                            <Card.Body style={{
                                            paddingTop: '5px',
                                            fontSize: '0.8em'
                            }}>
                                <Card.Text>
                                    {this.props.news.value}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}

export default News;