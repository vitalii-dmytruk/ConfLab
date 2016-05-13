package com.intelliarts.conflab.core.entity;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.Min;

@Entity
@Table(name = "track")
public class Track extends AbstractPersistable<Integer> {

    @NotBlank(message = "Track title cannot be empty.")
    @Length(max = 50, message = "Track title is greater then {max} characters.")
    @Column(nullable = false)
    private String title;

    @Min(value = 2, message = "Track don't have minimal ({value}) capacity.")
    @Column(nullable = false, unique = true)
    private int capacity;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}