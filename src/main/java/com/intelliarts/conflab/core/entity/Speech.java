package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String description;

    @NotBlank(message = "Speech title cannot be empty.")
    @Length(max = 255, message = "Speech title is greater then {max} characters.")
    @Column(nullable = false, unique = true)
    @NotEmpty
    private String title;

    @ManyToOne
    @JoinColumn(name = "lang_id")
    private Language lang;

    @JsonIgnore
    @OneToMany(mappedBy = "speech")
    private Set<SpeechSpeaker> speechSpeakers;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Language getLang() {
        return lang;
    }

    public void setLang(Language lang) {
        this.lang = lang;
    }

    public Set<SpeechSpeaker> getSpeechSpeakers() {
        return speechSpeakers;
    }

    public void setSpeechSpeakers(Set<SpeechSpeaker> speechSpeakers) {
        this.speechSpeakers = speechSpeakers;
    }
}