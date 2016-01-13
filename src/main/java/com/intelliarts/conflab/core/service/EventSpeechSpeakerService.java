package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.EventSpeechSpeakerRepository;
import com.intelliarts.conflab.core.repository.SpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;
import java.util.Set;

@Service
public class EventSpeechSpeakerService {

    private EventSpeechSpeakerRepository eventSpeechSpeakerRepository;
    private SpeechSpeakerRepository      speechSpeakerRepository;

    @Autowired
    public EventSpeechSpeakerService(EventSpeechSpeakerRepository eventSpeechSpeakerRepository,
            SpeechSpeakerRepository speechSpeakerRepository) {
        this.eventSpeechSpeakerRepository = eventSpeechSpeakerRepository;
        this.speechSpeakerRepository = speechSpeakerRepository;
    }

    public EventSpeechSpeaker create(EventSpeechSpeaker eventSpeechSpeaker) {
        return eventSpeechSpeakerRepository.save(eventSpeechSpeaker);
    }

    @Transactional
    public SpeechSpeaker createSpeechSpeakerLink(Speech speech, Speaker speaker) {
        return speechSpeakerRepository.save(new SpeechSpeaker(speech, speaker));
    }

    public SpeechSpeaker findSpeechSpeakerLink(Speech speech, Speaker speaker) {
        Optional<SpeechSpeaker> speechSpeaker = speechSpeakerRepository.findBySpeechAndSpeaker(speech, speaker);
        return speechSpeaker.orElseThrow(() -> new EntityNotFoundException("Speech with ID = " + speech.getId() +
                                                                           " is not linked to Speaker with ID = " +
                                                                           speaker.getId()));
    }

    public Set<SpeechSpeaker> findSpeechSpeakerLink(Speech speech) {
        return speechSpeakerRepository.findBySpeech(speech);
    }

    public void deleteSpeechSpeakerLink(Speech speech, Speaker speaker) {
        speechSpeakerRepository.deleteBySpeechAndSpeaker(speech, speaker);
    }

    public EventSpeechSpeaker createEventSpeechSpeakerLink(Event event, Speech speech, Speaker speaker) {
        SpeechSpeaker speechSpeaker = findSpeechSpeakerLink(speech, speaker);
        return eventSpeechSpeakerRepository.save(new EventSpeechSpeaker(event, speechSpeaker));
    }

    public EventSpeechSpeaker createEventSpeechSpeakerLink(Event event, SpeechSpeaker speechSpeaker) {
        return eventSpeechSpeakerRepository.save(new EventSpeechSpeaker(event, speechSpeaker));
    }

    public void deleteEventSpeechNullSpeakerLink(Event event, Speech speech) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeechAndNullSpeaker(event.getId(), speech.getId());
    }

    public void deleteEventNullSpeechSpeakerLink(Event event, Speaker speaker) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeakerAndNullSpeech(event.getId(), speaker.getId());
    }

    public void deleteEventNullSpeechOrNullSpeakerLinks(Event event, Speech speech, Speaker speaker) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeechAndNullSpeaker(event.getId(), speech.getId());
        eventSpeechSpeakerRepository.deleteByEventAndSpeakerAndNullSpeech(event.getId(), speaker.getId());
    }

    public void deleteEventSpeechSpeakerLinks(Event event, Speaker speaker) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeaker(event.getId(), speaker.getId());
    }

    public void deleteEventSpeechSpeakerLinks(Event event, Speech speech) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeech(event.getId(), speech.getId());
    }

    public void deleteEventSpeechSpeakerLink(Event event, Speech speech, Speaker speaker) {
        eventSpeechSpeakerRepository.deleteByEventAndSpeechAndSpeaker(event.getId(), speech.getId(), speaker.getId());
    }

}