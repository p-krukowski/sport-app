package com.sportapp.demo.models.dtos;

import com.sportapp.demo.models.Role;
import com.sportapp.demo.models.UserProps;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

public class UserDTO {

    private Long id;
    private String username;
    private String mail;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;
    private UserProps userProps;

    public UserProps getUserProps() {
        return userProps;
    }

    public void setUserProps(UserProps userProps) {
        this.userProps = userProps;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
