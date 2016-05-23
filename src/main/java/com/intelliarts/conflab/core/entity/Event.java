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
public class Event extends AbstractPersistable<Long> {

    @Column
    @NotEmpty
    @Length(max = 255, message = "Event name is greater then {max} characters.")
    @Getter
    @Setter
    private String name;

    @Column
    @Getter
    @Setter
    private String description;

    @JsonFormat(pattern = "dd-MMM-yyyy")
    @Column(name = "start_date")
    @Convert(converter = LocalDateConverter.class)
    @Getter
    @Setter
    private LocalDate startDate;

    @JsonFormat(pattern = "dd-MMM-yyyy")
    @Column(name = "end_date")
    @Convert(converter = LocalDateConverter.class)
    @Getter
    @Setter
    private LocalDate endDate;

    @Column
    @Getter
    @Setter
    private String country;
    @Column
    @Getter
    @Setter
    private String city;
    @Column
    @Getter
    @Setter
    private String address;
    @Column
    @Length(max = 255, message = "Event contacts value is greater then {max} characters.")
    @Getter
    @Setter
    private String contacts;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    @Getter
    @Setter
    private Set<EventSpeechSpeaker> eventSpeechSpeakers;

    @JsonIgnore
    @OneToMany(mappedBy = "event")
    @Getter
    @Setter
    private Set<Partner> partners;
}