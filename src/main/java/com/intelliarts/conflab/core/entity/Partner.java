package com.intelliarts.conflab.core.entity;


import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "event_company")
public class Partner extends AbstractPersistable<Long> {

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(optional = false)
    @JoinColumn(name = "partner_level_id", insertable = false)
    private PartnerLevel partnerLevel;

    public Partner() {
    }

    public Partner(Event event, Company company) {
        this.event = event;
        this.company = company;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public PartnerLevel getPartnerLevel() {
        return partnerLevel;
    }

    public void setPartnerLevel(PartnerLevel partnerLevel) {
        this.partnerLevel = partnerLevel;
    }
}
