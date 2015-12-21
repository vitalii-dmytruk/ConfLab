package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.SpeechSpeaker;

import java.util.Optional;

public interface SpeechSpeakerRepository extends BaseRepository<SpeechSpeaker, Long> {

    Optional<SpeechSpeaker> findBySpeechIdAndSpeakerId(Long speechId, Long speakerId);

}