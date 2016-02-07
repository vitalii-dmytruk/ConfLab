package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService extends AbstractImageAwareService<Company, Long, CompanyRepository> {
    private static final String ENTITY_NAME         = "Company";
    private static final String COMPANY_LOGO_FOLDER = "logos";

    @Autowired
    protected CompanyService(CompanyRepository repository, FilesManager filesManager) {
        super(repository, filesManager);
    }

    @Override
    protected String getFolderName() {
        return COMPANY_LOGO_FOLDER;
    }

    @Override
    protected String getEntityName() {
        return ENTITY_NAME;
    }
}