package com.sportapp.demo.models.social;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Comment")
@Table(name = "comments")
public class Comment extends Post {

    @ManyToOne
    private Entry entry;

    @ManyToMany
    private List<User> dislikers;

    //---------Constructors---------------

    //----------Methods-------------------

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
