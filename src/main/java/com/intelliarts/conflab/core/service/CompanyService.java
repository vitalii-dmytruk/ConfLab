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
        Company createdCompany = createCompany(company);
        createImage(createdCompany, imageFile);

        return createdCompany;
    }

    @Transactional
    public Company update(Company company, MultipartFile imageFile) {
        if (company.getId() == null) {
            throw new IllegalArgumentException("Company Id is not specified");
        }

        updateImage(company, imageFile);
        return companyRepository.save(company);
    }

    public Company createLogo(Company company, MultipartFile imageFile) {
        return createImage(company, imageFile);
    }

    public Company updateLogo(Company company, MultipartFile imageFile) {
        Company updatedCompany = updateImage(company, imageFile);
        return  companyRepository.save(updatedCompany);
    }

    public Company deleteLogo(Company company) {
        String image = deleteImage(company);
        company.setImage(image);
        return  companyRepository.save(company);
    }

    private Company updateImage(Company company, MultipartFile imageFile) {
        String image;

        if (imageFile != null) {
            image = filesManager.saveCompanyLogo(company.getId(), imageFile);
        } else if (company.getImage() == null) {
            image = deleteImage(company);
        } else {
            image = findById(company.getId()).getImage();
        }
        company.setImage(image);

        return company;
    }

    private String deleteImage(Company company) {
        filesManager.removeCompanyLogo(company.getId());
        return DEFAULT_LOGO;
    }

    private Company createImage(Company company, MultipartFile imageFile) {
        String logoPath = imageFile != null ?
                filesManager.saveCompanyLogo(company.getId(), imageFile) :
                DEFAULT_LOGO;
        company.setImage(logoPath);

        return companyRepository.save(company);
    }

    private Company createCompany(Company company) {
        company.setId(null);
        return companyRepository.save(company);
    }
}