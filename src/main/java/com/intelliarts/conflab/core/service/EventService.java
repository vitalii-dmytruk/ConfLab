package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAll() {
       return eventRepository.findAll();
    }
}