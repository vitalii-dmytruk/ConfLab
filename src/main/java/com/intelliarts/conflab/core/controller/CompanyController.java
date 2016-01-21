package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.service.CompanyService;
import com.intelliarts.conflab.core.service.EventService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class CompanyController {

    private CompanyService companyService;
    private EventService   eventService;

    @Autowired
    public CompanyController(CompanyService companyService, EventService eventService) {
        this.companyService = companyService;
        this.eventService = eventService;
    }

    @RequestMapping(value = "/companies",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Company> findAll() {
        return companyService.findAll();
    }

    @RequestMapping(value = "/companies",
                    method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company create(@RequestBody @Validated Company company) {
        return companyService.create(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company update(@PathVariable("companyId") Long companyId, @RequestBody @Validated Company company) {
        company.setId(companyId);
        return companyService.update(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company findById(@PathVariable("companyId") Long companyId) {
        return companyService.findById(companyId);
    }

    @RequestMapping(value = "/events/{eventId}/companies",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Company> findByEvent(@PathVariable("eventId") Long eventId) {
        Event event = eventService.findById(eventId);
        return companyService.findByEvent(event);
    }

    @RequestMapping(value = "/events/{eventId}/companies",
                    method = POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company createAndLinkToEvent(@PathVariable("eventId") Long eventId,
            @RequestBody @Validated Company company) {
        Event event = eventService.findById(eventId);
        return companyService.createAndLinkToEvent(company, event);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("eventId") Long eventId, @PathVariable("companyId") Long companyId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        companyService.linkToEvent(company, event);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void unlinkFromEvent(@PathVariable("eventId") Long eventId, @PathVariable("companyId") Long companyId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        companyService.unlinkFromEvent(company, event);
    }
}