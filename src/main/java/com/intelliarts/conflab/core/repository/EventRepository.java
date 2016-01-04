package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Event;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends BaseRepository<Event, Long> {
}
