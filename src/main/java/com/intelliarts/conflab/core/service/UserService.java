package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.User;
import com.intelliarts.conflab.core.entity.UserEntity;
import com.intelliarts.conflab.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserService extends SimpleService<User, UserEntity> {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public User getSessionUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return new User();
        }

        String username = principal instanceof UserDetails
                ? ((UserDetails) principal).getUsername()
                : principal.toString();

        Optional<UserEntity> userEntity = repository.findByUsername(username);
        return toApi(userEntity.orElseThrow(
                () -> new EntityNotFoundException("User with username " + username + " was not found")));
    }
}
