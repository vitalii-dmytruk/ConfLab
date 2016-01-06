package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class SpeechSpeakerService {

    private SpeechSpeakerRepository speechSpeakerRepository;

    @Autowired
    public SpeechSpeakerService(SpeechSpeakerRepository speechSpeakerRepository) {
        this.speechSpeakerRepository = speechSpeakerRepository;
    }

    public void save(SpeechSpeaker speechSpeaker) {
        speechSpeakerRepository.save(speechSpeaker);
    }

    @Transactional
    public SpeechSpeaker createSpeechSpeakerLink(Speech speech, Speaker speaker) {
        return speechSpeakerRepository.save(new SpeechSpeaker(speech, speaker));
    }

    @Transactional
    public SpeechSpeaker findOrCreate(Speech speech, Speaker speaker) {
        SpeechSpeaker speechSpeaker;
        Optional<SpeechSpeaker> speechSpeakerOptional = speechSpeakerRepository.findBySpeechAndSpeaker(speech, speaker);
        if (!speechSpeakerOptional.isPresent()) {
            speechSpeaker = speechSpeakerRepository.save(new SpeechSpeaker(speech, speaker));
        } else {
            speechSpeaker = speechSpeakerOptional.get();
        }
        return speechSpeaker;
    }

    public void deleteBySpeechAndSpeaker(Speech speech, Speaker speaker) {
        speechSpeakerRepository.deleteBySpeechAndSpeaker(speech, speaker);
    }
}
