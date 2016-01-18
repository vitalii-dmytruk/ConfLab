package com.intelliarts.conflab.core.entity;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Min;

@Entity
@Table(name = "stage")
public class Stage {

    @Id
    @SequenceGenerator(name = "stage_seq", sequenceName = "stage_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stage_seq")
    @Column
    private Integer id;

    @NotBlank(message = "Stage title cannot be empty.")
    @Length(max = 50, message = "Stage title is greater then {max} characters.")
    @Column(nullable = false)
    private String title;

    @Min(value = 2, message = "Stage don't have minimal ({value}) capacity.")
    @Column(nullable = false, unique = true)
    private int capacity;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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