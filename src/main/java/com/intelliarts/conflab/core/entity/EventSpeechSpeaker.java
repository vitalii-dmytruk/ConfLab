package com.intelliarts.conflab.core.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "event_speech_speaker_map")
@AllArgsConstructor
@NoArgsConstructor
public class EventSpeechSpeaker extends AbstractPersistable<Long> {

    @ManyToOne
    @JoinColumn(name = "event_id")
    @Getter
    @Setter
    private Event event;


    @ManyToOne
    @JoinColumn(name = "speech_speaker_id")
    @Getter
    @Setter
    private SpeechSpeaker speechSpeaker;
}