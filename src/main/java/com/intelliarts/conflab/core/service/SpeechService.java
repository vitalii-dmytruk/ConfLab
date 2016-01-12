package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public List<Speech> findAll() {
        return speechRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Speech findById(Long id) {
        Optional<Speech> speech = speechRepository.findOne(id);
        return speech.orElseThrow(() -> new EntityNotFoundException("Speech with ID '" + id + "' not found."));
    }

    @Transactional(readOnly = true)
    public Set<Speech> findBySpeaker(Speaker speaker) {
        return speechRepository.findBySpeakerId(speaker.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speech> findByEvent(Event event) {
        return speechRepository.findByEventId(event.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speech> findByEventAndSpeaker(Event event, Speaker speaker) {
        return speechRepository.findByEventAndSpeaker(event.getId(), speaker.getId());
    }

    @Transactional
    public Speech create(Speech speech) {
        speech.setId(null);
        Speech createdSpeech = speechRepository.save(speech);
        linkToSpeaker(createdSpeech, null);
        return createdSpeech;
    }

    @Transactional
    public Speech update(Speech speech) {
        if (speech.getId() == null) {
            throw new IllegalArgumentException("Speech Id is not specified");
        }
        return speechRepository.save(speech);
    }

    @Transactional
    public Speech createAndLinkToSpeaker(Speech speech, Speaker speaker) {
        Speech createdSpeech = create(speech);
        linkToSpeaker(createdSpeech, speaker);
        return createdSpeech;
    }

    @Transactional
    public SpeechSpeaker linkToSpeaker(Speech speech, Speaker speaker) {
        return speechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    @Transactional
    public void unlinkFromSpeaker(Long speechId, Speaker speaker) {
        Speech speech = findById(speechId);
        speechSpeakerService.deleteBySpeechAndSpeaker(speech, speaker);
    }

    @Transactional
    public Speech createAndLinkToEventSpeaker(Speech speech, Speaker speaker, Event event) {
        Speech createdSpeech = create(speech);
        SpeechSpeaker speechSpeaker = linkToSpeaker(speech, speaker);
        eventSpeechSpeakerService.create(new EventSpeechSpeaker(event, speechSpeaker));
        return createdSpeech;
    }

    @Transactional
    public void linkToEventSpeaker(Speech speech, Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteByEventAndSpeechAndSpeaker(event.getId(), speech.getId(), null);
        SpeechSpeaker speechSpeaker = speechSpeakerService.findBySpeechAndSpeaker(speech, speaker);
        eventSpeechSpeakerService.create(new EventSpeechSpeaker(event, speechSpeaker));
    }

    @Transactional
    public void unlinkFromEventSpeaker(Speech speech, Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteByEventAndSpeechAndSpeaker(event.getId(), speech.getId(), speaker.getId());
    }

    @Transactional
    public Speech createAndLinkToEvent(Speech speech, Event event) {
        Speech createdSpeech = create(speech);
        linkToEvent(createdSpeech, event);
        return createdSpeech;
    }

    @Transactional
    public void linkToEvent(Speech speech, Event event) {
        Set<SpeechSpeaker> speechSpeakers = speechSpeakerService.findBySpeech(speech);
        if (hasSpeakers(speechSpeakers)) {
            eventSpeechSpeakerService.create(getEventSpeechSpeakers(event, speechSpeakers));
        } else {
            eventSpeechSpeakerService.create(new EventSpeechSpeaker(event, speechSpeakers.iterator().next()));
        }
    }

    @Transactional
    public void unlinkFromEvent(Speech speech, Event event) {
        eventSpeechSpeakerService.deleteByEventAndSpeech(event, speech);
    }

    private boolean hasSpeakers(Set<SpeechSpeaker> speechSpeakers) {
        return speechSpeakers.size() > 1;
    }

    private Set<EventSpeechSpeaker> getEventSpeechSpeakers(Event event, Set<SpeechSpeaker> speechSpeakers) {
        return speechSpeakers.stream()
                             .filter(speechSpeaker -> Objects.nonNull(speechSpeaker.getSpeaker()))
                             .map(speechSpeaker -> new EventSpeechSpeaker(event, speechSpeaker))
                             .collect(Collectors.toSet());
    }
}