package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Track;
import com.intelliarts.conflab.core.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class TrackServiceImpl extends DefaultService<Track, Integer> implements TrackService {

    private TrackRepository trackRepository;

    @Autowired
    public TrackServiceImpl(TrackRepository trackRepository) {
        super(trackRepository);
        this.trackRepository = trackRepository;
    }

    @Override
    public List<Track> findByEventId(Long eventId) {
        return trackRepository.findByEventId(eventId);
    }

    @Override
    @Transactional
    public void delete(Long eventId, Integer trackId) {
        trackRepository.deleteByEventIdAndId(eventId, trackId);
    }
}