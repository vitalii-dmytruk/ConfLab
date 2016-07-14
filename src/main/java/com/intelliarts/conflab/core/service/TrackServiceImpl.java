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
    private SpeechService   speechService;

    @Autowired
    public TrackServiceImpl(TrackRepository trackRepository, SpeechService speechService) {
        super(trackRepository);
        this.trackRepository = trackRepository;
        this.speechService = speechService;
    }

    @Override
    public List<Track> findByEventId(Long eventId) {
        return trackRepository.findByEventId(eventId);
    }

    @Override
    @Transactional
    public void delete(Long eventId, Integer trackId) {
        speechService.resetSpeechesWithTrackId(trackId);
        trackRepository.deleteByEventIdAndId(eventId, trackId);
    }
}