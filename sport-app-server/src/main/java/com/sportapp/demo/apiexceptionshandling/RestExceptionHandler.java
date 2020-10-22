package com.sportapp.demo.apiexceptionshandling;

import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler  {

  @ExceptionHandler(EntityNotFoundException.class)
  protected ResponseEntity<?> handleEntityNotFound(EntityNotFoundException e) {
    ApiError apiError = new ApiError(HttpStatus.NOT_FOUND);
    apiError.setMessage(e.getMessage());
    return new ResponseEntity<>(apiError, apiError.getStatus());
  }
}
