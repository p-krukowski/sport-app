import React, {Component} from 'react';

import {Button, Card, Container, Form} from 'react-bootstrap';
import {login} from '../../util/apiUtils/AuthUtils';

import {ACCESS_TOKEN} from '../../constants';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username: '',
        password: ''
    }

    userChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleLogin(event) {
        event.preventDefault();
        const loginRequest = {
            username: event.target.username.value,
            password: event.target.password.value
        };

        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                window.location.reload();
            })
            .catch(error => {
                if (error.status === 401) {
                    alert("Niepoprawna nazwa użytkownika lub hasło");
                }
                else {
                    alert("Coś poszło nie tak");
                }
            });
    }

    render() {
        const { username, password } = this.state;

        return (
            <React.Fragment>
                <Container>
                    <Card bg="light" style={{ width: '20rem', color: "black" }}>
                        <Card.Header>Logowanie</Card.Header>
                        <Card.Body>
                            <Form onSubmit={(event) => this.handleLogin(event)} id="signUpFormId">
                                <Form.Group controlId="FormUsername">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control required
                                        name="username"
                                        value={username}
                                        onChange={(e) => this.userChange(e)}
                                        type="text"
                                        placeholder="Username" />
                                </Form.Group>

                                <Form.Group controlId="FormPassword">
                                    <Form.Label>Hasło</Form.Label>
                                    <Form.Control
                                        required
                                        name="password"
                                        value={password}
                                        onChange={(e) => this.userChange(e)}
                                        type="password"
                                        placeholder="Hasło" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Zaloguj
                                    </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </React.Fragment>
        );
    }
}