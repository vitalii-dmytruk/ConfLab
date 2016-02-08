package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyService extends AbstractImageAwareService<Company, Long, CompanyRepository> {

    @Autowired
    protected CompanyService(CompanyRepository repository, FilesManager filesManager) {
        super("Company", repository, "logos", filesManager);
    }
}