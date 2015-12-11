package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class SpeechService {

    private SpeechRepository speechRepository;

    @Autowired
    public SpeechService(SpeechRepository speechRepository) {
        this.speechRepository = speechRepository;
    }

    public Speech save(Speech speech) {
        return speechRepository.save(speech);
    }

    public List<Speech> findAll() {
        return speechRepository.findAll();
    }

    public Speech findById(Long id) {
        Optional<Speech> speech = speechRepository.findOne(id);
        return speech.orElseThrow(() -> new EntityNotFoundException("Speech with ID '" + id + "' not found."));
    }
}