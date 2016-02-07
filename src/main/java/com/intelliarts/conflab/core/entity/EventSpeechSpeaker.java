package com.intelliarts.conflab.core.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "event_speech_speaker_map")
public class EventSpeechSpeaker extends AbstractPersistable<Long> {

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


