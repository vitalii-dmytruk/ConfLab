package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Stage;
import com.intelliarts.conflab.core.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {
    private StageRepository stageRepository;

    @Autowired
    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public Stage save(Stage stage) {
        return stageRepository.save(stage);
    }


    public List<Stage> getAll() {
        return stageRepository.findAll();
    }
}