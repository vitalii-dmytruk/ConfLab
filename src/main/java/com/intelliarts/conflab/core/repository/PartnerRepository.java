package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.Partner;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface PartnerRepository extends BaseRepository<Partner, Long> {

    Set<Partner> deleteByEventAndCompany(Event event, Company company);

    Set<Partner> findByEvent(Event event);

    Optional<Partner> findByEventAndCompany(Event event, Company company);

}
