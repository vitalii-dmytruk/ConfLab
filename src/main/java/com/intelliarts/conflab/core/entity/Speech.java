package com.intelliarts.conflab.core.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "speech")
public class Speech extends AbstractPersistable<Long> {

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Speech title cannot be empty.")
    @Length(max = 255, message = "Speech title is greater then {max} characters.")
    @Column(nullable = false, unique = true)
    @NotEmpty
    private String title;

    @ManyToOne
    @JoinColumn(name = "lang_id")
    private Language lang;

//    @JsonIgnore
//    @OneToMany(mappedBy = "speech")
//    private Set<SpeechSpeaker> speechSpeakers;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "event_id", updatable = false)
    private Event event;

    @ManyToMany
    @JoinTable(name = "speech_speaker",
               joinColumns = @JoinColumn(name = "speech_id"),
               inverseJoinColumns = @JoinColumn(name = "speaker_id"))
    private Set<Speaker> speakers;

}