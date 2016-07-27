package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Speaker;
import com.intelliarts.conflab.core.repository.SpeakerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class SpeakerServiceImpl extends AbstractImageAwareService<Speaker, Long> implements SpeakerService {

    private CompanyService    companyService;
    //    private EventSpeechSpeakerService eventSpeechSpeakerService;
    private SpeakerRepository speakerRepository;

    @Autowired
    public SpeakerServiceImpl(CompanyService companyService, SpeakerRepository speakerRepository,
            /*EventSpeechSpeakerService eventSpeechSpeakerService, */FilesManager filesManager) {
        super(speakerRepository, "avatars", filesManager);
        this.speakerRepository = speakerRepository;
        this.companyService = companyService;
        //        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
    }

    //    @Override
    //    @Transactional(readOnly = true)
    //    public Set<Speaker> findBySpeech(Speech speech) {
    //        return speakerRepository.findBySpeechId(speech.getId());
    //    }

    @Override
    @Transactional(readOnly = true)
    public Set<Speaker> findByEvent(Event event) {
        return speakerRepository.findByEventId(event.getId());
    }
    //
    //    @Override
    //    @Transactional(readOnly = true)
    //    public Set<Speaker> findByEventAndSpeech(Event event, Speech speech) {
    //        return speakerRepository.findByEventAndSpeech(event.getId(), speech.getId());
    //    }

    @Transactional
    @Override
    public Speaker create(Speaker speaker) {
        Speaker createdSpeaker = createSpeaker(speaker);

        //        linkToSpeech(createdSpeaker, null);
        return createdSpeaker;
    }

    //    @Override
    //    @Transactional
    //    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech) {
    //        Speaker createdSpeaker = create(speaker);
    //        linkToSpeech(createdSpeaker, speech);
    //        return createdSpeaker;
    //    }

    //    @Override
    //    @Transactional
    //    public SpeechSpeaker linkToSpeech(Speaker speaker, Speech speech) {
    //        return eventSpeechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    //    }
    //
    //    @Override
    //    @Transactional
    //    public Speaker createAndLinkToEventSpeech(Speaker speaker, Speech speech, Event event) {
    //        eventSpeechSpeakerService.deleteEventSpeechNullSpeakerLink(event, speech);
    //        Speaker createdSpeaker = create(speaker);
    //        SpeechSpeaker speechSpeaker = linkToSpeech(createdSpeaker, speech);
    //        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
    //        return createdSpeaker;
    //    }
    //
    //    @Override
    //    @Transactional
    //    public void linkToEventSpeech(Speaker speaker, Speech speech, Event event) {
    //        eventSpeechSpeakerService.deleteEventNullSpeechOrNullSpeakerLinks(event, speech, speaker);
    //        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, speaker);
    //    }
    //
    //    @Override
    //    @Transactional
    //    public void unlinkFromEventSpeech(Speaker speaker, Speech speech, Event event) {
    //        eventSpeechSpeakerService.deleteEventSpeechSpeakerLink(event, speech, speaker);
    //        if (findByEventAndSpeech(event, speech).isEmpty()) {
    //            eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speech, null);
    //        }
    //    }
    //
    //    @Override
    //    @Transactional
    //    public void linkToEvent(Speaker speaker, Event event) {
    //        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, null, speaker);
    //    }
    //
    //    @Override
    //    @Transactional
    //    public void unlinkFromEvent(Speaker speaker, Event event) {
    //        eventSpeechSpeakerService.deleteEventSpeechSpeakerLinks(event, speaker);
    //    }

    private Speaker createSpeaker(Speaker speaker) {
        Company company = speaker.getCompany();
        if (company != null) {
            Company persistedCompany =
                    isNewCompany(company) ? companyService.create(company) : companyService.findById(company.getId());
            speaker.setCompany(persistedCompany);
        }
        return speakerRepository.create(speaker);
    }

    private boolean isNewCompany(Company company) {
        return company.getId() == null;
    }

}