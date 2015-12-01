package com.intelliarts.conflab.core.entity;

import com.intelliarts.conflab.core.entity.converter.LocaleToLanguageConverter;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Locale;

@Entity
@Table(name = "speech")
public class SpeechEntity {
    @Id
    @SequenceGenerator(name = "speech_seq", sequenceName = "speech_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "speech_seq")
    @Column
    private Long   id;

    @NotEmpty
    @Column(nullable = false, unique = true)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Convert(converter = LocaleToLanguageConverter.class)
    @Column
    private Locale lang;

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
}