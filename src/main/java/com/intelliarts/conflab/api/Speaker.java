package com.intelliarts.conflab.api;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

public class Speaker {
    @NotBlank(message = "Speaker name cannot be empty.")
    @Length(max = 255, message = "Speaker name is greater then {max} characters.")
    private String name;

    @Length(max = 255, message = "Speaker position is greater then {max} characters.")
    private String position;

    private String about;

    @Email(message = "'${validatedValue}' is not valid email address.")
    @NotBlank(message = "Email address is not specified.")
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}