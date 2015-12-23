package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.entity.Role;
import com.intelliarts.conflab.core.service.SpeechSpeakerService;
import com.intelliarts.conflab.security.HasAuthority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@HasAuthority(role = Role.ADMIN)
public class SpeechSpeakerController {
    private SpeechSpeakerService speechSpeakerService;

    @Autowired
    public SpeechSpeakerController(SpeechSpeakerService speechSpeakerService) {
        this.speechSpeakerService = speechSpeakerService;
    }

}
