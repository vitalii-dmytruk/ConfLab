package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Track;
import com.intelliarts.conflab.core.repository.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackService extends AbstractBaseService<Track, Integer, TrackRepository> {

    @Autowired
    public TrackService(TrackRepository trackRepository) {
        super("Track", trackRepository);
    }
}