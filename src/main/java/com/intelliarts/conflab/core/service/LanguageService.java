package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Language;
import com.intelliarts.conflab.core.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LanguageService {

    private LanguageRepository languageRepository;

    @Autowired
    public LanguageService(LanguageRepository languageRepository) {
        this.languageRepository = languageRepository;
    }

    public List<Language> findAll() {
        return languageRepository.findAll();
    }
}