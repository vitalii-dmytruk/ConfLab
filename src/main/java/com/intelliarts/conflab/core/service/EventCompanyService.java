package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventCompany;
import com.intelliarts.conflab.core.repository.EventCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class EventCompanyService {
    private EventCompanyRepository eventCompanyRepository;

    @Autowired
    public EventCompanyService(EventCompanyRepository eventCompanyRepository) {
        this.eventCompanyRepository = eventCompanyRepository;
    }

    @Transactional
    public EventCompany creteEventCompanyLink(Event event, Company company) {
        return eventCompanyRepository.save(new EventCompany(event, company));
    }

    @Transactional
    public void deleteEventCompanyLink(Event event, Company company) {
        eventCompanyRepository.deleteByEventAndCompany(event, company);
    }
}
