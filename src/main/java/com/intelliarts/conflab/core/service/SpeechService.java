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
    public Speech createAndLinkToEvent(Speech speech, Event event) {
        Speech createdSpeech = create(speech);
        linkToEvent(createdSpeech, event);
        return createdSpeech;
    }

    @Transactional
    public void linkToEvent(Long speechId, Event event) {
        Speech speech = findById(speechId);
        linkToEvent(speech, event);
    }

    @Transactional
    public Speech update(Speech speech) {
        if (speech.getId() == null) {
            throw new IllegalArgumentException("Speech Id is not specified");
        }
        return speechRepository.save(speech);
    }

    public List<Speech> findAll() {
        return speechRepository.findAll();
    }

    public Speech findById(Long id) {
        Optional<Speech> speech = speechRepository.findOne(id);
        return speech.orElseThrow(() -> new EntityNotFoundException("Speech with ID '" + id + "' not found."));
    }

    public Set<Speech> findBySpeakerId(Long id) {
        return speechRepository.findBySpeakerId(id);
    }

    public List<Speech> findByEventId(Long id) {
        return speechRepository.findByEventId(id);
    }

    private void linkToSpeaker(Speech createdSpeech, Speaker speaker) {
        speechSpeakerService.createSpeechSpeakerLink(createdSpeech, speaker);
    }

    private void linkToEvent(Speech speech, Event event) {
        SpeechSpeaker speechSpeaker = speechSpeakerService.findOrCreate(speech, null);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    }

}