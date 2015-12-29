package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface SpeechSpeakerRepository extends BaseRepository<SpeechSpeaker, Long> {

    Optional<SpeechSpeaker> findBySpeechAndSpeaker(Speech speech, Speaker speaker);

    Set<SpeechSpeaker> deleteBySpeechAndSpeaker(Speech speech, Speaker speaker);

}