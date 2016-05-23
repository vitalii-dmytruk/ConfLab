package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CompanyServiceImpl extends AbstractImageAwareService<Company, Long> implements CompanyService {

    @Autowired
    public CompanyServiceImpl(CompanyRepository repository, FilesManager filesManager) {
        super(repository, "logos", filesManager);
    }
}