package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeakerService {

    @Autowired
    private SpeakerRepository speakerRepository;

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
        return speakerRepository.findBySpeechId(speechId);
    }

    public List<Speaker> findByEventId(Long id) {
        return speakerRepository.findByEventId(id);
    }
}