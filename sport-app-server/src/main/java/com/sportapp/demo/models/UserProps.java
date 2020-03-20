package com.sportapp.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users_props")
public class UserProps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "ranks")
    private Rank rank = Rank.RANK_LOW;

    private int score = 0;

    private LocalDate signUpTime = LocalDate.now();

    @OneToOne(cascade={CascadeType.ALL})
    @JsonIgnore
    private User user;



    public UserProps(User user) {
        this.user = user;
    }

    public UserProps() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Rank getRank() {
//        return rank;
//    }
//
//    public void setRank(Rank rank) {
//        this.rank = rank;
//    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public LocalDate getSignUpTime() {
        return signUpTime;
    }

    public void setSignUpTime(LocalDate signUpTime) {
        this.signUpTime = signUpTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


}
