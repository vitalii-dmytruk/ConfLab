package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speech;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface SpeechRepository extends BaseRepository<Speech, Long> {

    Set<Speech> findByEventId(@Param("eventId") Long eventId);

    @Query(value = "SELECT speech  " +
                   "FROM Speech speech " +
                   "   JOIN speech.speakers speakers " +
                   "WHERE speakers.id= :speakerId")
    Set<Speech> findBySpeakerId(@Param("speakerId") Long speakerId);

    @Query(value = "SELECT speech " +
                   "FROM Speech speech " +
                   "   JOIN speech.speakers speakers " +
                   "WHERE speech.event.id= :eventId AND speakers.id = :speakerId")
    Set<Speech> findByEventAndSpeaker(@Param("eventId") Long eventId, @Param("speakerId") Long speakerId);
}