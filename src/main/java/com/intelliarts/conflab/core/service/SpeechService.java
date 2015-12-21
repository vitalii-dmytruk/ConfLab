package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeechService {

    private SpeechRepository speechRepository;
    private SpeechSpeakerService speechSpeakerService;

    public SpeechService(SpeechRepository speechRepository, SpeechSpeakerService speechSpeakerService) {
        this.speechRepository = speechRepository;
        this.speechSpeakerService = speechSpeakerService;
    }

    @Transactional
    public Speech save(Speech speech) {
        boolean isNew = speech.getId() == null;
        speechRepository.save(speech);
        if (isNew) {
            speechSpeakerService.createSpeechSpeakerLink(null, speech.getId());
        }
        return speech;
    }

    public List<Speech> findAll() {
        return speechRepository.findAll();
    }

    public Speech findById(Long id) {
        Optional<Speech> speech = speechRepository.findOne(id);
        return speech.orElseThrow(() -> new EntityNotFoundException("Speech with ID '" + id + "' not found."));
    }

    public Set<Speech> findBySpeakerId(Long id) {
        return speechRepository.findBySpeakerId(id);
    }

    public List<Speech> findByEventId(Long id) {
        return speechRepository.findByEventId(id);
    }

}