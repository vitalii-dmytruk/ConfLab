package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CompanyService {

    private CompanyRepository   companyRepository;
    private EventCompanyService eventCompanyService;

    @Autowired
    public CompanyService(CompanyRepository companyRepository, EventCompanyService eventCompanyService) {
        this.companyRepository = companyRepository;
        this.eventCompanyService = eventCompanyService;
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

    @Transactional(readOnly = true)
    public Set<Company> findByEvent(Event event) {
        return companyRepository.findByEventId(event.getId());
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
        return companyRepository.save(company);
    }

    @Transactional
    public Company createAndLinkToEvent(Company company, Event event) {
        Company createdCompany = create(company);
        linkToEvent(createdCompany, event);
        return createdCompany;
    }

    @Transactional
    public void linkToEvent(Company company, Event event) {
        eventCompanyService.creteEventCompanyLink(event, company);
    }

    @Transactional
    public void unlinkFromEvent(Company company, Event event) {
        eventCompanyService.deleteEventCompanyLink(event, company);
    }
}