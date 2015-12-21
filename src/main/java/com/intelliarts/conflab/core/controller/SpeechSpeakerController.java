package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.SpeakerService;
import com.intelliarts.conflab.core.service.SpeechService;
import com.intelliarts.conflab.core.service.SpeechSpeakerService;
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

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeechSpeakerController {
    private SpeakerService       speakerService;
    private SpeechService        speechService;
    private SpeechSpeakerService speechSpeakerService;

    @Autowired
    public SpeechSpeakerController(SpeakerService speakerService, SpeechService speechService,
            SpeechSpeakerService speechSpeakerService) {
        this.speakerService = speakerService;
        this.speechService = speechService;
        this.speechSpeakerService = speechSpeakerService;
    }

    @RequestMapping(path = "/speeches/{id}/speakers", method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker createAndLink(@PathVariable("id") Long speechId, @RequestBody @Validated Speaker speaker) {
        speaker.setId(null);
        speaker = speakerService.save(speaker);
        speechSpeakerService.createSpeechSpeakerLink(speechId, speaker.getId());
        return speaker;
    }

    @RequestMapping(path = "/speakers/{id}/speeches", method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech createAndLink(@PathVariable("id") Long speakerId, @RequestBody @Validated Speech speech) {
        speech.setId(null);
        speech = speechService.save(speech);
        speechSpeakerService.createSpeechSpeakerLink(speech.getId(), speakerId);
        return speech;
    }

    @RequestMapping(value = {"/speeches/{speechId}/speakers/{speakerId}", "/speakers/{speakerId}/speeches/{speechId}"},
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.TEXT_HTML_VALUE)
    public void createLink(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        speechSpeakerService.createSpeechSpeakerLink(speechId, speakerId);
    }

    @RequestMapping(value = {"/speeches/{speechId}/speakers/{speakerId}", "/speakers/{speakerId}/speeches/{speechId}"},
                    method = DELETE,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteLink(@PathVariable("speechId") Long speechId, @PathVariable("speakerId") Long speakerId) {
        speechSpeakerService.deleteSpeechSpeakerLink(speechId, speakerId);
    }

}
