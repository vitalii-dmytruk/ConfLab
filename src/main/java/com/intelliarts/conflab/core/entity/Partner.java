package com.intelliarts.conflab.core.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "event_company")
public class Partner extends AbstractPersistable<Long> {

    @ManyToOne
    @JoinColumn(name = "event_id")
    @Getter
    @Setter
    private Event event;

    @ManyToOne
    @JoinColumn(name = "company_id")
    @Getter
    @Setter
    private Company company;

    @ManyToOne(optional = false)
    @JoinColumn(name = "partner_level_id", insertable = false)
    @Getter
    @Setter
    private PartnerLevel partnerLevel;

    public Partner() {
    }

    public Partner(Event event, Company company) {
        this.event = event;
        this.company = company;
    }
}