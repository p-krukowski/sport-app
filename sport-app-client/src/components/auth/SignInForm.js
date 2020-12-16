import React, {useState} from 'react';
import {signIn} from '../../util/apiUtils/AuthUtils';
import {ACCESS_TOKEN} from '../../constants';
import {Box, Divider, Typography} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {Form, Formik} from "formik";
import {TextInput} from "../common/TextInput";
import {CheckboxWithLabel} from "../common/CheckboxWithLabel";
import {signInValidationSchema} from "../../util/validation/authValidationSchema";
import Button from "@material-ui/core/Button";

const SignInForm = () => {
  const [authenticationError, setAuthenticationError] = useState(false);
  const [authenticationErrorMsg, setAuthenticationErrorMsg] = useState(
      '');

  const handleSubmit = (username, password) => {
    signIn({username, password})
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      window.location.reload();
    })
    .catch(error => {
      if (error.status === 401) {
        if (error.data.message === "User is disabled") {
          setAuthenticationErrorMsg("Konto nieaktywne")
        } else {
          setAuthenticationErrorMsg("Nieprawidłowy login lub hasło")
        }
        setAuthenticationError(true);
      } else {
        alert("Coś poszło nie tak");
      }
    });
  }

  return (
      <Paper>
        <Box p={2}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant={"h6"}>Zaloguj się</Typography>
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid item xs>
              <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    staySignedIn: true,
                  }}
                  validationSchema={signInValidationSchema}
                  onSubmit={(values, {setSubmitting}) => {
                    handleSubmit(values.username, values.password);
                  }}
              >
                <Form>
                  <Grid container direction={"column"} spacing={1}>
                    <Grid item container direction={"column"}>
                      <TextInput
                          label="Nazwa użytkownika"
                          name="username"
                          type="username"
                          variant="outlined"
                      />
                    </Grid>
                    <Grid item container direction={"column"}>
                      <TextInput
                          label="Hasło"
                          variant="outlined"
                          name="password"
                          type="password"
                      />
                    </Grid>
                    <Grid item>
                      <CheckboxWithLabel
                          name="staySignedIn"
                          color="primary"
                          label="Nie wylogowuj mnie"
                      />
                    </Grid>
                    <Grid item container direction={"column"}
                          justify={"center"}>
                      <Button variant={"contained"} type="submit"
                              color="primary">
                        Zaloguj
                      </Button>
                    </Grid>
                    {
                      authenticationError &&
                      <Grid item xs>
                        <Typography color={"error"} variant={"body2"}
                                    align={"center"}>
                          {authenticationErrorMsg}
                        </Typography>
                      </Grid>
                    }
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Box>
      </Paper>
  );
}

export default SignInForm;
