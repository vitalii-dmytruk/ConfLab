package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speech;
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

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeechController {

    @Autowired
    private SpeechService speechService;

    @RequestMapping(value = "/speeches",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech create(@RequestBody @Validated Speech speech) {
        speech.setId(null);
        return speechService.save(speech);
    }

    @RequestMapping(value = "/speeches",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Speech> findAll() {
        return speechService.findAll();
    }

    @RequestMapping(value = "/speeches/{id}", method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech update(@PathVariable("id") Long id, @RequestBody @Validated Speech speech) {
        speech.setId(id);
        return speechService.save(speech);
    }

    @RequestMapping(value = "/speeches/{id}", method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Speech findById(@PathVariable("id") Long id) {
        return speechService.findById(id);
    }

    @RequestMapping(value = "/speakers/{id}/speeches", method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Speech> findBySpeakerId(@PathVariable("id") Long speakerId) {
        return speechService.findBySpeakerId(speakerId);
    }

}