package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Track;

import java.util.List;

public interface TrackRepository extends BaseRepository<Track, Integer> {

    List<Track> findByEventId(Long eventId);

    void deleteByEventIdAndId(Long eventId, Integer id);
}