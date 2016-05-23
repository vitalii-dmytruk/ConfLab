package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.PartnerLevel;
import com.intelliarts.conflab.core.repository.PartnerLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PartnerLevelServiceImpl extends DefaultService<PartnerLevel, Long> implements PartnerLevelService {

    @Autowired
    public PartnerLevelServiceImpl(PartnerLevelRepository partnerLevelRepository) {
        super(partnerLevelRepository);
    }

}
