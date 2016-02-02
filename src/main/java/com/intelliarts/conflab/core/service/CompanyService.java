package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private static final String DEFAULT_LOGO = "/img/default-logo.png";

    private CompanyRepository companyRepository;
    private FilesManager      filesManager;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, FilesManager filesManager) {
        this.companyRepository = companyRepository;
        this.filesManager = filesManager;
    }

    @Transactional(readOnly = true)
    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Company findById(Long id) {
        Optional<Company> company = companyRepository.findOne(id);
        return company.orElseThrow(() -> new EntityNotFoundException("Company with ID '" + id + "' " + "not found."));
    }

    @Transactional
    public Company create(Company company, MultipartFile imageFile) {
        company.setId(null);
        if (imageFile != null) {
            String logoPath = filesManager.saveCompanyLogo(company.getId(), imageFile);
            company.setImage(logoPath);
        } else {
            company.setImage(DEFAULT_LOGO);
        }
        return companyRepository.save(company);
    }

    @Transactional
    public Company update(Company company, MultipartFile imageFile) {
        if (company.getId() == null) {
            throw new IllegalArgumentException("Company Id is not specified");
        }
        if (imageFile != null) {
            String logoPath = filesManager.saveCompanyLogo(company.getId(), imageFile);
            company.setImage(logoPath);
        } else if (company.getImage() == null) {
            filesManager.removeCompanyLogo(company.getId());
            company.setImage(DEFAULT_LOGO);
        } else {
            company.setImage(findById(company.getId()).getImage());
        }
        return companyRepository.save(company);
    }

}