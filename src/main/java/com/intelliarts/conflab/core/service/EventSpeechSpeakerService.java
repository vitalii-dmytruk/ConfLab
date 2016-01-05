package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.EventSpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventSpeechSpeakerService {

    private EventSpeechSpeakerRepository eventSpeechSpeakerRepository;

    @Autowired
    public EventSpeechSpeakerService(EventSpeechSpeakerRepository eventSpeechSpeakerRepository) {
        this.eventSpeechSpeakerRepository = eventSpeechSpeakerRepository;
    }

    public void createEventSpeechSpeakerLink(Event event, SpeechSpeaker speechSpeaker){
        eventSpeechSpeakerRepository.save(new EventSpeechSpeaker(event, speechSpeaker));
    }

    public void deleteSpeakerFromEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerRepository.deleteBySpeakerId(speaker.getId(), event.getId());
    }

    public void deleteSpeechFromEvent(Speech speech, Event event) {
        eventSpeechSpeakerRepository.deleteBySpeechId(speech.getId(), event.getId());
    }
}