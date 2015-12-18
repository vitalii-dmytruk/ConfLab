package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.repository.SpeechRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeechService {

    @Autowired
    private SpeechRepository speechRepository;
    @Autowired
    private SpeakerService   speakerService;

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

    public Set<Speech> findBySpeakerId(Long id) {
        Speaker speaker = speakerService.findById(id);
        return speaker.getSpeeches();
    }

    public List<Speech> findByEventId(Long id) {
        return speechRepository.findByEventId(id);
    }

    public void linkSpeakerToSpeech(Long speechId, Long speakerId) {
        linkSpeakerToSpeech(speechId, speakerService.findById(speakerId));
    }

    public void linkSpeakerToSpeech(Long speechId, Speaker speaker) {
        Speech speech = findById(speechId);
        speech.getSpeakers().add(speaker);
        save(speech);
    }

    public void removeSpeakerFromSpeech(Long speechId, Long speakerId) throws IllegalArgumentException {
        Speech speech = findById(speechId);
        Optional<Speaker> speakerOptional =
                speech.getSpeakers().stream().filter(sk -> speakerId.equals(sk.getId())).findFirst();
        if (speakerOptional.isPresent()) {
            speech.getSpeakers().remove(speakerOptional.get());
            save(speech);
        } else {
            throw new IllegalArgumentException(
                    String.format("Speech with id: %d does not contain speaker with id: %d", speechId, speakerId));
        }
    }
}