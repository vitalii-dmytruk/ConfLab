package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeechService {

    private SpeechRepository          speechRepository;
    private SpeechSpeakerService      speechSpeakerService;
    private EventSpeechSpeakerService eventSpeechSpeakerService;

    @Autowired
    public SpeechService(SpeechRepository speechRepository, SpeechSpeakerService speechSpeakerService,
            EventSpeechSpeakerService eventSpeechSpeakerService) {
        this.speechRepository = speechRepository;
        this.speechSpeakerService = speechSpeakerService;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    @Transactional
    public Speech create(Speech speech) {
        speech.setId(null);
        Speech createdSpeech = speechRepository.save(speech);
        linkToSpeaker(createdSpeech, null);
        return createdSpeech;
    }

    @Transactional
    public Speech createAndLinkToSpeaker(Speech speech, Speaker speaker) {
        Speech createdSpeech = create(speech);
        linkToSpeaker(createdSpeech, speaker);
        return createdSpeech;
    }

    @Transactional
    public void linkToSpeaker(Long speechId, Speaker speaker) {
        Speech speech = findById(speechId);
        linkToSpeaker(speech, speaker);
    }

    @Transactional
    public void unlinkFromSpeaker(Long speechId, Speaker speaker) {
        Speech speech = findById(speechId);
        speechSpeakerService.deleteBySpeechAndSpeaker(speech, speaker);
    }

    @Transactional
    public Speech createAndLinkToEvent(Speech speech, Speaker speaker, Event event) {
        Speech createdSpeech = create(speech);
        linkToEvent(createdSpeech, speaker, event);
        return createdSpeech;
    }

    @Transactional
    public void linkToEvent(Long speechId, Event event) {
        Speech speech = findById(speechId);
        linkToEvent(speech, null, event);
    }

    @Transactional
    public void linkToEvent(SpeechSpeaker speechSpeaker, Event event) {
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    }

    @Transactional
    public Speech update(Speech speech) {
        if (speech.getId() == null) {
            throw new IllegalArgumentException("Speech Id is not specified");
        }
        return speechRepository.save(speech);
    }

    @Transactional
    public void unlinkFromEvent(Long speechId, Event event) {
        Speech speech = findById(speechId);
        unlinkFromEvent(speech, event);
    }

    public List<Speech> findAll() {
        return speechRepository.findAll();
    }

    public Speech findById(Long id) {
        Optional<Speech> speech = speechRepository.findOne(id);
        return speech.orElseThrow(() -> new EntityNotFoundException("Speech with ID '" + id + "' not found."));
    }

    public Set<Speech> findBySpeaker(Speaker speaker) {
        return speechRepository.findBySpeakerId(speaker.getId());
    }

    public List<Speech> findByEvent(Event event) {
        return speechRepository.findByEventId(event.getId());
    }

    public Set<Speech> findByEventAndSpeaker(Long eventId, Long speakerId) {
        return speechRepository.findByEventAndSpeaker(eventId, speakerId);
    }

    public void unlinkFromEvent(Speech speech, Event event) {
        eventSpeechSpeakerService.deleteSpeechFromEvent(speech, event);
    }

    public void linkToEvent(Speech speech, Speaker speaker, Event event) {
        SpeechSpeaker speechSpeaker = speechSpeakerService.findOrCreate(speech, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    }

    private void linkToSpeaker(Speech createdSpeech, Speaker speaker) {
        speechSpeakerService.createSpeechSpeakerLink(createdSpeech, speaker);
    }
}