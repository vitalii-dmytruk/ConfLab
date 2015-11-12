package com.intelliarts.conflab.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

public class User {
    @NotBlank(message = "Username cannot be empty")
    @Length(max = 50, message = "Username cannot be longer than {max} characters")
    private String username;

    @Email(message = "Invalid user email")
    @Length(max = 50, message = "User's email cannot be longer than {max} characters")
    private String email;

    @NotBlank(message = "User's First Name cannot be empty")
    @Length(max = 255, message = "User's First Name cannot be longer than {max} characters")
    private String firstName;

    @NotBlank(message = "User's Last Name cannot be empty")
    @Length(max = 255, message = "User's Last Name cannot be longer than {max} characters")
    private String lastName;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
