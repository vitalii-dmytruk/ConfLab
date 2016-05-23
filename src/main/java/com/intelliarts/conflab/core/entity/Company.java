package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.intelliarts.conflab.core.entity.validation.UrlLength;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.net.URL;
import java.util.Set;

@Entity
@Table(name = "company")
public class Company extends AbstractImageAwareEntity<Long> {

    @NotBlank
    @Column
    @Getter
    @Setter
    public String name;

    @UrlLength(max = 255, message = "Company URL value is greater then {max} characters.")
    @Column
    @Getter
    @Setter
    public URL url;

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    @Getter
    @Setter
    private Set<Partner> partners;
}