import React, {useEffect, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

const SignUpSuccessDialog = (props) => {
  return (
      <Dialog
          open={props.dialog}
          onClose={() => props.setDialog(false)}
      >
        <DialogTitle>Zarejestrowano!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Potwierdź swój e-mail, klikając link, który
            wysłaliśmy na Twój e-mail.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setDialog(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default SignUpSuccessDialog;