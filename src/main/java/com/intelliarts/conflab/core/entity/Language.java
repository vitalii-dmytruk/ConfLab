package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "languages")
public class Language extends AbstractPersistable<Long> {

    @Column
    public String name;
}