package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speech;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface SpeechRepository extends BaseRepository<Speech, Long> {

    @Query(value = "SELECT speech.* " +
                   "FROM speech " +
                   "  JOIN speech_speaker " +
                   "  ON speech.id = speech_speaker.speech_id " +
                   "  JOIN event_speech_speaker_map " +
                   "  ON speech_speaker.id = event_speech_speaker_map.speech_speaker_id " +
                   "WHERE event_speech_speaker_map.event_id = ?1", nativeQuery = true)
    List<Speech> findByEventId(Long id);

    @Query(value = "SELECT speech.* " +
                   "FROM speech " +
                   "  JOIN speech_speaker " +
                   "  ON speech.id = speech_speaker.speech_id " +
                   "WHERE speaker_id = ?1", nativeQuery = true)
    Set<Speech> findBySpeakerId(Long id);
}