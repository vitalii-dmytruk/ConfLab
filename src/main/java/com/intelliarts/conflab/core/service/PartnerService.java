package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.Partner;
import com.intelliarts.conflab.core.repository.PartnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class PartnerService {

    private PartnerRepository partnerRepository;

    @Autowired
    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    public List<Partner> findAll() {
        return partnerRepository.findAll();
    }

    public Partner save(Partner partner) {
        partner.setId(null);
        return partnerRepository.save(partner);
    }

    public Partner findById(Long id) {
        Optional<Partner> partner = partnerRepository.findOne(id);
        return partner.orElseThrow(() -> new EntityNotFoundException("Partner with ID '" + id + "' " + "not found."));
    }
}