package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Language;
import com.intelliarts.conflab.core.repository.LanguageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LanguageService extends AbstractBaseService<Language, Long, LanguageRepository> {

    @Autowired
    public LanguageService(LanguageRepository languageRepository) {
        super("Language", languageRepository);
    }

}