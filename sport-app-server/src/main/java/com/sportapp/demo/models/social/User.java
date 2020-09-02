package com.sportapp.demo.models.social;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity(name = "UserEntity")
@Table(name = "users", uniqueConstraints = {
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

  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private UserProps userProps;

  //----------------Constructors--------------------

  public User(String username, String password, String mail) {
    this.username = username;
    this.password = password;
    this.mail = mail;
  }

  public User() {
  }

  //----------------Getters&Setters--------------------

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

}
