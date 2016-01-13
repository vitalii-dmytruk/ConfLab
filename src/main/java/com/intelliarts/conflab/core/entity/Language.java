package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "languages")
public class Language {

    @Id
    @Column
    public Long id;

    @Column
    public String name;
}