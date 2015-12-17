package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.SpeakerService;
import com.intelliarts.conflab.core.service.SpeechService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/speeches")
@HasAuthority(role = Role.ADMIN)
public class SpeechController {

    @Autowired
    private SpeechService  speechService;
    @Autowired
    private SpeakerService speakerService;

    @RequestMapping(method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech create(@RequestBody @Validated Speech speech) {
        return speechService.save(speech);
    }


    @RequestMapping(method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speech> findAll() {
        return speechService.findAll();
    }


    @RequestMapping(path = "/{id}", method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech update(@PathVariable("id") Long id, @RequestBody @Validated Speech speech) {
        speech.setId(id);
        return speechService.save(speech);
    }

    @RequestMapping(path = "/{id}", method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech findById(@PathVariable("id") Long id) {
        return speechService.findById(id);
    }

    @RequestMapping(path = "/{id}/speakers", method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speaker> findBySpeechId(@PathVariable("id") Long speechId) {
        return speakerService.findBySpeechId(speechId);
    }

    @RequestMapping(path = "/{id}/speakers", method = POST,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void createAndLinkSpeaker(@PathVariable("id") Long speechId, @RequestBody @Validated Speaker speaker) {
        speaker = speakerService.save(speaker);
        speechService.linkSpeakerToSpeech(speechId, speaker);
    }

    @RequestMapping(value = "/{speechId}/speakers/{speakerId}", method = PUT,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkExistingSpeakerToSpeech(@PathVariable("speechId") Long speechId,
            @PathVariable("speakerId") Long speakerId) {
        speechService.linkSpeakerToSpeech(speechId, speakerId);
    }

    @RequestMapping(value = "/{speechId}/speakers/{speakerId}", method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity removeSpeakerFromSpeech(@PathVariable("speechId") Long speechId,
            @PathVariable("speakerId") Long speakerId) {
        try {
            speechService.removeSpeakerFromSpeech(speechId, speakerId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}