package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class SpeechServiceImpl extends DefaultService<Speech, Long> implements SpeechService {

    private EventSpeechSpeakerService eventSpeechSpeakerService;
    private SpeechRepository          speechRepository;

    @Autowired
    public SpeechServiceImpl(SpeechRepository speechRepository, EventSpeechSpeakerService eventSpeechSpeakerService) {
        super(speechRepository);
        this.speechRepository = speechRepository;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    @Override
    public Collection<Speech> find(Event event, Speaker speaker) {
        if (event != null && speaker != null) {
            return speechRepository.findByEventAndSpeaker(event.getId(), speaker.getId());
        } else if (event != null) {
            return speechRepository.findByEventId(event.getId());
        } else if (speaker != null) {
            return speechRepository.findBySpeakerId(speaker.getId());
        } else {
            return speechRepository.findAll();
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Speech> findBySpeaker(Speaker speaker) {
        return speechRepository.findBySpeakerId(speaker.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Speech> findByEvent(Event event) {
        return speechRepository.findByEventId(event.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Speech> findByEventAndSpeaker(Event event, Speaker speaker) {
        return speechRepository.findByEventAndSpeaker(event.getId(), speaker.getId());
    }

    @Transactional
    @Override
    public Speech create(Speech speech) {
        Speech createdSpeech = super.create(speech);
        linkToSpeaker(createdSpeech, null);
        return createdSpeech;
    }

    @Override
    @Transactional
    public Speech createAndLinkToSpeaker(Speech speech, Speaker speaker) {
        Speech createdSpeech = create(speech);
        linkToSpeaker(createdSpeech, speaker);
        return createdSpeech;
    }

    @Override
    @Transactional
    public SpeechSpeaker linkToSpeaker(Speech speech, Speaker speaker) {
        return eventSpeechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    @Override
    @Transactional
    public void unlinkFromSpeaker(Long speechId, Speaker speaker) {
        Speech speech = findById(speechId);
        eventSpeechSpeakerService.deleteSpeechSpeakerLink(speech, speaker);
    }

    @Override
    @Transactional
    public Speech createAndLinkToEventSpeaker(Speech speech, Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteEventNullSpeechSpeakerLink(event, speaker);
        Speech createdSpeech = create(speech);
        SpeechSpeaker speechSpeaker = linkToSpeaker(speech, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
        return createdSpeech;
    }

    @Override
    @Transactional
    public void linkToEventSpeaker(Speech speech, Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteEventNullSpeechOrNullSpeakerLinks(event, speech, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, speaker);
    }

    @Override
    @Transactional
    public void unlinkFromEventSpeaker(Speech speech, Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLink(event, speech, speaker);
        if (findByEventAndSpeaker(event, speaker).isEmpty()) {
            eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, null, speaker);
        }
    }

    @Override
    @Transactional
    public Speech createAndLinkToEvent(Speech speech, Event event) {
        Speech createdSpeech = create(speech);
        linkToEvent(createdSpeech, event);
        return createdSpeech;
    }

    @Override
    @Transactional
    public void linkToEvent(Speech speech, Event event) {
        Set<SpeechSpeaker> speechSpeakers = eventSpeechSpeakerService.findSpeechSpeakerLink(speech);
        if (hasSpeakers(speechSpeakers)) {
            speechSpeakers.forEach(speechSpeaker -> {
                if (Objects.nonNull(speechSpeaker.getSpeaker())) {
                    eventSpeechSpeakerService.deleteEventNullSpeechSpeakerLink(event, speechSpeaker.getSpeaker());
                    eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
                }
            });
        } else {
            eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeakers.iterator().next());
        }
    }

    @Override
    @Transactional
    public void unlinkFromEvent(Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLinks(event, speech);
    }

    //TODO refactor:
    @Override
    public List<Speech> update(List<Speech> speeches) {
        speeches.forEach(speechRepository::update);
        return speeches;
    }

    @Override
    public void resetSpeechesWithHigherDay(Integer maxDay) {
        speechRepository.findSpeechesWithHigherDay(maxDay).stream().forEach(this::resetScheduleInfo);
    }

    @Override
    public void resetSpeechesWithTrackId(Integer trackId) {
        speechRepository.findSpeechesWithTrackId(trackId).stream().forEach(this::resetScheduleInfo);
    }

    private boolean hasSpeakers(Set<SpeechSpeaker> speechSpeakers) {
        return speechSpeakers.size() > 1;
    }

    private void resetScheduleInfo(Speech speech) {
        speech.setDay(null);
        speech.setAllTracks(false);
        speech.setDuration(null);
        speech.setPosition(null);
        speech.setTrack(null);
        speechRepository.update(speech);
    }
}