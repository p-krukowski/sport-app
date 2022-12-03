package com.sportapp.demo.models.dtos.social;

import com.sportapp.demo.models.social.Rank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserPropsGetDto {

  private Rank rank;
  private int score;

}
