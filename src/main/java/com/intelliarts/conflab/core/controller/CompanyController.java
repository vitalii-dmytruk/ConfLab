package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.service.CompanyService;
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
public class CompanyController {

    private CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @RequestMapping(value = "/companies",
                    method = RequestMethod.GET,
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
        company.setId(null);
        return companyService.save(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = RequestMethod.PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company update(@PathVariable("companyId") Long companyId, @RequestBody @Validated Company company) {
        company.setId(companyId);
        return companyService.save(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company findById(@PathVariable("companyId") Long companyId) {
        return companyService.findById(companyId);
    }
}