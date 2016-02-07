package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.User;
import com.intelliarts.conflab.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractBaseService<User, Long, UserRepository> implements UserDetailsService {
    private static final String ENTITY_NAME = "User";

    @Autowired
    public UserService(UserRepository userRepository) {
        super(userRepository);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                         .orElseThrow(() -> new UsernameNotFoundException(
                                 String.format("User with username %s was not found", username)));
    }

    @Override
    protected String getEntityName() {
        return ENTITY_NAME;
    }

}