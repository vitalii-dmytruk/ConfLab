package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.net.URL;
import java.util.Set;

@Entity
@Table(name = "company")
public class Company {

    @Id
    @SequenceGenerator(name = "company_seq", sequenceName = "company_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "company_seq")
    @Column
    public Long id;

    @NotBlank
    @Column
    public String name;

    @Column
    public URL url;

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    private Set<Partner> partners;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public URL getUrl() {
        return url;
    }

    public void setUrl(URL link) {
        this.url = link;
    }

    public Set<Partner> getPartners() {
        return partners;
    }

    public void setPartners(Set<Partner> partners) {
        this.partners = partners;
    }
}
