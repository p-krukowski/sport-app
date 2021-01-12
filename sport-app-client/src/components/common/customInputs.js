import FormGroup from "@material-ui/core/FormGroup";
import {useField} from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

export const CustomCheckboxWithLabel = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'});
  return (
      <>
        <FormGroup row>
          <FormControlLabel
              control={
                <Checkbox
                    type="checkbox"
                    name={props.name}
                    color={props.color}
                    {...field}
                />
              }
              label={props.label}
          />
        </FormGroup>
        {meta.touched && meta.error ? (
            <ErrorMsg className="error">{meta.error}</ErrorMsg>
        ) : null}
      </>
  );
};
