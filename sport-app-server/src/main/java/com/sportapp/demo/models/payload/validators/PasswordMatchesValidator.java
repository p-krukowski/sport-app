package com.sportapp.demo.models.payload.validators;

import com.sportapp.demo.models.payload.SignUpRequest;
import com.sportapp.demo.models.payload.annotations.PasswordMatches;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

  @Override
  public void initialize(PasswordMatches constraintAnnotation) {
  }
  @Override
  public boolean isValid(Object obj, ConstraintValidatorContext context){
    SignUpRequest signUpRequest = (SignUpRequest) obj;
    return signUpRequest.getPassword().equals(signUpRequest.getPasswordConfirm());
  }
}
