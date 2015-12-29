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
public class SpeechController {

    private SpeechService  speechService;
    private SpeakerService speakerService;
    private EventService   eventService;

    @Autowired
    public SpeechController(SpeechService speechService, SpeakerService speakerService, EventService eventService) {
        this.speechService = speechService;
        this.speakerService = speakerService;
        this.eventService = eventService;
    }

    @RequestMapping(value = "/speeches",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech create(@RequestBody @Validated Speech speech) {
        return speechService.create(speech);
    }

    @RequestMapping(value = "/speakers/{id}/speeches", method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech createAndLinkToSpeaker(@PathVariable("id") Long speakerId, @RequestBody @Validated Speech speech) {
        speech.setId(null);
        Speaker speaker = speakerService.findById(speakerId);
        return speechService.createAndLinkToSpeaker(speech, speaker);
    }

    @RequestMapping(value = "/speakers/{speakerId}/speeches/{speechId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.TEXT_HTML_VALUE)
    public void linkToSpeaker(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        Speaker speaker = speakerService.findById(speakerId);
        speechService.linkToSpeaker(speechId, speaker);
    }

    @RequestMapping(value = "/speakers/{speakerId}/speeches/{speechId}",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void unlinkFromSpeaker(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        Speaker speaker = speakerService.findById(speakerId);
        speechService.unlinkFromSpeaker(speechId, speaker);
    }

    @RequestMapping(value = "/events/{eventId}/speeches",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech createAndLinkToEvent(@PathVariable("eventId") Long eventId, @RequestBody @Validated Speech speech) {
        speech.setId(null);
        Event event = eventService.findById(eventId);
        return speechService.createAndLinkToEvent(speech, event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.TEXT_HTML_VALUE)
    public void linkToEvent(@PathVariable("eventId") Long eventId, @PathVariable("speechId") Long speechId) {
        Event event = eventService.findById(eventId);
        speechService.linkToEvent(speechId, event);
    }

    @RequestMapping(value = "/speeches",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speech> findAll() {
        return speechService.findAll();
    }

    @RequestMapping(value = "/speeches/{id}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech update(@PathVariable("id") Long id, @RequestBody @Validated Speech speech) {
        speech.setId(id);
        return speechService.update(speech);
    }

    @RequestMapping(value = "/speeches/{id}",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech findById(@PathVariable("id") Long id) {
        return speechService.findById(id);
    }

    @RequestMapping(value = "/speakers/{id}/speeches",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speech> findBySpeakerId(@PathVariable("id") Long speakerId) {
        return speechService.findBySpeakerId(speakerId);
    }

}