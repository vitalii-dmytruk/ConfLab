package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;


public interface SpeakerService extends ImageAwareService<Speaker, Long> {
    @Transactional(readOnly = true)
    Set<Speaker> findBySpeech(Speech speech);

    @Transactional(readOnly = true)
    Set<Speaker> findByEvent(Event event);

    @Transactional(readOnly = true)
    Set<Speaker> findByEventAndSpeech(Event event, Speech speech);

    @Transactional
    @Override
    Speaker create(Speaker speaker);

    @Transactional
    Speaker createAndLinkToSpeech(Speaker speaker, Speech speech);

    @Transactional
    SpeechSpeaker linkToSpeech(Speaker speaker, Speech speech);

    @Transactional
    Speaker createAndLinkToEventSpeech(Speaker speaker, Speech speech, Event event);

    @Transactional
    void linkToEventSpeech(Speaker speaker, Speech speech, Event event);

    @Transactional
    void unlinkFromEventSpeech(Speaker speaker, Speech speech, Event event);

    @Transactional
    void linkToEvent(Speaker speaker, Event event);

    @Transactional
    void unlinkFromEvent(Speaker speaker, Event event);
}
