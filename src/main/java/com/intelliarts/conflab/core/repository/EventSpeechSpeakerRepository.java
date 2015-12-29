package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface EventSpeechSpeakerRepository extends BaseRepository<EventSpeechSpeaker, Long> {

    @Modifying
    @Query(value = "DELETE " +
                   "FROM EventSpeechSpeaker eventSpeechSpeaker " +
                   "WHERE eventSpeechSpeaker.event.id = :eventId " +
                   "AND eventSpeechSpeaker.speechSpeaker.id IN (" +
                   "    SELECT speechSpeaker.id " +
                   "    FROM SpeechSpeaker speechSpeaker " +
                   "    WHERE speechSpeaker.speaker.id = :speakerId" +
                   ")")
    void delete(@Param("speakerId") Long speakerId, @Param("eventId") Long eventId);
}
