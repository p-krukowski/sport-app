import React, {Component} from 'react';
import styled from "styled-components";

import {login} from '../../util/apiUtils/AuthUtils';

import {ACCESS_TOKEN} from '../../constants';
import {Card, CardBody, CardHeader} from "../common/CardC";
import Button from "../common/Button";
import {theme} from "../../util/theme";

class SignInForm extends Component {

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
      if (error.status == 401) {
        alert("Niepoprawna nazwa użytkownika lub hasło");
      } else {
        alert("Coś poszło nie tak");
      }
    });
  }

  render() {

    return (
        <SignInFormLayout>
          <CardSingIn>
            <CardHeader style={{padding: "10px 30px"}}>Logowanie</CardHeader>
            <CardBody style={{padding: "20px 30px"}}>
              <form onSubmit={(event) => this.handleLogin(event)}>
                <FormGroup>
                  <Label>Login</Label>
                  <Input required
                         name="username"
                         type="text"
                         placeholder="Nazwa użytkownika"/>
                </FormGroup>

                <FormGroup>
                  <Label>Hasło</Label>
                  <Input required
                         name="password"
                         type="password"
                         placeholder="Hasło"/>
                </FormGroup>

                <Button type="submit">
                  Zaloguj
                </Button>
              </form>
            </CardBody>
          </CardSingIn>
        </SignInFormLayout>
    );
  }
}

export default SignInForm;

const SignInFormLayout = styled.div`
  margin: 10px 0;
  
  @media (min-width: 768px) {
    margin: 20px 50px;
  }
`

const CardSingIn = styled(Card)`
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