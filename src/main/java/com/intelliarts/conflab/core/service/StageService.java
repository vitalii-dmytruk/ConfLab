package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.Stage;
import com.intelliarts.conflab.core.entity.StageEntity;
import com.intelliarts.conflab.core.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StageService extends SimpleService<Stage, StageEntity> {
    @Autowired
    public StageService(StageRepository stageRepository) {
        super(stageRepository);
    }
}