package com.sportapp.demo.models.sportdata;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Event {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  private LocalDate date;
  private LocalTime time;
  private LocalDateTime dateTime;
  private boolean postponed;

  //----------Getters&Setters-----------

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public boolean getPostponed() {
    return postponed;
  }

  public void setPostponed(boolean postponed) {
    this.postponed = postponed;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate dateEvent) {
    this.date = dateEvent;
  }

  public LocalTime getTime() {
    return time;
  }

  public void setTime(LocalTime time) {
    this.time = time;
  }

  public LocalDateTime getDateTime() {
    return dateTime;
  }

  public void setDateTime(LocalDateTime dateTime) {
    this.dateTime = dateTime;
  }
}
