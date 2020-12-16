import React from "react";
import {Redirect} from "react-router-dom";
import SignUpForm from "../components/auth/SignUpForm";
import SignInForm from "../components/auth/SignInForm";
import {Grid} from "@material-ui/core";

const AuthPage = (props) => {
  if (props.isAuthenticated) {
    return <Redirect to={"/"}/>
  } else {
    return (
        <Grid container alignItems={"center"}>
          <Grid item container justify={"center"} spacing={2}>
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <SignInForm/>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3} xl={2}>
              <SignUpForm/>
            </Grid>
          </Grid>
        </Grid>
    );
  }
}

export default AuthPage;