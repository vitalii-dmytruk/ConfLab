package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "speech_speaker")
public class SpeechSpeaker {

    @Id
    @SequenceGenerator(name = "speech_speaker_seq", sequenceName = "speech_speaker_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "speech_speaker_seq")
    @Column
    private Long id;

    @Column(name = "speech_id")
    private Long speechId;

    @Column(name = "speaker_id")
    private Long speakerId;


    public SpeechSpeaker() {
    }

    public SpeechSpeaker(Long speechId, Long speakerId) {
        this.speechId = speechId;
        this.speakerId = speakerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSpeechId() {
        return speechId;
    }

    public void setSpeechId(Long speechId) {
        this.speechId = speechId;
    }

    public Long getSpeakerId() {
        return speakerId;
    }

    public void setSpeakerId(Long speakerId) {
        this.speakerId = speakerId;
    }
}

