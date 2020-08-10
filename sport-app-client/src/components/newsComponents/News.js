import React, {Component} from "react";
import {Badge, Card, Col, Row} from "react-bootstrap";

class News extends Component {
    render() {
        return (
            <a href={this.props.news.link}>
                <Row style={{height: '130px', margin: '0 0 10px 0'}}>
                    <Col sm="auto"
                         style={{
                             height: '100%',
                             width: '190px',
                             padding: '0px'
                         }}>
                        <img src={this.props.news.imageUrl}
                             style={{
                                 borderBottomLeftRadius: '5px',
                                 borderTopLeftRadius: '5px',
                                 height: '100%',
                                 width: '100%',
                                 objectFit: 'cover'
                             }}
                             alt="Nie udało się załadować zdjęcia"/>
                        <Row style={{
                            background: "black",
                            opacity: '0.7',
                            margin: 0,
                            height: '25px',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0px',
                            fontSize: '12px'
                        }}>
                        </Row>
                        <Badge variant='light'
                               style={{
                                   position: 'absolute',
                                   bottom: '3px',
                                   right: '5px'
                               }}>
                            @{this.props.news.author.username}
                        </Badge>
                    </Col>
                    <Col style={{
                        paddingLeft: '0px',
                        height: '100%'
                    }}>
                        <Card bg='dark'
                              text="white"
                              border='dark'
                              style={{
                                  height: '100%',
                                  borderRadius: '0',
                                  borderBottomRightRadius: '5px',
                                  borderTopRightRadius: '5px',
                                  overflow: 'hidden'
                              }}>
                            <Card.Header style={{padding: '6px 10px', fontSize: '0.8em', fontWeight: 'bold'}}>
                                {this.props.news.title}
                            </Card.Header>
                            <Card.Body style={{
                                padding: '5px 10px',
                                fontSize: '0.8em',
                            }}>
                                <Card.Text>
                                    {this.props.news.value}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </a>
        );
    }
}

export default News;