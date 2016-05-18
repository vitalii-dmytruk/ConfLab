package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Partner;
import com.intelliarts.conflab.core.entity.PartnerLevel;
import com.intelliarts.conflab.core.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PartnerService {
    private static final String ERR_MSG = "Company '%s' is not a partner of event '%s'";

    private CompanyService    companyService;
    private PartnerRepository partnerRepository;

    @Autowired
    public PartnerService(CompanyService companyService, PartnerRepository partnerRepository) {
        this.companyService = companyService;
        this.partnerRepository = partnerRepository;
    }

    @Transactional(readOnly = true)
    public Set<Company> findByEvent(Event event) {
        return partnerRepository.findByEvent(event).stream().map(Partner::getCompany).collect(Collectors.toSet());
    }

    @Transactional
    public Company createAndLinkToEvent(Event event, Company company) {
        Company createdCompany = companyService.create(company);
        linkToEvent(event, createdCompany);
        return createdCompany;
    }

    @Transactional
    public void linkToEvent(Event event, Company company) {
        partnerRepository.create(new Partner(event, company));
    }

    @Transactional
    public void unlinkFromEvent(Event event, Company company) {
        partnerRepository.deleteByEventAndCompany(event, company);
    }

    @Transactional
    public void updatePartnerLevel(Event event, Company company, PartnerLevel partnerLevel) {
        Partner partner = findByEventAndCompany(event, company);
        partner.setPartnerLevel(partnerLevel);
        partnerRepository.update(partner);
    }

    @Transactional(readOnly = true)
    public PartnerLevel getPartnerLevel(Event event, Company company) {
        return findByEventAndCompany(event, company).getPartnerLevel();
    }

    private Partner findByEventAndCompany(Event event, Company company) {
        return partnerRepository.findByEventAndCompany(event, company)
                                .orElseThrow(() -> new EntityNotFoundException(
                                        String.format(ERR_MSG, company.getName(), event.getName())));
    }
}
