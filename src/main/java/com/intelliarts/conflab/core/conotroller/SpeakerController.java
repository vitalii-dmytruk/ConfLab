package com.intelliarts.conflab.core.conotroller;

import com.intelliarts.conflab.api.Speaker;
import com.intelliarts.conflab.core.service.SpeakerService;
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

@RestController
public class SpeakerController {
    @Autowired
    private SpeakerService speakerService;

    @RequestMapping(value = "/speaker",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Speaker create(@RequestBody @Validated Speaker speaker) {
        return speakerService.create(speaker);
    }


    @RequestMapping(value = "/speaker/{email}",
                    method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public Speaker getByEmail(@PathVariable String email) {
        return speakerService.findByEmail(email);
    }

    @RequestMapping(value = "/speakers",
                    method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    public List<Speaker> getSpeakers() {
        return speakerService.getAll();
    }
}