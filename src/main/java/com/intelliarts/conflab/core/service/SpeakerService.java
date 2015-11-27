package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.Speaker;
import com.intelliarts.conflab.core.entity.SpeakerEntity;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class SpeakerService extends SimpleService<Speaker, SpeakerEntity> {
    private final SpeakerRepository speakerRepository;

    @Autowired
    public SpeakerService(SpeakerRepository speakerRepository) {
        super(speakerRepository);
        this.speakerRepository = speakerRepository;
    }

    public Speaker findByEmail(String email) {
        Optional<SpeakerEntity> entity = speakerRepository.findByEmail(email);
        return toApi(
                entity.orElseThrow(() -> new EntityNotFoundException("Speaker with email '" + email + "' not found.")));
    }
}