package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeakerService {

    private SpeakerRepository         speakerRepository;
    private SpeechSpeakerService      speechSpeakerService;
    private EventSpeechSpeakerService eventSpeechSpeakerService;

    @Autowired
    public SpeakerService(SpeakerRepository speakerRepository, SpeechSpeakerService speechSpeakerService,
            EventSpeechSpeakerService eventSpeechSpeakerService) {
        this.speakerRepository = speakerRepository;
        this.speechSpeakerService = speechSpeakerService;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    public Speaker findById(Long id) {
        Optional<Speaker> speaker = speakerRepository.findOne(id);
        return speaker.orElseThrow(() -> new EntityNotFoundException("Speaker with ID '" + id + "' not found."));
    }

    @Transactional
    public Speaker create(Speaker speaker) {
        speaker.setId(null);
        Speaker createdSpeaker = speakerRepository.save(speaker);
        linkToSpeech(createdSpeaker, null);
        return createdSpeaker;
    }

    @Transactional
    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech) {
        Speaker createdSpeaker = create(speaker);
        linkToSpeech(createdSpeaker, speech);
        return createdSpeaker;
    }

    @Transactional
    public void linkToSpeech(Long speakerId, Speech speech) {
        Speaker speaker = findById(speakerId);
        linkToSpeech(speaker, speech);
    }

    @Transactional
    public Speaker createAndLinkToEvent(Speaker speaker, Event event) {
        Speaker createdSpeaker = create(speaker);
        linkToEvent(createdSpeaker, event);
        return createdSpeaker;
    }

    @Transactional
    public void linkToEvent(Long speakerId, Event event) {
        Speaker speaker = findById(speakerId);
        linkToEvent(speaker, event);
    }

    @Transactional
    public void unlinkFromEvent(Long speakerId, Event event) {
        Speaker speaker = findById(speakerId);
        unlinkFromEvent(speaker, event);
    }

    @Transactional
    public Speaker update(Speaker speaker) {
        if (speaker.getId() == null) {
            throw new IllegalArgumentException("Speaker Id is not specified");
        }
        return speakerRepository.save(speaker);
    }

    public List<Speaker> findAll() {
        return speakerRepository.findAll();
    }

    public Set<Speaker> findBySpeech(Speech speech) {
        return speakerRepository.findBySpeechId(speech.getId());
    }

    public List<Speaker> findByEvent(Event event) {
        return speakerRepository.findByEventId(event.getId());
    }

    private void linkToSpeech(Speaker speaker, Speech speech) {
        speechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    private void linkToEvent(Speaker speaker, Event event) {
        SpeechSpeaker speechSpeaker = speechSpeakerService.findOrCreate(null, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    }

    private void unlinkFromEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteSpeakerFromEvent(speaker, event);
    }
}