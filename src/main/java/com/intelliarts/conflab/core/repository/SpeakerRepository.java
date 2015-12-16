package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speaker;
import org.hibernate.annotations.NamedNativeQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SpeakerRepository extends BaseRepository<Speaker, Long> {

    Optional<Speaker> findByEmail(String email);

    @Query(value = "SELECT speaker.* " +
           "FROM speaker " +
           "  INNER JOIN speech_speaker ON speaker.id = speech_speaker.speaker_id " +
           "  INNER JOIN event_speech_speaker_map ON speech_speaker.id = event_speech_speaker_map.speech_speaker_id " +
           "WHERE event_speech_speaker_map.event_id = ?1", nativeQuery = true)
    List<Speaker> findByEventId(Long eventId);
}