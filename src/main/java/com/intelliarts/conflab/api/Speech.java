package com.intelliarts.conflab.api;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Locale;

public class Speech {
    private Long id;

    @NotBlank(message = "Speech title cannot be empty.")
    @Length(max = 255, message = "Speech title is greater then {max} characters.")
    private String title;

    private String description;

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

    public Locale getLang(){
        return this.lang;
    }

    public void setLang(Locale lang) {
        this.lang = lang;
    }

    @JsonGetter("lang")
    private String getJsonLang(){
        return this.lang.getLanguage();
    }

    @JsonSetter("lang")
    private void setJsonLang(String country){
        this.lang = new Locale(country);
    }
}