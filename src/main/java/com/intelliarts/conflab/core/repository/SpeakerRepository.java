package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.SpeakerEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SpeakerRepository extends BaseRepository<SpeakerEntity, Long> {

    Optional<SpeakerEntity> findByEmail(String email);
}