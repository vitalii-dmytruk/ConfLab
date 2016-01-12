package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

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
        return speechSpeakerRepository.findBySpeechAndSpeaker(speech, speaker)
                                      .orElseGet(
                                              () -> speechSpeakerRepository.save(new SpeechSpeaker(speech, speaker)));
    }

    public SpeechSpeaker findBySpeechAndSpeaker(Speech speech, Speaker speaker) {
        Optional<SpeechSpeaker> speechSpeaker = speechSpeakerRepository.findBySpeechAndSpeaker(speech, speaker);
        return speechSpeaker.orElseThrow(() -> new EntityNotFoundException("Speech with ID = " + speech.getId() +
                                                                           "is not linked to Speaker with ID = " +
                                                                           +speaker.getId()));
    }


    public Set<SpeechSpeaker> findBySpeech(Speech speech) {
        return speechSpeakerRepository.findBySpeech(speech);
    }

    public Set<SpeechSpeaker> findBySpeaker(Speaker speaker) {
        return speechSpeakerRepository.findBySpeaker(speaker);
    }

    public void deleteBySpeechAndSpeaker(Speech speech, Speaker speaker) {
        speechSpeakerRepository.deleteBySpeechAndSpeaker(speech, speaker);
    }
}
