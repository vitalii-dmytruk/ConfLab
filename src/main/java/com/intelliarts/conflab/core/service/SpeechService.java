package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Set;


public interface SpeechService extends BaseService<Speech, Long> {

    @Transactional(readOnly = true)
    Collection<Speech> find(Event event, Speaker speaker);

    //TODO investigate whether this method should be removed.
    @Transactional(readOnly = true)
    Set<Speech> findBySpeaker(Speaker speaker);

    //TODO investigate whether this method should be removed.
    @Transactional(readOnly = true)
    Set<Speech> findByEvent(Event event);

    //TODO investigate whether this method should be removed.
    @Transactional(readOnly = true)
    Set<Speech> findByEventAndSpeaker(Event event, Speaker speaker);

    @Transactional
    @Override
    Speech create(Speech speech);

    @Transactional
    Speech createAndLinkToSpeaker(Speech speech, Speaker speaker);

    @Transactional
    SpeechSpeaker linkToSpeaker(Speech speech, Speaker speaker);

    @Transactional
    void unlinkFromSpeaker(Long speechId, Speaker speaker);

    @Transactional
    Speech createAndLinkToEventSpeaker(Speech speech, Speaker speaker, Event event);

    @Transactional
    void linkToEventSpeaker(Speech speech, Speaker speaker, Event event);

    @Transactional
    void unlinkFromEventSpeaker(Speech speech, Speaker speaker, Event event);

    @Transactional
    Speech createAndLinkToEvent(Speech speech, Event event);

    @Transactional
    void linkToEvent(Speech speech, Event event);

    @Transactional
    void unlinkFromEvent(Speech speech, Event event);
}
