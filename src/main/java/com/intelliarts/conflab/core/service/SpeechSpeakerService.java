package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeechSpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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

    public void deleteBySpeechAndSpeaker(Speech speech, Speaker speaker) {
        speechSpeakerRepository.deleteBySpeechAndSpeaker(speech, speaker);
    }
}
