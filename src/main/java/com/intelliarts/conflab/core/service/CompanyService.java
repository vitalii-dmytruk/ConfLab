package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {

    private CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> findAll() {
        return companyRepository.findAll();
    }

    public Company save(Company company) {
        company.setId(null);
        return companyRepository.save(company);
    }

    public Company findById(Long id) {
        Optional<Company> company = companyRepository.findOne(id);
        return company.orElseThrow(() -> new EntityNotFoundException("Company with ID '" + id + "' " + "not found."));
    }
}