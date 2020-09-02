package com.sportapp.demo.models.social;

import com.sportapp.demo.models.sportdata.LeagueSoccer;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

@Entity
public class UserProps {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "ranks")
  private Rank rank = Rank.RANK_LOW;

  private int score = 0;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "user_league", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "league_id"))
  private List<LeagueSoccer> leagues;

  @OneToOne
  private User user;

//----------------Getters&Setters--------------------

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }

  public Rank getRank() {
    return rank;
  }

  public void setRank(Rank rank) {
    this.rank = rank;
  }

  public List<LeagueSoccer> getLeagues() {
    return leagues;
  }

  public void setLeagues(List<LeagueSoccer> leagues) {
    this.leagues = leagues;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }
}
