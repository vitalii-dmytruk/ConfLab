package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
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
public class Speaker extends AbstractImageAwareEntity<Long> {

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Speaker name cannot be empty.")
    @Length(max = 255, message = "Speaker name is greater then {max} characters.")
    @Getter
    @Setter
    private String name;

    @Email(message = "'${validatedValue}' is not valid email address.")
    @NotBlank(message = "Email address is not specified.")
    @Column(nullable = false, unique = true)
    @Getter
    @Setter
    private String email;

    @Length(max = 255, message = "Speaker position is greater then {max} characters.")
    @Column
    @Getter
    @Setter
    private String position;

    @Column
    @Getter
    @Setter
    private String about;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JoinColumn(name = "company_id")
    @Getter
    @Setter
    private Company company;

    @JsonIgnore
    @OneToMany(mappedBy = "speaker")
    @Getter
    @Setter
    private Set<SpeechSpeaker> speechSpeakers;
}