package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.User;

import java.util.Optional;

public interface UserRepository extends BaseRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
