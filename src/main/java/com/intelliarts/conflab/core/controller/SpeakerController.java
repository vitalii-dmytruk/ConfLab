package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.SpeakerService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.Set;

import static org.springframework.http.HttpStatus.CREATED;
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

    @Autowired
    public SpeakerController(SpeakerService speakerService) {
        this.speakerService = speakerService;
    }

    @RequestMapping(value = "/speakers",
                    method = POST,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public Speaker create(@RequestBody @Validated Speaker speaker) {
        return speakerService.create(speaker);
    }

    @RequestMapping(value = "/speakers/{speakerId}",
                    method = PUT,
                    consumes = APPLICATION_JSON_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public Speaker update(@PathVariable("speakerId") Speaker existedSpeaker, @RequestBody @Validated Speaker speaker) {
        speaker.setId(existedSpeaker.getId());
        return speakerService.update(speaker);
    }

    @RequestMapping(value = "/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Collection<Speaker> getSpeakers(@RequestParam(value = "eventId", required = false) Event event) {
        return event != null ? speakerService.findByEvent(event) : speakerService.findAll();
    }

    @RequestMapping(value = "/speakers/{speakerId}",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Speaker getById(@PathVariable("speakerId") Speaker speaker) {
        return speaker;
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = POST,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    @ResponseStatus(CREATED)
    public String createAvatar(@PathVariable("speakerId") Speaker speaker, @RequestPart("image") MultipartFile file) {
        if (file == null) {
            throw new IllegalArgumentException("Avatar file is not specified.");
        }
        return speakerService.createImage(speaker, file);
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = PUT,
                    consumes = MULTIPART_FORM_DATA_VALUE,
                    produces = APPLICATION_JSON_VALUE)
    public String updateAvatar(@PathVariable("speakerId") Speaker speaker, @RequestPart("image") MultipartFile file) {
        if (file == null) {
            throw new IllegalArgumentException("Avatar file is not specified.");
        }
        return speakerService.updateImage(speaker, file);
    }

    @RequestMapping(value = "/speakers/{speakerId}/avatar",
                    method = DELETE,
                    produces = APPLICATION_JSON_VALUE)
    public void deleteAvatar(@PathVariable("speakerId") Speaker speaker) {
        speakerService.deleteImage(speaker);
    }

//    //TODO investigate whether should be removed?
//    @RequestMapping(value = "/speeches/{speechId}/speakers",
//                    method = POST,
//                    consumes = APPLICATION_JSON_VALUE,
//                    produces = APPLICATION_JSON_VALUE)
//    @ResponseStatus(CREATED)
//    public Speaker createAndLinkToSpeech(@PathVariable("speechId") Speech speech,
//            @RequestBody @Validated Speaker speaker) {
//        return speakerService.createAndLinkToSpeech(speaker, speech);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/speeches/{speechId}/speakers/{speakerId}",
//                    method = PUT,
//                    consumes = APPLICATION_JSON_VALUE,
//                    produces = APPLICATION_JSON_VALUE)
//    public void linkToSpeech(@PathVariable("speechId") Speech speech, @PathVariable("speakerId") Speaker speaker) {
//        speakerService.linkToSpeech(speaker, speech);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speakers",
//                    method = POST,
//                    consumes = APPLICATION_JSON_VALUE,
//                    produces = APPLICATION_JSON_VALUE)
//    @ResponseStatus(CREATED)
//    public Speaker createAndLinkToEvent(@PathVariable("eventId") Event event, @RequestBody @Validated Speaker speaker)
//            throws IOException {
//        speaker = speakerService.create(speaker);
//        speakerService.linkToEvent(speaker, event);
//        return speaker;
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
//                    method = PUT,
//                    consumes = APPLICATION_JSON_VALUE,
//                    produces = APPLICATION_JSON_VALUE)
//    public void linkToEvent(@PathVariable("eventId") Event event, @PathVariable("speakerId") Speaker speaker) {
//        speakerService.linkToEvent(speaker, event);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speakers/{speakerId}",
//                    method = DELETE,
//                    produces = APPLICATION_JSON_VALUE)
//    public void unlinkFromEvent(@PathVariable("eventId") Event event, @PathVariable("speakerId") Speaker speaker) {
//        speakerService.unlinkFromEvent(speaker, event);
//    }
//
    //TODO should be removed
    @RequestMapping(value = "/speeches/{speechId}/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speaker> findBySpeech(@PathVariable("speechId") Speech speech) {
        return speech.getSpeakers();
    }
//
    //TODO should be removed
    @RequestMapping(value = "/events/{eventId}/speakers",
                    method = GET,
                    produces = APPLICATION_JSON_VALUE)
    public Set<Speaker> findByEvent(@PathVariable("eventId") Event event) {
        return speakerService.findByEvent(event);
    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
//                    method = GET,
//                    produces = APPLICATION_JSON_VALUE)
//    public Set<Speaker> findByEventAndSpeech(@PathVariable("eventId") Event event,
//            @PathVariable("speechId") Speech speech) {
//        return speakerService.findByEventAndSpeech(event, speech);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers",
//                    method = POST,
//                    consumes = APPLICATION_JSON_VALUE,
//                    produces = APPLICATION_JSON_VALUE)
//    public Speaker createAndLinkToEventSpeech(@PathVariable("eventId") Event event,
//            @PathVariable("speechId") Speech speech, @RequestBody @Validated Speaker speaker) throws IOException {
//        return speakerService.createAndLinkToEventSpeech(speaker, speech, event);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
//                    method = PUT,
//                    produces = APPLICATION_JSON_VALUE)
//    public void linkToEventSpeech(@PathVariable("eventId") Event event, @PathVariable("speechId") Speech speech,
//            @PathVariable("speakerId") Speaker speaker) {
//        speakerService.linkToEventSpeech(speaker, speech, event);
//    }
//
//    //TODO should be removed
//    @RequestMapping(value = "/events/{eventId}/speeches/{speechId}/speakers/{speakerId}",
//                    method = DELETE,
//                    produces = APPLICATION_JSON_VALUE)
//    public void removeFromEventSpeech(@PathVariable("eventId") Event event, @PathVariable("speechId") Speech speech,
//            @PathVariable("speakerId") Speaker speaker) {
//        speakerService.unlinkFromEventSpeech(speaker, speech, event);
//    }
}