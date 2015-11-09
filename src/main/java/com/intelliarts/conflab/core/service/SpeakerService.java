package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.Speaker;
import com.intelliarts.conflab.core.entity.SpeakerEntity;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpeakerService {

    @Autowired
    private SpeakerRepository speakerRepository;
    @Autowired
    private ModelMapper mapper;

    public Speaker create(Speaker speaker) {
        SpeakerEntity entity = toEntity(speaker);
        SpeakerEntity createdEntity = speakerRepository.save(entity);
        return toApi(createdEntity);
    }

    private SpeakerEntity toEntity(Speaker speaker) {
        return mapper.map(speaker, SpeakerEntity.class);
    }

    private Speaker toApi(SpeakerEntity entity) {
        return mapper.map(entity, Speaker.class);
    }

    public Speaker findByName(String name) {
        Optional<SpeakerEntity> entity = speakerRepository.getByName(name);
        return toApi(entity.orElseThrow(() -> new EntityNotFoundException("Speaker with name '" + name + "' not found.")));
    }

    public List<Speaker> getAll() {
        List<SpeakerEntity> speakerEntities = speakerRepository.findAll();
        return speakerEntities.stream().map(this::toApi).collect(Collectors.toList());
    }
}