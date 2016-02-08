package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Stage;
import com.intelliarts.conflab.core.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StageService extends AbstractBaseService<Stage, Integer, StageRepository> {

    @Autowired
    public StageService(StageRepository stageRepository) {
        super("Stage", stageRepository);
    }

}