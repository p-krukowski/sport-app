import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import React from "react";

const SignUpAlert = (props) => {
  return (
      <Snackbar
          open={props.alertBox}
          autoHideDuration={6000}
          onClose={() => props.setAlertBox(false)}
      >
        <Alert severity="warning">{props.alertInfo}</Alert>
      </Snackbar>
  );
}

export default SignUpAlert;