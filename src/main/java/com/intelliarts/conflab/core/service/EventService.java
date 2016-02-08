package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventService extends AbstractBaseService<Event, Long, EventRepository> {
    @Autowired
    public EventService(EventRepository eventRepository) {
        super("Event", eventRepository);
    }
}