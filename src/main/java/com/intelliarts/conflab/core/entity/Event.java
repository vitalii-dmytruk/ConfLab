package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.intelliarts.conflab.core.entity.converter.LocalDateConverter;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "events")
@Getter
@Setter
public class Event extends AbstractPersistable<Long> {

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
    private Set<Partner> partners;
}