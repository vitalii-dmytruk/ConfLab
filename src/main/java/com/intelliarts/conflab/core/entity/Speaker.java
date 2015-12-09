package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Set;


@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "speaker")
public class Speaker {

    @Id
    @SequenceGenerator(name = "speaker_seq", sequenceName = "speaker_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "speaker_seq")
    @Column
    private Long id;

    @NotEmpty
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

    @ManyToMany(mappedBy = "speakers")
    private Set<Speech> speeches;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Set<Speech> getSpeeches() {
        return speeches;
    }

    public void setSpeeches(Set<Speech> speeches) {
        this.speeches = speeches;
    }
}