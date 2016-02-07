package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;


@Entity
@Table(name = "speaker")
public class Speaker extends AbstractPersistable<Long> {

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Speaker name cannot be empty.")
    @Length(max = 255, message = "Speaker name is greater then {max} characters.")
    private String name;

    @Email(message = "'${validatedValue}' is not valid email address.")
    @NotBlank(message = "Email address is not specified.")
    @Column(nullable = false, unique = true)
    private String email;

    @Length(max = 255, message = "Speaker position is greater then {max} characters.")
    @Column
    private String position;

    @Column
    private String about;

    @Column
    private String image;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name="company_id")
    private Company company;

    @JsonIgnore
    @OneToMany(mappedBy = "speaker")
    private Set<SpeechSpeaker> speechSpeakers;

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

    public Set<SpeechSpeaker> getSpeechSpeakers() {
        return speechSpeakers;
    }

    public void setSpeechSpeakers(Set<SpeechSpeaker> speechSpeakers) {
        this.speechSpeakers = speechSpeakers;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}