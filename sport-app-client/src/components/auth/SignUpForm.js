import React, {Component} from 'react';
import styled from "styled-components";

import {signUp} from '../../util/apiUtils/AuthUtils';
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH
} from '../../constants'
import {Card, CardBody, CardHeader} from "../common/CardC";
import Button from "../common/Button";
import {theme} from "../../util/theme";

export default class SignUpForm extends Component {

  errorMsg = "";
  username = '';
  email = '';
  password = '';
  passwordConfirm = '';

  handleSubmit = event => {
    event.preventDefault();

    if (this.isFormValid()) {
      const signUpRequest = {
        username: this.username,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      };

      signUp(signUpRequest)
      .then(response => {
        alert("Zarejestrowano");
      })
      .catch(error => {
        alert(error.message);
      });
    } else {
      alert(this.errorMsg);
    }
  };

  handleInputChange = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    if (inputName === 'username') {
      this.username = inputValue;
    }
    if (inputName === 'email') {
      this.email = inputValue;
    }
    if (inputName === 'password') {
      this.password = inputValue;
    }
    if (inputName === 'passwordConfirm') {
      this.passwordConfirm = inputValue;
    }
  };

  isFormValid = () => {
    return !!(this.isUsernameValid()
        && this.isEmailValid()
        && this.isPasswordValid()
        && this.passwordsMatch());
  };

  isUsernameValid = () => {
    const username = this.username
    if (username.length < USERNAME_MIN_LENGTH) {
      this.errorMsg = `Zbyt krótka nazwa użytkownika. Wymagane co najmniej ${USERNAME_MIN_LENGTH} znaki.`;
      return false;
    } else if (username.length > USERNAME_MAX_LENGTH) {
      this.errorMsg = `Zbyt długa nazwa użytkownika. Wymagane co najwyżej ${USERNAME_MAX_LENGTH} znaków.`;
      return false;
    } else {
      this.errorMsg = "Nazwa użytkownika poprawna";
      return true;
    }
  };

  isEmailValid = () => {
    const email = this.email;
    const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');

    if (!email) {
      this.errorMsg = "E-mail nie może być pusty";
      return false;
    } else if (!EMAIL_REGEX.test(email)) {
      this.errorMsg = "Niepoprawny e-mail";
      return false;
    } else {
      this.errorMsg = "E-mail poprawny";
      return true;
    }
  };

  isPasswordValid = () => {
    const password = this.password;
    if (password.length < PASSWORD_MIN_LENGTH) {
      this.errorMsg = `Zbyt krótkie hasło. Wymagane co najmniej ${PASSWORD_MIN_LENGTH} znaków.`;
      return false;
    } else if (password.length > PASSWORD_MAX_LENGTH) {
      this.errorMsg = `Zbyt długie hasło. Wymagane co najwyżej ${PASSWORD_MAX_LENGTH} znaków`;
      return false;
    } else {
      this.errorMsg = "Hasło prawidłowe";
      return true;
    }
  };

  passwordsMatch = () => {
    const passwordConfirm = this.passwordConfirm;
    if (passwordConfirm !== this.password) {
      this.errorMsg = "Hasła nie są identyczne";
      return false;
    } else {
      this.errorMsg = "Hasła identyczne";
      return true;
    }
  };

  render() {
    return (
        <SignUpFormLayout>
          <CardSingUp>
            <CardHeader style={{padding: "10px 30px"}}>Rejestracja</CardHeader>
            <CardBody style={{padding: "20px 30px"}}>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label>Nazwa użytkownika</Label>
                  <Input required
                         autoComplete="new-password"
                         name="username"
                         onChange={(event) => this.handleInputChange(event)}
                         type="text"
                         placeholder="Nazwa użytkownika"/>
                  <InputTip>Minimum 3 znaki</InputTip>
                </FormGroup>

                <FormGroup>
                  <Label>E-mail</Label>
                  <Input required
                         name="email"
                         onChange={(event) => this.handleInputChange(event)}
                         type="email"
                         placeholder="E-mail"/>
                </FormGroup>

                <FormGroup>
                  <Label>Hasło</Label>
                  <Input required
                         autoComplete="new-password"
                         name="password"
                         onChange={(event) => this.handleInputChange(event)}
                         type="password"
                         placeholder="Hasło"/>
                  <InputTip>Minimum 8 znaków</InputTip>
                </FormGroup>

                <FormGroup>
                  <Label>Powtórz hasło</Label>
                  <Input required
                         autoComplete="new-password"
                         name="passwordConfirm"
                         onChange={(event) => this.handleInputChange(event)}
                         type="password"
                         placeholder="Hasło"/>
                </FormGroup>

                <FormGroup style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Input required
                         type='checkbox'/>
                  <div style={{marginLeft: '5px'}}>Akceptuję regulamin</div>
                </FormGroup>

                <Button type='submit'>
                  Zarejestruj
                </Button>
              </form>
            </CardBody>
          </CardSingUp>
        </SignUpFormLayout>
    );
  }
}

const SignUpFormLayout = styled.div`
  margin: 10px 0;
  
  @media (min-width: 768px) {
    margin: 20px 50px;
  }
`

const CardSingUp = styled(Card)`
  font-size: 1.2em;
  border-radius: 5px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const Label = styled.div`
  
`

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: none;
  font-size: 1em;
  outline: none;
  background: ${theme.colors.background};
  color: white;
  
  :-internal-autofill-selected {
    background: inherit;
    border: none;
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.background} inset;
  }
`

const InputTip = styled.div`
  font-size: 0.8em;
  color: gray;
`