package com.sportapp.demo.models.social;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.List;

@Entity(name = "Comment")
@Table(name = "comments")
public class Comment extends Post {

    @ManyToOne
    private Entry entry;

    @ManyToMany
    private List<User> dislikers;

    //----------Getters&Setters-----------

    public Entry getEntry() {
        return entry;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }

    public List<User> getDislikers() {
        return dislikers;
    }

    public void setDislikers(List<User> dislikers) {
        this.dislikers = dislikers;
    }

}
