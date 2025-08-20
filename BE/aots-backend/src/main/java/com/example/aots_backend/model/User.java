package com.example.aots_backend.model;
import lombok.Data;
@Data
public class User {

  private Integer id;
  private String name;
  private String email;
  private boolean active;

  public User() {
  }

  public User(Integer id, String name, String email, boolean active) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.active = active;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public boolean isActive() {
    return active;
  }

  public void setActive(boolean active) {
    this.active = active;
  }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", active=" + active +
                '}';
    }
}
