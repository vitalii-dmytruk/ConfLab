package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

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
    public Company create(Company company) {
        company.setId(null);
        return companyRepository.save(company);
    }

    @Transactional
    public Company update(Company company) {
        if (company.getId() == null) {
            throw new IllegalArgumentException("Company Id is not specified");
        }

        String image = findById(company.getId()).getImage();
        company.setImage(image);
        return companyRepository.save(company);
    }

    @Transactional
    public Company createLogo(Company company, @NotNull MultipartFile imageFile) {
        String logoPath = filesManager.saveCompanyLogo(company.getId(), imageFile);
        company.setImage(logoPath);

        return companyRepository.save(company);
    }

    @Transactional
    public Company updateLogo(Company company, @NotNull MultipartFile imageFile) {
        deleteImage(company);
        return createLogo(company, imageFile);
    }

    @Transactional
    public void deleteLogo(Company company) {
        deleteImage(company);
        company.setImage(null);
        companyRepository.save(company);
    }

    private void deleteImage(Company company) {
        filesManager.removeCompanyLogo(company.getId());
    }

}