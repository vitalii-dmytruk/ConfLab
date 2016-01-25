package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.PartnerLevel;
import com.intelliarts.conflab.core.repository.PartnerLevelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class PartnerLevelService {
    private PartnerLevelRepository partnerLevelRepository;

    @Autowired
    public PartnerLevelService(PartnerLevelRepository partnerLevelRepository) {
        this.partnerLevelRepository = partnerLevelRepository;
    }

    @Transactional(readOnly = true)
    public List<PartnerLevel> findAll() {
        return partnerLevelRepository.findAll();
    }

    @Transactional(readOnly = true)
    public PartnerLevel findById(Long id) {
        Optional<PartnerLevel> partnerLevel = partnerLevelRepository.findOne(id);
        return partnerLevel.orElseThrow(
                () -> new EntityNotFoundException("Partner Level with ID '" + id + "' not found."));
    }
}
