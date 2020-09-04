import React, {Component} from "react";
import styled from "styled-components";
import {Redirect} from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm";
import SignInForm from "../components/auth/SignInForm";

class AuthPage extends Component {
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={"/"}/>
    } else {
      return (
          <AuthPageLayout>
            <SignInForm/>
            <SignUpForm/>
          </AuthPageLayout>
      );
    }
  }
}

export default AuthPage;

const AuthPageLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`