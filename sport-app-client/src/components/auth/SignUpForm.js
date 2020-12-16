import React, {useState} from 'react';
import {signUp} from "../../util/apiUtils/AuthUtils";
import Paper from "@material-ui/core/Paper";
import {Box, Divider, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Form, Formik} from "formik";
import {signUpValidationSchema} from "../../util/validation/authValidationSchema";
import {TextInput} from "../common/TextInput";
import {CheckboxWithLabel} from "../common/CheckboxWithLabel";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const SignUpForm = () => {

  const [dialog, setDialog] = useState(false);
  const [alertBox, setAlertBox] = useState(false);
  const [alertInfo, setAlertInfo] = useState('');
  const [backdrop, setBackdrop] = useState(false);

  const handleSubmit = (username, email, password, passwordConfirm,
      resetForm) => {
    const signupRequest = {username, email, password, passwordConfirm};

    setBackdrop(true);
    signUp(signupRequest)
    .then(response => {
      setBackdrop(false);
      handleDialog();
      resetForm();
    })
    .catch(error => {
      if (error.status === 400) {
        setBackdrop(false);
        setAlertInfo(error.data);
        setAlertBox(true);
      } else {
        alert("Bład serwera");
      }
    })
  }

  const handleDialog = () => {
    setDialog(!dialog);
  }

  return (
      <Paper>
        <Box p={2}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography variant={"h6"}>Zarejestruj się</Typography>
            </Grid>
            <Grid item>
              <Divider/>
            </Grid>
            <Grid item>
              <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                    acceptTerms: false,
                  }}
                  validationSchema={signUpValidationSchema}
                  onSubmit={(values, {resetForm}) => {
                    handleSubmit(
                        values.username,
                        values.email,
                        values.password,
                        values.passwordConfirm,
                        resetForm
                    );
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
                          label="E-mail"
                          name="email"
                          type="email"
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
                    <Grid item container direction={"column"}>
                      <TextInput
                          label="Potwierdź hasło"
                          variant="outlined"
                          name="passwordConfirm"
                          type="password"
                      />
                    </Grid>
                    <Grid item>
                      <CheckboxWithLabel
                          name="acceptTerms"
                          color="primary"
                          label="Akceptuje regulamin"
                      />
                    </Grid>
                    <Grid item container direction={"column"}
                          justify={"center"}>
                      <Button variant={"contained"} type="submit"
                              color="primary">
                        Zarejestruj
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Grid>
          </Grid>
        </Box>
        <Dialog
            open={dialog}
            onClose={handleDialog}
        >
          <DialogTitle>Zarejestrowano!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Potwierdź swój e-mail, klikając link, który
              wysłaliśmy na Twój e-mail.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
            open={alertBox}
            autoHideDuration={6000}
            onClose={() => setAlertBox(false)}
        >
          <Alert severity="warning">{alertInfo}</Alert>
        </Snackbar>
        <Backdrop open={backdrop} onClick={() => setBackdrop(false)}>
          <CircularProgress color="primary" />
        </Backdrop>
      </Paper>
  );
}

export default SignUpForm;