package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService extends AbstractBaseService<Event, Long, EventRepository> {
    private static final String ENTITY_NAME = "Event";

    @Autowired
    public EventService(EventRepository eventRepository) {
        super(eventRepository);
    }

    @Override
    protected String getEntityName() {
        return ENTITY_NAME;
    }
}