package com.sportapp.demo.models.social;

import javax.persistence.*;
import java.util.List;

@Entity(name = "Entry")
@Table(name = "entries")
public class Entry extends Post {

    @OneToMany(mappedBy = "entry", fetch = FetchType.LAZY)
    private List<Comment> comments;

    //----------Getters&Setters-----------


    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
