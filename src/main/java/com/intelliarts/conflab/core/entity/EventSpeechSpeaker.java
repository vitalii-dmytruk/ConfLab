package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "event_speech_speaker_map")
public class EventSpeechSpeaker {

    @Id
    @SequenceGenerator(name = "event_speech_speaker_seq",
                       sequenceName = "event_speech_speaker_id_seq",
                       allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_speech_speaker_seq")
    @Column
    private Long id;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


    @ManyToOne
    @JoinColumn(name = "speech_speaker_id")
    private SpeechSpeaker speechSpeaker;

    public EventSpeechSpeaker() {
    }

    public EventSpeechSpeaker(Event event, SpeechSpeaker speechSpeaker) {
        this.event = event;
        this.speechSpeaker = speechSpeaker;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public SpeechSpeaker getSpeechSpeaker() {
        return speechSpeaker;
    }

    public void setSpeechSpeaker(SpeechSpeaker speechSpeaker) {
        this.speechSpeaker = speechSpeaker;
    }
}


