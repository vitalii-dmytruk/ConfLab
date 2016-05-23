package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "speech")
public class Speech extends AbstractPersistable<Long> {

    @Column(columnDefinition = "TEXT")
    @Getter
    @Setter
    private String description;

    @NotBlank(message = "Speech title cannot be empty.")
    @Length(max = 255, message = "Speech title is greater then {max} characters.")
    @Column(nullable = false, unique = true)
    @NotEmpty
    @Getter
    @Setter
    private String title;

    @ManyToOne
    @JoinColumn(name = "lang_id")
    @Getter
    @Setter
    private Language lang;

    @JsonIgnore
    @OneToMany(mappedBy = "speech")
    @Getter
    @Setter
    private Set<SpeechSpeaker> speechSpeakers;
}