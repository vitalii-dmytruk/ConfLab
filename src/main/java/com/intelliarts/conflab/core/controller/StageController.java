package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.entity.Stage;
import com.intelliarts.conflab.core.service.StageService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stages")
@HasAuthority(role = Role.ADMIN)
public class StageController {
    @Autowired
    private StageService stageService;

    @RequestMapping(method = RequestMethod.POST,
                    consumes = MediaType.APPLICATION_JSON_VALUE,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public Stage create(@RequestBody @Validated Stage stage) {
        return stageService.create(stage);
    }

    @RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE,
                    method = RequestMethod.GET)
    public List<Stage> getAll() {
        return stageService.findAll();
    }
}