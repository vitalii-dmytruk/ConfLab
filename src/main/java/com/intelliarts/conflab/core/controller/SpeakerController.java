package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.service.SpeakerService;
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

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeakerController {
    @Autowired
    private SpeakerService speakerService;

    @RequestMapping(value = "/speakers",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker create(@RequestBody @Validated Speaker speaker) {
        speaker.setId(null);
        return speakerService.save(speaker);
    }

    @RequestMapping(value = "/speakers/{id}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speaker update(@PathVariable("id") Long id, @RequestBody @Validated Speaker speaker) {
        speaker.setId(id);
        return speakerService.save(speaker);
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
    public Set<Speaker> findBySpeechId(@PathVariable("id") Long speakerId) {
        return speakerService.findBySpeechId(speakerId);
    }
}