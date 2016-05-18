package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String name;

    @Column
    private int   capacity;

    public String getName() {
        return name;
    }

    @ManyToOne
    @JoinColumn(name = "event_id", updatable = false)
    @JsonIgnore
    private Event event;

    public void setName(String name) {
        this.name = name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}