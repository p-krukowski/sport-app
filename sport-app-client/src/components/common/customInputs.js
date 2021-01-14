import {useField} from "formik";
import {ErrorMsg} from "../../styles/formStyles";
import React from "react";
import TextField from "@material-ui/core/TextField";
import {Box} from "@material-ui/core";

export const TextInput = ({...props}) => {
  const [field, meta] = useField(props);
  return (
      <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <TextField {...field} {...props} />
        {meta.touched && meta.error ? (
            <ErrorMsg className="error">{meta.error}</ErrorMsg>
        ) : null}
      </Box>
  );
};