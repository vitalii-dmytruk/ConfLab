package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private EventRepository           eventRepository;
    private EventSpeechSpeakerService eventSpeechSpeakerService;

    @Autowired
    public EventService(EventRepository eventRepository, EventSpeechSpeakerService eventSpeechSpeakerService) {
        this.eventRepository = eventRepository;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Event save(Event event) {
        return eventRepository.save(event);
    }

    public Event findById(Long id) {
        Optional<Event> event = eventRepository.findOne(id);
        return event.orElseThrow(() -> new EntityNotFoundException("Event with ID '" + id + "' " + "not found."));
    }

    public void link(Event event, SpeechSpeaker speechSpeaker) {
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    }
}