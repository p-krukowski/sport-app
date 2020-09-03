import React, {Component} from 'react';

import {Button, Card, Container, Form} from "react-bootstrap";

import {signUp} from '../../util/apiUtils/AuthUtils';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH} from '../../constants'

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username: {
            value: ''
        },
        email: {
            value: ''
        },
        password: {
            value: ''
        },
        passwordConfirm: {
            value: ''
        },
        redirect: null
    };


    handleSubmit = event => {
        event.preventDefault();

        if (!this.isFormInvalid()) {
            const signUpRequest = {
                username: this.state.username.value,
                email: this.state.email.value,
                password: this.state.password.value,
                passwordConfirm: this.state.passwordConfirm.value
            };

            signUp(signUpRequest)
                .then(response => {
                    console.log(response);
                    return alert("Zarejestrowano");
                })
                .catch(error => {
                    return alert(error.message);
                });
        } else {
            alert(this.state.errorMsg);
        }
    };

    handleInputChange = (event, validateInput) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validateInput(inputValue)
            }
        });
    };

    isFormInvalid = () => {
        return !(this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success' &&
            this.state.passwordConfirm.validateStatus === 'success');
    };

    render() {
        const {username, email, password, passwordConfirm} = this.state;

        return (
            <React.Fragment>
                <Container>
                    <Card bg="light" style={{width: '20rem', color: "black"}}>
                        <Card.Header>Rejestracja</Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit} id="signUpFormId">
                                <Form.Group controlId="FormUsername" style={{marginBottom: '5px'}}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required
                                                  name="username"
                                                  value={username.value}
                                                  onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                                                  type="text"
                                                  placeholder="Username"
                                                  help={this.state.username.errorMsg}/>
                                    <Form.Text className="text-muted">Minimum 3 znaki</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="FormEmail" style={{marginBottom: '5px'}}>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required
                                        name="email"
                                        value={email.value}
                                        onChange={(event) => this.handleInputChange(event, this.validateMail)}
                                        type="email"
                                        placeholder="E-mail"/>
                                </Form.Group>

                                <Form.Group controlId="FormPassword" style={{marginBottom: '5px'}}>
                                    <Form.Label>Hasło</Form.Label>
                                    <Form.Control
                                        required
                                        name="password"
                                        value={password.value}
                                        onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                                        type="password"
                                        placeholder="Hasło"/>
                                    <Form.Text className="text-muted">Minimum 8 znaków</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="FormPasswordConfirm" style={{marginBottom: '5px'}}>
                                    <Form.Label>Powtórz hasło</Form.Label>
                                    <Form.Control
                                        required
                                        name="passwordConfirm"
                                        value={passwordConfirm.value}
                                        onChange={(event) => this.handleInputChange(event, this.validatePasswordMatch)}
                                        type="password"
                                        placeholder="Hasło"/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Zarejestruj
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>

            </React.Fragment>
        );
    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            this.setState({
                errorMsg: `Zbyt krótka nazwa użytkownika. Wymagane co najmniej ${USERNAME_MIN_LENGTH} znaki.`
            });
            return {
                validateStatus: 'error'
            };
        } else if (username.length > USERNAME_MAX_LENGTH) {
            this.setState({
                errorMsg: `Zbyt długa nazwa użytkownika. Wymagane co najwyżej ${USERNAME_MAX_LENGTH} znaków.`
            });
            return {
                validateStatus: 'error'
            }
        } else {
            this.setState({
                errorMsg: null
            });
            return {
                validateStatus: 'success'
            }
        }
    };

    validateMail = (email) => {

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');

        if (!email) {
            this.setState({
                errorMsg: "E-mail nie może być pusty"
            });
            return {
                validateStatus: 'error'
            };
        } else if (!EMAIL_REGEX.test(email)) {
            this.setState({
                errorMsg: "Niepoprawny e-mail"
            });
            return {
                validateStatus: 'error'
            }
        } else {
            this.setState({
                errorMsg: null
            });
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            this.setState({
                errorMsg: `Zbyt krótkie hasło. Wymagane co najmniej ${USERNAME_MIN_LENGTH} znaków.`
            });
            return {
                validateStatus: 'error'
            };
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            this.setState({
                errorMsg: `Zbyt długie hasło. Wymagane co najwyżej ${USERNAME_MAX_LENGTH} znaków`
            });
            return {
                validateStatus: 'error'
            }
        } else {
            this.setState({
                errorMsg: null
            });
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    };

    validatePasswordMatch = (passwordConfirm) => {
        if (passwordConfirm !== this.state.password.value) {
            this.setState({
                errorMsg: "Hasła nie są identyczne"
            });
            return {
                validateStatus: 'error'
            }
        } else {
            this.setState({
                errorMsg: null
            });
            return {
                validateStatus: 'success'
            }
        }
    };
}
