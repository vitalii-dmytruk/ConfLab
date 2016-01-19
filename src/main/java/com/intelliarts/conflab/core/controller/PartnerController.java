package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Partner;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.service.PartnerService;
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

@RestController
@HasAuthority(role = Role.ADMIN)
@RequestMapping("/partners")
public class PartnerController {

    private PartnerService partnerService;

    @Autowired
    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Partner> findAll() {
        return partnerService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Partner create(@RequestBody @Validated Partner partner) {
        return partnerService.save(partner);
    }

    @RequestMapping(value = "/{id}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Partner update(@PathVariable("id") Long id, @RequestBody @Validated Partner partner) {
        partner.setId(id);
        return partnerService.save(partner);
    }

    @RequestMapping(value = "/{id}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Partner findById(@PathVariable("id") Long id) {
        return partnerService.findById(id);
    }
}