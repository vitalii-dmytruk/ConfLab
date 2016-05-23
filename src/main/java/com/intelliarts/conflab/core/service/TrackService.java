package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Track;

import javax.transaction.Transactional;
import java.util.List;


public interface TrackService extends BaseService<Track, Integer> {

    List<Track> findByEventId(Long eventId);

    @Transactional
    void delete(Long eventId, Integer trackId);
}
