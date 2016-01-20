package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Company;
import com.intelliarts.conflab.core.entity.Event;
import com.intelliarts.conflab.core.entity.EventCompany;
import com.intelliarts.conflab.core.entity.SpeechSpeaker;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface EventCompanyRepository extends BaseRepository<EventCompany, Long> {

    Set<SpeechSpeaker> deleteByEventAndCompany(Event event, Company company);
}
