package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Speaker;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpeakerRepository extends BaseRepository<Speaker, Long> {

    Optional<Speaker> findByEmail(String email);
}