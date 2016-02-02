package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.PartnerLevel;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.service.CompanyService;
import com.intelliarts.conflab.core.service.EventService;
import com.intelliarts.conflab.core.service.PartnerLevelService;
import com.intelliarts.conflab.core.service.PartnerService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class PartnerController {

    private EventService        eventService;
    private CompanyService      companyService;
    private PartnerService      partnerService;
    private PartnerLevelService partnerLevelService;

    @Autowired
    public PartnerController(EventService eventService, CompanyService companyService, PartnerService partnerService,
            PartnerLevelService partnerLevelService) {
        this.eventService = eventService;
        this.companyService = companyService;
        this.partnerService = partnerService;
        this.partnerLevelService = partnerLevelService;
    }

    @RequestMapping(value = "/events/{eventId}/companies",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Set<Company> findByEvent(@PathVariable("eventId") Long eventId) {
        Event event = eventService.findById(eventId);
        return partnerService.findByEvent(event);
    }

    @RequestMapping(value = "/events/{eventId}/companies",
                    method = POST,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company createAndLinkToEvent(@PathVariable("eventId") Long eventId, @RequestPart @Validated Company company,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        Event event = eventService.findById(eventId);
        return partnerService.createAndLinkToEvent(event, company, imageFile);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void linkToEvent(@PathVariable("eventId") Long eventId, @PathVariable("companyId") Long companyId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        partnerService.linkToEvent(event, company);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void unlinkFromEvent(@PathVariable("eventId") Long eventId, @PathVariable("companyId") Long companyId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        partnerService.unlinkFromEvent(event, company);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}/partnerLevels/{partnerLevelId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void updatePartnerLevel(@PathVariable("eventId") Long eventId, @PathVariable("companyId") Long companyId,
            @PathVariable("partnerLevelId") Long partnerLevelId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        PartnerLevel partnerLevel = partnerLevelService.findById(partnerLevelId);
        partnerService.updatePartnerLevel(event, company, partnerLevel);
    }

    @RequestMapping(value = "/events/{eventId}/companies/{companyId}/partnerLevels",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public PartnerLevel getPartnerLevel(@PathVariable("eventId") Long eventId,
            @PathVariable("companyId") Long companyId) {
        Event event = eventService.findById(eventId);
        Company company = companyService.findById(companyId);
        return partnerService.getPartnerLevel(event, company);
    }

    @RequestMapping(value = "/partnerLevels",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PartnerLevel> getPartnerLevels() {
        return partnerLevelService.findAll();
    }
}
