package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<Speech> getAll() {
        return speechRepository.findAll();
    }
}