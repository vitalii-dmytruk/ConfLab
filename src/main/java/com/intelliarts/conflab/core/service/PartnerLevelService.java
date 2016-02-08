package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.PartnerLevel;
import com.intelliarts.conflab.core.repository.PartnerLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerLevelService extends AbstractBaseService<PartnerLevel, Long, PartnerLevelRepository> {

    @Autowired
    public PartnerLevelService(PartnerLevelRepository partnerLevelRepository) {
        super("Partner Level", partnerLevelRepository);
    }

}
