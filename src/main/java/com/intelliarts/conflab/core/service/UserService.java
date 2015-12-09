package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.api.User;
import com.intelliarts.conflab.core.entity.UserEntity;
import com.intelliarts.conflab.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.security.Principal;

@Service
public class UserService extends SimpleService<User, UserEntity> implements UserDetailsService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public User getUser(Principal principal) {
        if (isUserAnonymous(principal)) {
            return anonymousUser();
        } else {
            return toApi(toUserEntity(principal));
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with username %s was not found", username)));
    }

    private boolean isUserAnonymous(Principal principal) {
        return principal == null;
    }

    private User anonymousUser() {
        return new User();
    }

    private UserEntity toUserEntity(Principal principal) {
        return (UserEntity) ((Authentication) principal).getPrincipal();
    }
}