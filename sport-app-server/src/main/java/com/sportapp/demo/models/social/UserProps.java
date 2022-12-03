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
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserProps {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "ranks")
  private Rank rank = Rank.RANK_LOW;


  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(name = "user_league",
             joinColumns = @JoinColumn(name = "user_id"),
             inverseJoinColumns = @JoinColumn(name = "league_id"))
  private List<LeagueSoccer> leagues;

  @OneToOne
  private User user;

  private int score = 0;
}
