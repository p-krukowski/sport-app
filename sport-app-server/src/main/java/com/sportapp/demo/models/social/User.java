package com.sportapp.demo.models.social;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "UserEntity")
@Table (name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "mail"
        })
})
public class User extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 30)
    private String username;

    @NotBlank
    @Size(max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;

    @NotBlank
    @Email
    private String mail;

    @OneToOne
    private UserProps userProps;

    @OneToMany(mappedBy = "author")
    private List<Entry> entries;

    @OneToMany(mappedBy = "author")
    private List<News> newsList;

    @ManyToMany(mappedBy = "likers")
    private List<Entry> likedEntries;

    @ManyToMany(mappedBy = "likers")
    private List<Comment> likedComments;

    @ManyToMany(mappedBy = "dislikers")
    private List<Comment> dislikedComments;

    //----------------Constructors--------------------

    public User(String username, String password, String mail) {
        this.username = username;
        this.password = password;
        this.mail = mail;
    }

    public User() {
    }

    //----------------Methods--------------------

    public void addLikedEntry(Entry entry) {
        List<Entry> entries = new ArrayList<>();
        if(getLikedEntries() != null) {
            entries = getLikedEntries();
        }
        entries.add(entry);
        setLikedEntries(entries);
    }

    public void removeLikedEntry(Entry entry) {
        List<Entry> entryList = getLikedEntries();
        entryList.remove(entry);
        setLikedEntries(entryList);
    }

    //----------------Getters&Setters--------------------

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    public List<Entry> getLikedEntries() {
        return likedEntries;
    }

    public void setLikedEntries(List<Entry> likedEntries) {
        this.likedEntries = likedEntries;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserProps getUserProps() {
        return userProps;
    }

    public void setUserProps(UserProps userProps) {
        this.userProps = userProps;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public List<Comment> getLikedComments() {
        return likedComments;
    }

    public void setLikedComments(List<Comment> likedComments) {
        this.likedComments = likedComments;
    }

    public List<Comment> getDislikedComments() {
        return dislikedComments;
    }

    public void setDislikedComments(List<Comment> dislikedComments) {
        this.dislikedComments = dislikedComments;
    }

    public List<News> getNewsList() {
        return newsList;
    }

    public void setNewsList(List<News> newsList) {
        this.newsList = newsList;
    }
}
