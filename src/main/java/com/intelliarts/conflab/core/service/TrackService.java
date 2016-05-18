package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Track;
import com.intelliarts.conflab.core.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TrackService extends AbstractBaseService<Track, Integer, TrackRepository> {

    private TrackRepository trackRepository;
    private EventService    eventService;

    @Autowired
    public TrackService(TrackRepository trackRepository, EventService eventService) {
        super("Track", trackRepository);
        this.trackRepository = trackRepository;
        this.eventService = eventService;
    }

    public List<Track> findByEventId(Long eventId) {
        return trackRepository.findByEventId(eventId);
    }

    @Transactional
    public Track create(Long eventId, Track track) {
        Event event = eventService.findById(eventId);

        if (event == null) {
            throw new IllegalArgumentException(String.format("Event with id: %d do not exist", eventId));
        } else {
            track.setEvent(event);
            return trackRepository.save(track);
        }
    }

    @Transactional
    public Track update(Long eventId, Track track) {
        track.setEvent(eventService.findById(eventId));
        return trackRepository.save(track);
    }

    @Transactional
    public void delete(Long eventId, Integer trackId) {
        trackRepository.deleteByEventIdAndId(eventId, trackId);
    }
}