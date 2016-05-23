package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "users")
public class User  extends AbstractPersistable<Long> implements UserDetails {

    @NotBlank(message = "Username cannot be empty")
    @Length(max = 50, message = "Username cannot be longer than {max} characters")
    @Column(nullable = false)
    @Getter
    @Setter
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    private String password;

    @Email(message = "Invalid user email")
    @Length(max = 50, message = "User's email cannot be longer than {max} characters")
    @Column(nullable = false, unique = true)
    @Getter
    @Setter
    private String email;

    @NotBlank(message = "User's First Name cannot be empty")
    @Length(max = 255, message = "User's First Name cannot be longer than {max} characters")
    @Column(nullable = false, name = "first_name")
    @Getter
    @Setter
    private String firstName;

    @NotBlank(message = "User's Last Name cannot be empty")
    @Length(max = 255, message = "User's Last Name cannot be longer than {max} characters")
    @Column(nullable = false, name = "last_name")
    @Getter
    @Setter
    private String lastName;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authority",
               joinColumns = @JoinColumn(name = "user_id"),
               inverseJoinColumns = @JoinColumn(name = "authority_id"))
    @Getter
    @Setter
    private Set<Authority> authorities;

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
