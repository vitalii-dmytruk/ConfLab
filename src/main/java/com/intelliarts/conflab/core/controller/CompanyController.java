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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@HasAuthority(role = Role.ADMIN)
public class CompanyController {

    private CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @RequestMapping(value = "/companies",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Company> findAll() {
        return companyService.findAll();
    }

    @RequestMapping(value = "/companies",
                    method = POST,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company create(@RequestPart("company") @Validated Company company,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        return companyService.create(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = PUT,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company update(@PathVariable("companyId") Long companyId, @RequestPart("company") @Validated Company company,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        company.setId(companyId);
        return companyService.update(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = POST,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company createLogo(@PathVariable("companyId") Long companyId,
            @RequestPart("image") MultipartFile imageFile) {
        Company company = companyService.findById(companyId);
        return companyService.createLogo(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = PUT,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company updateLogo(@PathVariable("companyId") Long companyId,
            @RequestPart("image") MultipartFile imageFile) {
        Company company = companyService.findById(companyId);
        return companyService.updateLogo(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public String deleteLogo(@PathVariable("companyId") Long companyId){
        Company company = companyService.findById(companyId);
        Company updatedCompany = companyService.deleteLogo(company);
        return updatedCompany.getImage();
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company findById(@PathVariable("companyId") Long companyId) {
        return companyService.findById(companyId);
    }

}