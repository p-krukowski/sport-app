package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity(name = "Comment")
@Table(name = "comments")
public class Comment extends Post {

    @ManyToMany
    private List<User> dislikers;

    //----------Getters&Setters-----------

    public List<User> getDislikers() {
        return dislikers;
    }

    public void setDislikers(List<User> dislikers) {
        this.dislikers = dislikers;
    }

}
