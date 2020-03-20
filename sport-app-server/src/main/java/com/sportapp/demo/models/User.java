package com.sportapp.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
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
    @JsonIgnore
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;

    @NotBlank
    @Email
    private String mail;

    @OneToOne(mappedBy = "user")
    private UserProps userProps;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Entry> entries;

    @JsonIgnore
    @ManyToMany(mappedBy = "likers")
    private List<Entry> likedEntries;

    @JsonIgnore
    @ManyToMany(mappedBy = "dislikers")
    private List<Entry> dislikedEntries;

    public User(String username, String password, String mail) {
        this.username = username;
        this.password = password;
        this.mail = mail;
    }

    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public User() {
    }

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

    public List<Entry> getDislikedEntries() {
        return dislikedEntries;
    }

    public void setDislikedEntries(List<Entry> dislikedEntries) {
        this.dislikedEntries = dislikedEntries;
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

    public void addEntry(Entry entry) {
        List<Entry> entryList = getLikedEntries();
        entryList.add(entry);
        setLikedEntries(entryList);
    }

    public void removeEntry(Entry entry) {
        List<Entry> entryList = getLikedEntries();
        entryList.remove(entry);
        setLikedEntries(entryList);
    }
}
