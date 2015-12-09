package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.User;
import com.intelliarts.conflab.core.entity.UserEntity;
import com.intelliarts.conflab.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@Service
public class UserService extends SimpleService<User, UserEntity> {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        super(repository);
        this.repository = repository;
    }

      public User getUser(String username) {
        UserEntity userEntity = repository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User with username " + username + " was not found"));
        return toApi(userEntity);
    }

    public User getUser(Principal principal) {
        if (isUserAnonymous(principal)) {
            return anonymousUser();
        } else {
            String username = grabUsername(principal);
            return getUser(username);
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
