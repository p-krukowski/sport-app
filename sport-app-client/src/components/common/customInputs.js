import FormGroup from "@material-ui/core/FormGroup";
import {useField} from "formik";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {ErrorMsg} from "../../styles/formStyles";
import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from 'styled-components';

export const TextInput = ({...props}) => {
  const [field, meta] = useField(props);
  return (
      <StyledTextInput>
        <TextField {...field} {...props} />
        {meta.touched && meta.error ? (
            <ErrorMsg className="error">{meta.error}</ErrorMsg>
        ) : null}
      </StyledTextInput>
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

const StyledTextInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`