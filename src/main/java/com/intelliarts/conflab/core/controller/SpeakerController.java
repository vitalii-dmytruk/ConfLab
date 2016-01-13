package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.EventService;
import com.intelliarts.conflab.core.service.SpeakerService;
import com.intelliarts.conflab.core.service.SpeechService;
import com.intelliarts.conflab.security.HasAuthority;
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
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeakerController {

    private SpeakerService speakerService;
    private SpeechService  speechService;
    private EventService   eventService;

    @Autowired
    public SpeakerController(SpeakerService speakerService, SpeechService speechService, EventService eventService) {
        this.speakerService = speakerService;
        this.speechService = speechService;
        this.eventService = eventService;
    }

    @RequestMapping(value = "/speakers",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker create(@RequestBody @Validated Speaker speaker) {
        return speakerService.create(speaker);
    }

    @RequestMapping(value = "/speeches/{id}/speakers",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker createAndLinkToSpeech(@PathVariable("id") Long speechId, @RequestBody @Validated Speaker speaker) {
        Speech speech = speechService.findById(speechId);
        return speakerService.createAndLinkToSpeech(speaker, speech);
    }

    @RequestMapping(value = "/speeches/{speechId}/speakers/{speakerId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkToSpeech(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        Speech speech = speechService.findById(speechId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.linkToSpeech(speaker, speech);
    }

    @RequestMapping(value = "/events/{eventId}/speakers", method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker createAndLinkToEvent(@PathVariable("eventId") Long eventId,
            @RequestBody @Validated Speaker speaker) {
        Event event = eventService.findById(eventId);
        return speakerService.createAndLinkToEvent(speaker, event);
    }

    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("eventId") Long eventId, @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.linkToEvent(speaker, event);
    }

    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void unlinkFromEvent(@PathVariable("eventId") Long eventId, @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.unlinkFromEvent(speaker, event);
    }

    @RequestMapping(value = "/speakers/{id}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speaker update(@PathVariable("id") Long id, @RequestBody @Validated Speaker speaker) {
        speaker.setId(id);
        return speakerService.update(speaker);
    }

    @RequestMapping(value = "/speakers/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speaker getById(@PathVariable("id") Long id) {
        return speakerService.findById(id);
    }

    @RequestMapping(value = "/speakers",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speaker> getSpeakers() {
        return speakerService.findAll();
    }

    @RequestMapping(value = "/speeches/{id}/speakers",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speaker> findBySpeechId(@PathVariable("id") Long id) {
        Speech speech = speechService.findById(id);
        return speakerService.findBySpeech(speech);
    }

    @RequestMapping(value = "/events/{id}/speakers",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speaker> findByEventId(@PathVariable("id") Long id) {
        Event event = eventService.findById(id);
        return speakerService.findByEvent(event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speaker> findByEventAndSpeech(@PathVariable("eventId") Long eventId,
            @PathVariable("speechId") Long speechId) {
        Event event = eventService.findById(eventId);
        Speech speech = speechService.findById(speechId);
        return speakerService.findByEventAndSpeech(event, speech);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
                    method = POST,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speaker createAndLinkToEventSpeech(@PathVariable("eventId") Long eventId,
            @PathVariable("speechId") Long speechId, @RequestBody @Validated Speaker speaker) {
        Event event = eventService.findById(eventId);
        Speech speech = speechService.findById(speechId);
        return speakerService.createAndLinkToEventSpeech(speaker, speech, event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
                    method = PUT,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("speechId") Long speechId, @PathVariable("eventId") Long eventId,
            @PathVariable("speakerId") Long speakerId) {
        Speaker speaker = speakerService.findById(speakerId);
        Speech speech = speechService.findById(speechId);
        Event event = eventService.findById(eventId);
        speakerService.linkToEventSpeech(speaker, speech, event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
                    method = RequestMethod.DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void removeFromEventSpeech(@PathVariable("eventId") Long eventId, @PathVariable("speechId") Long speechId,
            @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        Speech speech = speechService.findById(speechId);
        speakerService.unlinkFromEventSpeech(speaker, speech, event);
    }
}