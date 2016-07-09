package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class EventService extends DefaultService<Event, Long> {

    private SpeechService speechService;

    @Autowired
    public EventService(EventRepository eventRepository, SpeechService speechService) {
        super(eventRepository);
        this.speechService = speechService;
    }

    @Override
    public Event update(Event entity) {
        resetOutOfDaysSpeeches(entity);
        return super.update(entity);
    }

    private void resetOutOfDaysSpeeches(Event event) {
        long maxDay = DAYS.between(event.getStartDate(), event.getEndDate()) + 1;
        speechService.resetSpeechesWithHigherDay((int) maxDay);
    }
}