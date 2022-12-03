package com.sportapp.demo.models.payload;

import com.sportapp.demo.models.payload.annotations.PasswordMatches;
import com.sportapp.demo.models.payload.annotations.ValidEmail;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@PasswordMatches
@Getter
@Setter
public class SignUpRequest {

  @NotBlank
  @Size(min = 3, max = 30)
  private String username;

  @NotBlank
  @ValidEmail
  private String email;

  @NotBlank
  @Size(min = 8, max = 20)
  private String password;

  @NotBlank
  @Size(min = 8, max = 20)
  private String passwordConfirm;
}
