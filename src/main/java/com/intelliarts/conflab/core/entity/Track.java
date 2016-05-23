package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "track")
public class Track extends AbstractPersistable<Integer> {

    @NotBlank(message = "Track name cannot be empty.")
    @Length(max = 50, message = "Track name is greater then {max} characters.")
    @Column(nullable = false)
    @Getter
    @Setter
    private String name;

    @Column
    @Getter
    @Setter
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "event_id", updatable = false)
    @JsonIgnore
    @Getter
    @Setter
    private Event event;
}