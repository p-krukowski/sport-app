package com.sportapp.demo.models.dtos.sportdata.soccer.get;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class EventSoccerGetDto {

  private String homeTeamName;
  private String awayTeamName;
  private Integer homeScore;
  private Integer awayScore;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd.MM.yyyy")
  private LocalDate date;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
  private LocalTime time;

  private LocalDateTime dateTime;
  private int roundNumber;

}
