package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.api.User;
import com.intelliarts.conflab.core.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/current")
    @ResponseBody
    public User getSessionUser(Principal principal) {
        if (isUserAnonymous(principal)) {
            return anonymousUser();
        } else {
            return userService.findByUsername(grabUsername(principal));
        }
    }

    private boolean isUserAnonymous(Principal principal) {
        return principal == null;
    }

    private User anonymousUser() {
        return new User();
    }

    private String grabUsername(Principal principal) {
        UserDetails userDetails = (UserDetails) ((Authentication) principal).getPrincipal();
        return userDetails.getUsername();
    }
}