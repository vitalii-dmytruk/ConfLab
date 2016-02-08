package com.intelliarts.conflab.core.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "speech_speaker")
public class SpeechSpeaker extends AbstractPersistable<Long> {

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

