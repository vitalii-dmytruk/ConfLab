package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.intelliarts.conflab.core.entity.converter.LocalDateConverter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @Column
    @SequenceGenerator(name = "event_seq", sequenceName = "event_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "event_seq")
    private Long id;

    @Column
    @NotEmpty
    @Length(max = 255, message = "Event name is greater then {max} characters.")
    private String name;

    @Column
    private String description;

    @JsonFormat(pattern = "dd-MMM-yyyy")
    @Column(name = "start_date")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate startDate;

    @JsonFormat(pattern = "dd-MMM-yyyy")
    @Column(name = "end_date")
    @Convert(converter = LocalDateConverter.class)
    private LocalDate endDate;

    @Column
    private String country;
    @Column
    private String city;
    @Column
    private String address;
    @Column
    @Length(max = 255, message = "Event contacts value is greater then {max} characters.")
    private String contacts;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    private Set<EventSpeechSpeaker> eventSpeechSpeakers;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    private Set<EventCompany> eventCompanies;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String str) {
        this.address = str;
    }

    public Set<EventSpeechSpeaker> getEventSpeechSpeakers() {
        return eventSpeechSpeakers;
    }

    public void setEventSpeechSpeakers(Set<EventSpeechSpeaker> eventSpeechSpeakers) {
        this.eventSpeechSpeakers = eventSpeechSpeakers;
    }

    public Set<EventCompany> getEventCompanies() {
        return eventCompanies;
    }

    public void setEventCompanies(Set<EventCompany> eventCompanies) {
        this.eventCompanies = eventCompanies;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }
}