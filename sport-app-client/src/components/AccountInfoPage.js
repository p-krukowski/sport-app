import React, {Component} from 'react';

import {Card, Col, Row} from 'react-bootstrap';
import {getAccountInfo} from "../util/apiUtils/AccountAPI";


export default class AccountInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountInfo: {
                id: '',
                username: '',
                mail: '',
                userProps: {
                    score: ''
                }
            },
        };
    }

    getMyAccountInfo = () => {
        getAccountInfo()
            .then(response => {
                this.setState((state) => {
                    return {
                        accountInfo: response
                    }
                })
            })
            .catch(error => {
                this.setState({})
            });
    }

    componentDidMount() {
        this.getMyAccountInfo();
    }

    render() {
        const {accountInfo} = this.state;

        return (
            <Card bg="dark" text="white" style={{marginBottom: '5px'}}>
                <Card.Header>
                    Moje konto
                </Card.Header>
                {this.props.isAuthenticated === true &&
                <Card.Body>
                    <Row>
                        <Col>
                            ID: {accountInfo.id}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Nazwa: {accountInfo.username}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Punkty: {accountInfo.userProps.score}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            mail: {accountInfo.mail}
                        </Col>
                    </Row>
                </Card.Body>}
            </Card>
        );

    }

}