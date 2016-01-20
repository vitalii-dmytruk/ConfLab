package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Company;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CompanyRepository extends BaseRepository<Company, Long> {

    @Query(value = "SELECT DISTINCT company " +
                   "FROM Company company " +
                   "JOIN company.eventCompanies eventCompanies " +
                   "WHERE eventCompanies.event.id=:eventId")
    Set<Company> findByEventId(@Param("eventId") Long eventId);
}
