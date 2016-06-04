package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.SpeechService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Set;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeechController {

    private SpeechService speechService;

    @Autowired
    public SpeechController(SpeechService speechService) {
        this.speechService = speechService;
    }

    @RequestMapping(value = "/speeches",
                    method = POST,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public Speech create(@RequestBody @Validated Speech speech) {
        return speechService.create(speech);
    }

    @RequestMapping(value = "/speeches/{speechId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public Speech update(@PathVariable("speechId") Speech existedSpeech, @RequestBody @Validated Speech speech) {
        speech.setId(existedSpeech.getId());
        return speechService.update(speech);
    }

    @RequestMapping(value = "/speeches",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Collection<Speech> getSpeeches(@RequestParam(value = "eventId", required = false) Event event,
            @RequestParam(value = "speakerId", required = false) Speaker speaker) {
        return speechService.find(event, speaker);
    }

    @RequestMapping(value = "/speeches/{speechId}",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Speech findById(@PathVariable("speechId") Long speechId) {
        return speechService.findById(speechId);
    }

    //TODO should be removed
    @RequestMapping(value = "/speakers/{speakerId}/speeches",
                    method = POST,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public Speech createAndLinkToSpeaker(@PathVariable("speakerId") Speaker speaker,
            @RequestBody @Validated Speech speech) {
        speech.setId(null);
        return speechService.createAndLinkToSpeaker(speech, speaker);
    }

    //TODO should be removed
    @RequestMapping(value = "/speakers/{speakerId}/speeches/{speechId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToSpeaker(@PathVariable("speakerId") Speaker speaker, @PathVariable("speechId") Speech speech) {
        speechService.linkToSpeaker(speech, speaker);
    }

    //TODO should be removed
    @RequestMapping(value = {"/speakers/{speakerId}/speeches/{speechId}", "/speeches/{speechId}/speakers/{speakerId}"},
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void unlinkFromSpeaker(@PathVariable("speakerId") Speaker speaker, @PathVariable("speechId") Long speechId) {
        speechService.unlinkFromSpeaker(speechId, speaker);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speeches",
                    method = POST,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public Speech createAndLinkToEvent(@PathVariable("eventId") Event event, @RequestBody @Validated Speech speech) {
        return speechService.createAndLinkToEvent(speech, event);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("eventId") Event event, @PathVariable("speechId") Speech speech) {
        speechService.linkToEvent(speech, event);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}",
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void removeFromEvent(@PathVariable("eventId") Event event, @PathVariable("speechId") Speech speech) {
        speechService.unlinkFromEvent(speech, event);
    }

    //TODO should be removed
    @RequestMapping(value = "/speakers/{speakerId}/speeches",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speech> findBySpeaker(@PathVariable("speakerId") Speaker speaker) {
        return speechService.findBySpeaker(speaker);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speeches",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speech> findByEvent(@PathVariable("eventId") Event event) {
        return speechService.findByEvent(event);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}/speeches",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speech> findByEventAndSpeaker(@PathVariable("eventId") Event event,
            @PathVariable("speakerId") Speaker speaker) {
        return speechService.findByEventAndSpeaker(event, speaker);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}/speeches",
                    method = POST,
                    produces = APPLICATION_JSON_VALUE)
    public Speech createAndLinkToEventSpeaker(@PathVariable("eventId") Event event,
            @PathVariable("speakerId") Speaker speaker, @RequestBody @Validated Speech speech) {
        return speechService.createAndLinkToEventSpeaker(speech, speaker, event);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}/speeches/{speechId}",
                    method = PUT,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToEventSpeaker(@PathVariable("eventId") Event event, @PathVariable("speakerId") Speaker speaker,
            @PathVariable("speechId") Speech speech) {
        speechService.linkToEventSpeaker(speech, speaker, event);
    }

    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}/speeches/{speechId}",
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void removeFromEventSpeaker(@PathVariable("eventId") Event event, @PathVariable("speakerId") Speaker speaker,
            @PathVariable("speechId") Speech speech) {
        speechService.unlinkFromEventSpeaker(speech, speaker, event);
    }
}