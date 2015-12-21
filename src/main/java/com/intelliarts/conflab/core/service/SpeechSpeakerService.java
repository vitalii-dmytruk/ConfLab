package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SpeechSpeakerService {

    private SpeechSpeakerRepository speechSpeakerRepository;

    @Autowired
    public SpeechSpeakerService(SpeechSpeakerRepository speechSpeakerRepository) {
        this.speechSpeakerRepository = speechSpeakerRepository;
    }

    public void createSpeechSpeakerLink(Long speechId, Long speakerId) {
        speechSpeakerRepository.save(new SpeechSpeaker(speechId, speakerId));
    }

    public void deleteSpeechSpeakerLink(Long speechId, Long speakerId) {
        Optional<SpeechSpeaker> speechSpeakerLink =
                speechSpeakerRepository.findBySpeechIdAndSpeakerId(speechId, speakerId);
        if (speechSpeakerLink.isPresent()) {
            speechSpeakerRepository.delete(speechSpeakerLink.get().getId());
        } else {
            throw new IllegalArgumentException(
                    String.format("Speech with id: %d does not contain speaker with id: %d", speechId, speakerId));
        }

    }
}
