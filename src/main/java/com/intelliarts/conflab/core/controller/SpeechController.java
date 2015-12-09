package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.service.SpeechService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/speeches")
@HasAuthority(role = Role.ADMIN)
public class SpeechController {
    @Autowired
    private SpeechService speechService;

    @RequestMapping(method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speech create(@RequestBody @Validated Speech speech) {
        return speechService.save(speech);
    }


    @RequestMapping(method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public List<Speech> getSpeeches() {
        return speechService.getAll();
    }
}