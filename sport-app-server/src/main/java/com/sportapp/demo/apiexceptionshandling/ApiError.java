package com.sportapp.demo.apiexceptionshandling;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;

public class ApiError {

  private HttpStatus status;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
  private LocalDateTime timestamp;
  private String message;
  private String debugMessage;

  private ApiError() {
    timestamp = LocalDateTime.now();
  }

  public ApiError(HttpStatus status) {
    this.status = status;
  }

  public HttpStatus getStatus() {
    return status;
  }

  public void setStatus(HttpStatus status) {
    this.status = status;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getDebugMessage() {
    return debugMessage;
  }

  public void setDebugMessage(String debugMessage) {
    this.debugMessage = debugMessage;
  }
}
