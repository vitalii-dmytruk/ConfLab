package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "speech_speaker")
public class SpeechSpeaker {

    @Id
    @SequenceGenerator(name = "speech_speaker_seq", sequenceName = "speech_speaker_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "speech_speaker_seq")
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "speech_id")
    private Speech speech;

    @ManyToOne
    @JoinColumn(name = "speaker_id")
    private Speaker speaker;

    @OneToMany(mappedBy = "speechSpeaker")
    private Set<EventSpeechSpeaker> eventSpeechSpeakers;

    public SpeechSpeaker() {
    }

    public SpeechSpeaker(Speech speech, Speaker speaker) {
        this.speech = speech;
        this.speaker = speaker;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Speech getSpeech() {
        return speech;
    }

    public void setSpeech(Speech speech) {
        this.speech = speech;
    }

    public Speaker getSpeaker() {
        return speaker;
    }

    public void setSpeaker(Speaker speaker) {
        this.speaker = speaker;
    }

    public Set<EventSpeechSpeaker> getEventSpeechSpeakers() {
        return eventSpeechSpeakers;
    }

    public void setEventSpeechSpeakers(Set<EventSpeechSpeaker> eventSpeechSpeakers) {
        this.eventSpeechSpeakers = eventSpeechSpeakers;
    }
}

