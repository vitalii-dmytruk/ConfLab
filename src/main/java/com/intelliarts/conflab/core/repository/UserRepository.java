package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends BaseRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
