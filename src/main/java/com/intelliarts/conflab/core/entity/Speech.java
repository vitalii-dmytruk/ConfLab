package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.intelliarts.conflab.core.entity.converter.LocaleToLanguageConverter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Locale;
import java.util.Set;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Table(name = "speech")
public class Speech {

    @Id
    @Column
    @SequenceGenerator(name = "speech_seq", sequenceName = "speech_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "speech_seq")
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotBlank(message = "Speech title cannot be empty.")
    @Length(max = 255, message = "Speech title is greater then {max} characters.")
    @Column(nullable = false, unique = true)
    @NotEmpty
    private String title;

    @Column
    @Convert(converter = LocaleToLanguageConverter.class)
    private Locale lang;

    @Column
    @ManyToMany
    @JoinTable(name = "speech_speaker",
               joinColumns = @JoinColumn(name = "speech_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "speaker_id", referencedColumnName = "id"))
    private Set<Speaker> speakers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Locale getLang() {
        return lang;
    }

    public void setLang(Locale lang) {
        this.lang = lang;
    }

    public Set<Speaker> getSpeakers() {
        return speakers;
    }

    public void setSpeakers(Set<Speaker> speakers) {
        this.speakers = speakers;
    }
}