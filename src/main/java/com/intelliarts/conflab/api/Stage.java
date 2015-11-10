package com.intelliarts.conflab.api;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Min;

public class Stage {
    @NotBlank(message = "Stage title cannot be empty.")
    @Length(max = 50, message = "Stage title is greater then {max} characters.")
    private String title;

    @Min(value = 2, message = "Stage don't have minimal ({value}) capacity.")
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