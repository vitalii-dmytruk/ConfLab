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
    public Speaker create(Speaker speaker, MultipartFile imageFile) {
        Speaker createdSpeaker = createSpeaker(speaker);
        createSpeakerImage(createdSpeaker, imageFile);

        linkToSpeech(createdSpeaker, null);
        return createdSpeaker;
    }

    @Transactional
    public Speaker update(Speaker speaker, MultipartFile file) {
        if (speaker.getId() == null) {
            throw new IllegalArgumentException("Speaker Id is not specified");
        }

        Speaker updatedSpeaker = updateImage(speaker, file);

        return speakerRepository.save(updatedSpeaker);
    }

    @Transactional
    public Speaker createAndLinkToSpeech(Speaker speaker, Speech speech, MultipartFile file) {
        Speaker createdSpeaker = create(speaker, file);
        linkToSpeech(createdSpeaker, speech);
        return createdSpeaker;
    }

    @Transactional
    public SpeechSpeaker linkToSpeech(Speaker speaker, Speech speech) {
        return eventSpeechSpeakerService.createSpeechSpeakerLink(speech, speaker);
    }

    @Transactional
    public Speaker createAndLinkToEventSpeech(Speaker speaker, MultipartFile file, Speech speech, Event event) {
        eventSpeechSpeakerService.deleteEventSpeechNullSpeakerLink(event, speech);
        Speaker createdSpeaker = create(speaker, file);
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

    public Speaker createAvatar(Speaker speaker, MultipartFile file) {
        return createSpeakerImage(speaker, file);
    }

    public Speaker updateAvatar(Speaker speaker, MultipartFile file) {
        Speaker updatedSpeaker = updateImage(speaker, file);
        return speakerRepository.save(updatedSpeaker);
    }

    public Speaker deleteAvatar(Speaker speaker) {
        String image = deleteImage(speaker);
        speaker.setImage(image);
        return speakerRepository.save(speaker);
    }

    private Speaker updateImage(Speaker speaker, MultipartFile file) {
        String image;
        if (file != null) {
            image = filesManager.saveSpeakerAvatar(speaker.getId(), file);
        } else if (speaker.getImage() == null) {
            image = deleteImage(speaker);
        } else {
            image = findById(speaker.getId()).getImage();
        }
        speaker.setImage(image);

        return speaker;
    }

    private String deleteImage(Speaker speaker) {
        filesManager.removeSpeakerAvatar(speaker.getId());
        return DEFAULT_AVATAR;
    }

    private Speaker createSpeaker(Speaker speaker) {
        speaker.setId(null);
        Company company = speaker.getCompany();
        if (company != null) {
            Company persistedCompany = isNewCompany(company) ? companyService.create(company, null) :
                    companyService.findById(company.getId());
            speaker.setCompany(persistedCompany);
        }
        return speakerRepository.save(speaker);
    }

    private boolean isNewCompany(Company company) {
        return company.getId() == null;
    }

    private Speaker createSpeakerImage(Speaker speaker, MultipartFile imageFile) {
        if (imageFile != null) {
            String avatarPath = filesManager.saveSpeakerAvatar(speaker.getId(), imageFile);
            speaker.setImage(avatarPath);
        } else {
            speaker.setImage(DEFAULT_AVATAR);
        }
        return speakerRepository.save(speaker);
    }
}