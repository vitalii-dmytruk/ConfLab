package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.EventSpeechSpeaker;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
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
    void deleteBySpeakerId(@Param("speakerId") Long speakerId, @Param("eventId") Long eventId);

    @Modifying
    @Query(value = "DELETE " +
                   "FROM EventSpeechSpeaker eventSpeechSpeaker " +
                   "WHERE eventSpeechSpeaker.event.id = :eventId " +
                   "AND eventSpeechSpeaker.speechSpeaker.id IN (" +
                   "    SELECT speechSpeaker.id " +
                   "    FROM SpeechSpeaker speechSpeaker " +
                   "    WHERE speechSpeaker.speech.id = :speechId" +
                   ")")
    void deleteBySpeechId(@Param("speechId") Long speechId, @Param("eventId") Long eventId);


    @Modifying
    @Query(value = "DELETE " +
                   "FROM EventSpeechSpeaker eventSpeechSpeaker " +
                   "WHERE eventSpeechSpeaker.event.id = :eventId " +
                   "AND eventSpeechSpeaker.speechSpeaker.id IN (" +
                   "    SELECT speechSpeaker.id " +
                   "    FROM SpeechSpeaker speechSpeaker " +
                   "    WHERE speechSpeaker.speech.id = :speechId " +
                   "    AND speechSpeaker.speaker.id = :speakerId " +
                   ")")
    void deleteByEventAndSpeechAndSpeaker(@Param("eventId") Long eventId,
            @Param("speechId") Long speechId, @Param("speakerId") Long speakerId);
}
