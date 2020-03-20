import React, { Component } from "react";

import { Card, Form, Container, Button} from "react-bootstrap";
import { Redirect } from "react-router-dom";

import { signUp, getCurrentUser } from '../util/APIUtils';
import { USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '../constants/index'

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: {
      value : ''
    },
    mail: {
      value : ''
    },
    password: {
      value : ''
    },
    passwordConfirm: {
      value : ''
    },
    redirect: null
  }


  handleSubmit = event => {
    event.preventDefault();

    const signUpRequest = {
      username: this.state.username.value,
      mail: this.state.mail.value,
      password: this.state.password.value,
      passwordConfirm: this.state.passwordConfirm.value
    };

    signUp(signUpRequest)
      .then(() => {
        alert("Zarejestrowano");
      })
      .catch(error => {
          alert(error.message);
        });
  }

  handleInputChange = (event, validateInput) => {
    const target = event.target;
    const inputName = target.name;        
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
      ...validateInput(inputValue)}
    });
  }

  isFormInvalid = () =>
  {
    return !(this.state.username.validateStatus === 'success' &&
              this.state.mail.validateStatus === 'success' &&
              this.state.password.validateStatus === 'success' &&
              this.state.passwordConfirm.validateStatus === 'success');
  }

  loadCurrentUser() {
    getCurrentUser()
        .then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                redirect: "/"
            });
        }).catch(error => {
            this.setState({
            });
        });
}

componentDidMount() {
    this.loadCurrentUser();
}

  render() {
    const { username, mail, password, passwordConfirm } = this.state;

    if(this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <Container>
          <Card bg="light" style={{ width: '20rem' }}>
            <Card.Header>Rejestracja</Card.Header>
            <Card.Body>
              <Form onSubmit={this.handleSubmit} id="signUpFormId">
                <Form.Group controlId="FormUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control required
                    name="username"
                    value={username.value}
                    onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                    type="text"
                    placeholder="Username"
                    help={this.state.username.errorMsg} />
                </Form.Group>

                <Form.Group controlId="FormEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    required
                    name="mail"
                    value={mail.value}
                    onChange={(event) => this.handleInputChange(event, this.validateMail)}
                    type="email"
                    placeholder="E-mail" />
                </Form.Group>

                <Form.Group controlId="FormPassword">
                  <Form.Label>Hasło</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={password.value}
                    onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                    type="password"
                    placeholder="Hasło" />
                </Form.Group>

                <Form.Group controlId="FormPasswordConfirm">
                  <Form.Label>Powtórz hasło</Form.Label>
                  <Form.Control
                    required
                    name="passwordConfirm"
                    value={passwordConfirm.value}
                    onChange={(event) => this.handleInputChange(event, this.validatePasswordMatch)}
                    type="password"
                    placeholder="Hasło" />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={this.isFormInvalid()}>
                  Zarejestruj
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>

      </div>
    );
  }

  validateUsername = (username) => {
    if(username.length < USERNAME_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Zbyt krótka nazwa użytkownika. Wymagane co najmniej ${USERNAME_MIN_LENGTH} znaki.`
      };
    } else if (username.length > USERNAME_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Zbyt długa nazwa użytkownika. Wymagane co najwyżej ${USERNAME_MAX_LENGTH} znaków.`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
    }}
  }

  validateMail = (mail) => {

    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');


    if(!mail) {
      return {
        validateStatus: 'error',
        errorMsg: "E-mail nie może być pusty"
      };
    } else if(!EMAIL_REGEX.test(mail)) {
      return {
          validateStatus: 'error',
          errorMsg: "Niepoprawny e-mail"
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
    }}
  }

  validatePassword = (password) => {
    if(password.length < PASSWORD_MIN_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Zbyt krótkie hasło. Wymagane co najmniej ${USERNAME_MIN_LENGTH} znaków.`
      };
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      return {
        validateStatus: 'error',
        errorMsg: `Zbyt długie hasło. Wymagane co najwyżej ${USERNAME_MAX_LENGTH} znaków`
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
    }}
  }

  validatePasswordMatch = (passwordConfirm) => {
    if(!(passwordConfirm === this.state.password.value)) {
      return {
        validateStatus: 'error',
        errorMsg: "Hasła nie są identyczne"
      }
    } else {
      return {
        validateStatus: 'success',
        errorMsg: null
    }}
  }
}
