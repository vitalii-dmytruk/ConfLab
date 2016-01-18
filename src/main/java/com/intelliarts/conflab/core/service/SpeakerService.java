package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeakerService {

    private SpeakerRepository         speakerRepository;
    private EventSpeechSpeakerService eventSpeechSpeakerService;

    @Autowired
    public SpeakerService(SpeakerRepository speakerRepository, EventSpeechSpeakerService eventSpeechSpeakerService) {
        this.speakerRepository = speakerRepository;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    @Transactional(readOnly = true)
    public List<Speaker> findAll() {
        return speakerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Speaker findById(Long id) {
        Optional<Speaker> speaker = speakerRepository.findOne(id);
        return speaker.orElseThrow(() -> new EntityNotFoundException("Speaker with ID '" + id + "' not found."));
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findBySpeech(Speech speech) {
        return speakerRepository.findBySpeechId(speech.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEvent(Event event) {
        return speakerRepository.findByEventId(event.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEventAndSpeech(Event event, Speech speech) {
        return speakerRepository.findByEventAndSpeech(event.getId(), speech.getId());
    }

    @Transactional
    public Speaker create(Speaker speaker) {
        speaker.setId(null);
        Speaker createdSpeaker = speakerRepository.save(speaker);
        linkToSpeech(createdSpeaker, null);
        return createdSpeaker;
    }

    @Transactional
    public Speaker update(Speaker speaker) {
        if (speaker.getId() == null) {
            throw new IllegalArgumentException("Speaker Id is not specified");
        }
        return speakerRepository.save(speaker);
    }

    @Transactional
    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech) {
        Speaker createdSpeaker = create(speaker);
        linkToSpeech(createdSpeaker, speech);
        return createdSpeaker;
    }

    @Transactional
    public SpeechSpeaker linkToSpeech(Speaker speaker, Speech speech) {
        return eventSpeechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    @Transactional
    public Speaker createAndLinkToEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechNullSpeakerLink(event, speech);
        Speaker createdSpeaker = create(speaker);
        SpeechSpeaker speechSpeaker = linkToSpeech(createdSpeaker, speech);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
        return createdSpeaker;
    }

    @Transactional
    public void linkToEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventNullSpeechOrNullSpeakerLinks(event, speech, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, speaker);
    }

    @Transactional
    public void unlinkFromEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLink(event, speech, speaker);
        if (findByEventAndSpeech(event, speech).isEmpty()) {
            eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, null);
        }
    }

    @Transactional
    public Speaker createAndLinkToEvent(Speaker speaker, Event event) {
        Speaker createdSpeaker = create(speaker);
        linkToEvent(createdSpeaker, event);
        return createdSpeaker;
    }

    @Transactional
    public void linkToEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, null, speaker);
    }

    @Transactional
    public void unlinkFromEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLinks(event, speaker);
    }

}