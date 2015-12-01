package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.Speech;
import com.intelliarts.conflab.core.entity.SpeechEntity;
import com.intelliarts.conflab.core.repository.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;

@Service
public class SpeechService extends SimpleService<Speech, SpeechEntity> {

    @Autowired
    SpeechService(BaseRepository<SpeechEntity, ? extends Serializable> repository) {
        super(repository);
    }
}