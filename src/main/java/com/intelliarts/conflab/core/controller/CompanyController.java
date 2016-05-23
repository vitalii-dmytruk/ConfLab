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
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Company create(@RequestBody @Validated Company company) {
        return companyService.create(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = PUT,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company update(@PathVariable("companyId") Long companyId, @RequestBody @Validated Company company) {
        company.setId(companyId);
        return companyService.update(company);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = POST,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public String createLogo(@PathVariable("companyId") Company company,
            @RequestPart("image") MultipartFile imageFile) {
        if (imageFile == null) {
            throw new IllegalArgumentException("Logo file is not specified.");
        }
        return companyService.createImage(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = PUT,
                    consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public String updateLogo(@PathVariable("companyId") Company company,
            @RequestPart("image") MultipartFile imageFile) {
        if (imageFile == null) {
            throw new IllegalArgumentException("Logo file is not specified.");
        }
        return companyService.updateImage(company, imageFile);
    }

    @RequestMapping(value = "/companies/{companyId}/logo",
                    method = DELETE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public void deleteLogo(@PathVariable("companyId") Company company) {
        companyService.deleteImage(company);
    }

    @RequestMapping(value = "/companies/{companyId}",
                    method = GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Company findById(@PathVariable("companyId") Company company) {
        return company;
    }

}