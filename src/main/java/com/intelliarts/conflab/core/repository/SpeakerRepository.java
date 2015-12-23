package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speaker;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface SpeakerRepository extends BaseRepository<Speaker, Long> {

    @Query(value = "SELECT speaker " +
                   "FROM EventSpeechSpeaker eventSpeechSpeaker " +
                   "JOIN eventSpeechSpeaker.speechSpeaker speechSpeaker " +
                   "JOIN speechSpeaker.speaker speaker " +
                   "WHERE eventSpeechSpeaker.event.id=:eventId")
    List<Speaker> findByEventId(@Param("eventId") Long eventId);

    @Query(value = "SELECT speaker " +
                   "FROM Speaker speaker " +
                   "JOIN speaker.speechSpeakers speechSpeaker " +
                   "WHERE speechSpeaker.speech.id = :speechId")
    Set<Speaker> findBySpeechId(@Param("speechId") Long speechId);
}