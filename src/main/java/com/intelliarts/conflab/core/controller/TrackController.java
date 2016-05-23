package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Track;
import com.intelliarts.conflab.core.service.TrackService;
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
public class TrackController {

    private TrackService trackService;

    @Autowired
    public TrackController(TrackService trackService) {
        this.trackService = trackService;
    }

    @RequestMapping(value = "/events/{eventId}/tracks",
                    produces = MediaType.APPLICATION_JSON_VALUE,
                    method = RequestMethod.GET)
    public List<Track> getByEvent(@PathVariable("eventId") Long eventId) {
        return trackService.findByEventId(eventId);
    }

    @RequestMapping(value = "/events/{eventId}/tracks",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Track create(@PathVariable("eventId") Event event, @RequestBody @Validated Track track) {
        track.setEvent(event);
        return trackService.create(track);
    }

    @RequestMapping(value = "tracks/{trackId}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public Track update(@PathVariable("trackId") Integer trackId, @RequestBody @Validated Track track) {
        validateTrackId(track, trackId);
        return trackService.update(track);
    }

    @RequestMapping(value = "/events/{eventId}/tracks/{trackId}",
                    method = RequestMethod.DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("eventId") Long eventId, @PathVariable("trackId") Integer trackId) {
        trackService.delete(eventId, trackId);
    }

    private void validateTrackId(Track track, Integer id) {
        if (!track.getId().equals(id)) {
            throw new IllegalArgumentException("Incorrect track Id");
        }
    }
}