package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.User;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/session")
public class SessionController {

    @RequestMapping(value = "/currentUser",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public User getSessionUser(@AuthenticationPrincipal User currentUser) {
        return currentUser;
    }
}