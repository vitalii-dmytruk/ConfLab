package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Set;

@Entity
@Table(name = "partner_level")
public class PartnerLevel extends AbstractPersistable<Long> {

    @Length(max = 80, message = "Partner level name value is greater then {max} characters.")
    @Column
    @Getter
    @Setter
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    @Getter
    @Setter
    private Set<Partner> partners;
}