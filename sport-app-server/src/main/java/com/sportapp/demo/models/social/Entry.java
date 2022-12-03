package com.sportapp.demo.models.social;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "Entry")
@Table(name = "entries")
@Getter
@Setter
public class Entry extends Post {

    @OneToMany(mappedBy = "entry", orphanRemoval = true)
    private List<EntryComment> comments;

}
