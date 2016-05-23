package com.intelliarts.conflab.core.entity;

import lombok.Getter;
import lombok.Setter;

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
    @Getter
    @Setter
    private Speech speech;

    @ManyToOne
    @JoinColumn(name = "speaker_id")
    @Getter
    @Setter
    private Speaker speaker;

    @OneToMany(mappedBy = "speechSpeaker")
    @Getter
    @Setter
    private Set<EventSpeechSpeaker> eventSpeechSpeakers;

    public SpeechSpeaker() {
    }

    public SpeechSpeaker(Speech speech, Speaker speaker) {
        this.speech = speech;
        this.speaker = speaker;
    }
}