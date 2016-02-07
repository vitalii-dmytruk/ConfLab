package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.entity.Speech;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class SpeakerService extends AbstractImageAwareService<Speaker, Long, SpeakerRepository> {
    private static final String ENTITY_NAME           = "Speaker";
    private static final String SPEAKER_AVATAR_FOLDER = "avatars";

    private CompanyService            companyService;
    private EventSpeechSpeakerService eventSpeechSpeakerService;


    @Autowired
    public SpeakerService(CompanyService companyService, SpeakerRepository speakerRepository,
            EventSpeechSpeakerService eventSpeechSpeakerService, FilesManager filesManager) {
        super(speakerRepository, filesManager);
        this.companyService = companyService;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findBySpeech(Speech speech) {
        return repository.findBySpeechId(speech.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEvent(Event event) {
        return repository.findByEventId(event.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEventAndSpeech(Event event, Speech speech) {
        return repository.findByEventAndSpeech(event.getId(), speech.getId());
    }

    @Transactional
    @Override
    public Speaker create(Speaker speaker) {
        Speaker createdSpeaker = createSpeaker(speaker);

        linkToSpeech(createdSpeaker, null);
        return createdSpeaker;
    }

    @Transactional
    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech) {
        Speaker createdSpeaker = create(speaker);
        linkToSpeech(createdSpeaker, speech);
        return createdSpeaker;
    }

    @Transactional
    public SpeechSpeaker linkToSpeech(Speaker speaker, Speech speech) {
        return eventSpeechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    @Transactional
    public Speaker createAndLinkToEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechNullSpeakerLink(event, speech);
        Speaker createdSpeaker = create(speaker);
        SpeechSpeaker speechSpeaker = linkToSpeech(createdSpeaker, speech);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
        return createdSpeaker;
    }

    @Transactional
    public void linkToEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventNullSpeechOrNullSpeakerLinks(event, speech, speaker);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, speaker);
    }

    @Transactional
    public void unlinkFromEventSpeech(Speaker speaker, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLink(event, speech, speaker);
        if (findByEventAndSpeech(event, speech).isEmpty()) {
            eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, null);
        }
    }

    @Transactional
    public void linkToEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, null, speaker);
    }

    @Transactional
    public void unlinkFromEvent(Speaker speaker, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechSpeakerLinks(event, speaker);
    }

    @Override
    protected String getFolderName() {
        return SPEAKER_AVATAR_FOLDER;
    }

    @Override
    protected String getEntityName() {
        return ENTITY_NAME;
    }

    private Speaker createSpeaker(Speaker speaker) {
        speaker.setId(null);
        Company company = speaker.getCompany();
        if (company != null) {
            Company persistedCompany =
                    isNewCompany(company) ? companyService.create(company) : companyService.findById(company.getId());
            speaker.setCompany(persistedCompany);
        }
        return repository.save(speaker);
    }

    private boolean isNewCompany(Company company) {
        return company.getId() == null;
    }

}