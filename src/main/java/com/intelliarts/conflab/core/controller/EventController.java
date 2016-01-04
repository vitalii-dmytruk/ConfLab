package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.EventService;
import com.intelliarts.conflab.core.service.SpeakerService;
import com.intelliarts.conflab.core.service.SpeechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/events")
public class EventController {

    private EventService eventService;
    private SpeechService speechService;
    private SpeakerService speakerService;

    @Autowired
    public EventController(EventService eventService, SpeechService speechService, SpeakerService speakerService) {
        this.eventService = eventService;
        this.speechService = speechService;
        this.speakerService = speakerService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Event> findAll() {
        return eventService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Event create(@RequestBody @Validated Event event) {
        return eventService.save(event);
    }

    @RequestMapping(value = "/{id}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Event update(@PathVariable("id") Long id, @RequestBody @Validated Event event) {
        event.setId(id);
        return eventService.save(event);
    }

    @RequestMapping(value = "/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Event findById(@PathVariable("id") Long id) {
        return eventService.findById(id);
    }

    @RequestMapping(value = "/{id}/speakers",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speaker> getSpeakersByEventId(@PathVariable("id") Long id) {
        Event event = eventService.findById(id);
        return speakerService.findByEvent(event);
    }

    @RequestMapping(value = "/{id}/speeches",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speech> getSpeechesByEventId(@PathVariable("id") Long id) {
        Event event = eventService.findById(id);
        return speechService.findByEvent(event);
    }
}