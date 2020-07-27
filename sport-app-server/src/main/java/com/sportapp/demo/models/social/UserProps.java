package com.sportapp.demo.models.social;

import com.sportapp.demo.models.sportdata.LeagueSoccer;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users_props")
public class UserProps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "ranks")
    private Rank rank = Rank.RANK_LOW;

    private int score = 0;

    @ManyToMany(cascade=CascadeType.ALL)
    @JoinTable(name="user_league", joinColumns=@JoinColumn(name="user_id"), inverseJoinColumns=@JoinColumn(name="league_id"))
    private List<LeagueSoccer> leagues;


    public UserProps() {
    }

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
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

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
}
