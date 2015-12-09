package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Long> {
}
