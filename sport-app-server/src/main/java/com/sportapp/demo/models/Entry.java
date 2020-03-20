package com.sportapp.demo.models;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "Entry")
@Table(name = "entries")
public class Entry {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime entryTime = LocalDateTime.now();
    @ManyToOne/*(fetch = FetchType.LAZY)*/
    private User author;
    private String value;
    private int score;
    @JsonIgnore
    @ManyToMany
    private List<User> likers;
    @JsonIgnore
    @ManyToMany
    private List<User> dislikers;

    public List<User> getLikers() {
        return likers;
    }

    public void setLikers(List<User> likers) {
        this.likers = likers;
    }

    public List<User> getDislikers() {
        return dislikers;
    }

    public void setDislikers(List<User> dislikers) {
        this.dislikers = dislikers;
    }

    public Entry(String value) {
        this.value = value;
    }

    public Entry() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getEntryTime() {
        return entryTime;
    }

    public void setEntryTime(LocalDateTime entryTime) {
        this.entryTime = entryTime;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getLikersSize() {
        return likers.size();
    }

    public void update(List<User> likers, int scoreChange) {
        setLikers(likers);
        setScore(getScore()+scoreChange);
    }
}
