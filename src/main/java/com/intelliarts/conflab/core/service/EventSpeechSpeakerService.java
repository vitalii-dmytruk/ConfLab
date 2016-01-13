package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
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

    public EventSpeechSpeaker create(EventSpeechSpeaker eventSpeechSpeaker) {
        return eventSpeechSpeakerRepository.save(eventSpeechSpeaker);
    }

    public void deleteByEventAndSpeaker(Event event, Speaker speaker) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeaker(event.getId(), speaker.getId());
    }

    public void deleteByEventAndSpeech(Event event, Speech speech) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeech(event.getId(), speech.getId());
    }

    public void deleteByEventAndSpeechAndNullSpeaker(Long eventId, Long speechId) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeechAndNullSpeaker(eventId, speechId);
    }

    public void deleteByEventAndSpeakerAndNullSpeech(Long eventId, Long speakerId) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeakerAndNullSpeech(eventId, speakerId);
    }

    public void deleteByEventAndSpeechAndSpeaker(Long eventId, Long speechId, Long speakerId) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeechAndSpeaker(eventId, speechId, speakerId);
    }

}