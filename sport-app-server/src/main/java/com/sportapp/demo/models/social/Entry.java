package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity(name = "Entry")
@Table(name = "entries")
public class Entry extends Post {

    @OneToMany(mappedBy = "entry", orphanRemoval = true)
    private List<EntryComment> comments;

    //----------Getters&Setters-----------

    public List<EntryComment> getComments() {
        return comments;
    }

    public void setComments(List<EntryComment> comments) {
        this.comments = comments;
    }
}
