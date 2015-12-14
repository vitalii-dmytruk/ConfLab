package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeakerService {
    private final SpeakerRepository speakerRepository;
    private final SpeechService speechService;

    @Autowired
    public SpeakerService(SpeakerRepository speakerRepository, SpeechService speechService) {
        this.speakerRepository = speakerRepository;
        this.speechService = speechService;
    }

    public Speaker findById(Long id) {
        Optional<Speaker> speaker = speakerRepository.findOne(id);
        return speaker.orElseThrow(() -> new EntityNotFoundException("Speaker with ID '" + id + "' not found."));
    }

    public Speaker save(Speaker speaker) {
        return speakerRepository.save(speaker);
    }

    public List<Speaker> findAll() {
        return speakerRepository.findAll();
    }

    public Set<Speaker> findBySpeechId(Long speechId) {
        Speech speech = speechService.findById(speechId);
        return speech.getSpeakers();
    }
}