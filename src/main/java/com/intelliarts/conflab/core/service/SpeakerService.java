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
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SpeakerService {

    private static final String DEFAULT_AVATAR = "/img/default-avatar.png";
    private CompanyService            companyService;
    private SpeakerRepository         speakerRepository;
    private EventSpeechSpeakerService eventSpeechSpeakerService;
    private FilesManager              filesManager;

    @Autowired
    public SpeakerService(CompanyService companyService, SpeakerRepository speakerRepository,
            EventSpeechSpeakerService eventSpeechSpeakerService, FilesManager filesManager) {
        this.companyService = companyService;
        this.speakerRepository = speakerRepository;
        this.eventSpeechSpeakerService = eventSpeechSpeakerService;
        this.filesManager = filesManager;
    }

    @Transactional(readOnly = true)
    public List<Speaker> findAll() {
        return speakerRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Speaker findById(Long id) {
        Optional<Speaker> speaker = speakerRepository.findOne(id);
        return speaker.orElseThrow(() -> new EntityNotFoundException("Speaker with ID '" + id + "' not found."));
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findBySpeech(Speech speech) {
        return speakerRepository.findBySpeechId(speech.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEvent(Event event) {
        return speakerRepository.findByEventId(event.getId());
    }

    @Transactional(readOnly = true)
    public Set<Speaker> findByEventAndSpeech(Event event, Speech speech) {
        return speakerRepository.findByEventAndSpeech(event.getId(), speech.getId());
    }

    @Transactional
    public Speaker create(Speaker speaker, MultipartFile imageFile) throws IOException {
        speaker.setId(null);
        Company company = speaker.getCompany();
        if (company != null && company.getId() != null) {
            Company persistedCompany = companyService.findById(company.getId());
            speaker.setCompany(persistedCompany);
        }

        if (imageFile != null) {
            String avatarPath = filesManager.saveSpeakerAvatar(speaker.getId(), imageFile);
            speaker.setImage(avatarPath);
        } else {
            speaker.setImage(DEFAULT_AVATAR);
        }
        speakerRepository.save(speaker);

        linkToSpeech(speaker, null);
        return speaker;
    }

    @Transactional
    public Speaker update(Speaker speaker) {
        if (speaker.getId() == null) {
            throw new IllegalArgumentException("Speaker Id is not specified");
        }
        return speakerRepository.save(speaker);
    }

    @Transactional
    public Speaker update(Speaker speaker, MultipartFile file) throws IOException {
        if (speaker.getImage() == null) {
            filesManager.remove(String.valueOf(speaker.getId()));
            if (file == null) {
                speaker.setImage(DEFAULT_AVATAR);
            } else {
                String avatarPath = filesManager.saveSpeakerAvatar(speaker.getId(), file);
                speaker.setImage(avatarPath);
            }
        } else {
            if (file != null) {
                String avatarPath = filesManager.saveSpeakerAvatar(speaker.getId(), file);
                speaker.setImage(avatarPath);
            }
        }
        return speakerRepository.save(speaker);
    }

    @Transactional
    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech, MultipartFile file) throws IOException {
        Speaker createdSpeaker = create(speaker, file);
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
        SpeechSpeaker speechSpeaker = linkToSpeech(speaker, speech);
        eventSpeechSpeakerService.createEventSpeechSpeakerLink(event, speechSpeaker);
        return speaker;
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
}