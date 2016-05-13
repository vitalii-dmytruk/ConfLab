package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Track;
import com.intelliarts.conflab.core.service.TrackService;
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
@RequestMapping("/tracks")
@HasAuthority(role = Role.ADMIN)
public class TrackController {
    @Autowired
    private TrackService trackService;

    @RequestMapping(method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Track create(@RequestBody @Validated Track track) {
        return trackService.create(track);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE,
                    method = RequestMethod.GET)
    public List<Track> getAll() {
        return trackService.findAll();
    }
}