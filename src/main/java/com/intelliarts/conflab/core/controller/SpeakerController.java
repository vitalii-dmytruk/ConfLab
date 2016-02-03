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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.http.MediaType.MULTIPART_FORM_DATA_VALUE;
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
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker create(@RequestPart("speaker") @Validated Speaker speaker,
            @RequestPart(value = "image", required = false) MultipartFile file) {
        return speakerService.create(speaker, file);
    }

    @RequestMapping(value = "/speakers/{speakerId}",
                    method = PUT,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public Speaker update(@PathVariable("speakerId") Long id, @RequestPart("speaker") @Validated Speaker speaker,
            @RequestPart(value = "image", required = false) MultipartFile file) {
        speaker.setId(id);
        return speakerService.update(speaker, file);
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = POST,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public String createAvatar(@PathVariable("speakerId") Long id,
            @RequestPart("image") MultipartFile file) {
        Speaker speaker = speakerService.findById(id);
        return speakerService.createAvatar(speaker, file).getImage();
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = PUT,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public String updateAvatar(@PathVariable("speakerId") Long id,
            @RequestPart("image") MultipartFile file) {
        Speaker speaker = speakerService.findById(id);
        return speakerService.updateAvatar(speaker, file).getImage();
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public String deleteAvatar(@PathVariable("speakerId") Long speakerId){
        Speaker speaker = speakerService.findById(speakerId);
        Speaker updatedSpeaker = speakerService.deleteAvatar(speaker);
        return updatedSpeaker.getImage();
    }

    @RequestMapping(value = "/speakers/{speakerId}",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Speaker getById(@PathVariable("speakerId") Long speakerId) {
        return speakerService.findById(speakerId);
    }

    @RequestMapping(value = "/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public List<Speaker> getSpeakers() {
        return speakerService.findAll();
    }

    @RequestMapping(value = "/speeches/{speechId}/speakers",
                    method = POST,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker createAndLinkToSpeech(@PathVariable("speechId") Long speechId,
            @RequestPart("speaker") @Validated Speaker speaker,
            @RequestPart(value = "image", required = false) MultipartFile file) {
        Speech speech = speechService.findById(speechId);
        return speakerService.createAndLinkToSpeech(speaker, speech, file);
    }

    @RequestMapping(value = "/speeches/{speechId}/speakers/{speakerId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToSpeech(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        Speech speech = speechService.findById(speechId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.linkToSpeech(speaker, speech);
    }

    @RequestMapping(value = "/events/{eventId}/speakers",
                    method = POST,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker createAndLinkToEvent(@PathVariable("eventId") Long eventId,
            @RequestPart("speaker") @Validated Speaker speaker,
            @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Event event = eventService.findById(eventId);
        speaker = speakerService.create(speaker, file);
        speakerService.linkToEvent(speaker, event);
        return speaker;
    }

    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("eventId") Long eventId, @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.linkToEvent(speaker, event);
    }

    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void unlinkFromEvent(@PathVariable("eventId") Long eventId, @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        speakerService.unlinkFromEvent(speaker, event);
    }

    @RequestMapping(value = "/speeches/{speechId}/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speaker> findBySpeechId(@PathVariable("speechId") Long speechId) {
        Speech speech = speechService.findById(speechId);
        return speakerService.findBySpeech(speech);
    }

    @RequestMapping(value = "/events/{eventId}/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speaker> findByEventId(@PathVariable("eventId") Long eventId) {
        Event event = eventService.findById(eventId);
        return speakerService.findByEvent(event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speaker> findByEventAndSpeech(@PathVariable("eventId") Long eventId,
            @PathVariable("speechId") Long speechId) {
        Event event = eventService.findById(eventId);
        Speech speech = speechService.findById(speechId);
        return speakerService.findByEventAndSpeech(event, speech);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
                    method = POST,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public Speaker createAndLinkToEventSpeech(@PathVariable("eventId") Long eventId,
            @PathVariable("speechId") Long speechId, @RequestPart("speaker") @Validated Speaker speaker,
            @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Event event = eventService.findById(eventId);
        Speech speech = speechService.findById(speechId);

        return speakerService.createAndLinkToEventSpeech(speaker, file, speech, event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
                    method = PUT,
                    produces = APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("speechId") Long speechId, @PathVariable("eventId") Long eventId,
            @PathVariable("speakerId") Long speakerId) {
        Speaker speaker = speakerService.findById(speakerId);
        Speech speech = speechService.findById(speechId);
        Event event = eventService.findById(eventId);
        speakerService.linkToEventSpeech(speaker, speech, event);
    }

    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void removeFromEventSpeech(@PathVariable("eventId") Long eventId, @PathVariable("speechId") Long speechId,
            @PathVariable("speakerId") Long speakerId) {
        Event event = eventService.findById(eventId);
        Speaker speaker = speakerService.findById(speakerId);
        Speech speech = speechService.findById(speechId);
        speakerService.unlinkFromEventSpeech(speaker, speech, event);
    }
}