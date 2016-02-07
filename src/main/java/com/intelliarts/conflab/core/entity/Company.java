package com.intelliarts.conflab.core.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.intelliarts.conflab.core.entity.validation.UrlLength;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.net.URL;
import java.util.Set;

@Entity
@Table(name = "company")
public class Company extends AbstractPersistable<Long> {

    @NotBlank
    @Column
    public String name;

    @UrlLength(max = 255, message = "Company URL value is greater then {max} characters.")
    @Column
    public URL url;

    @Column
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "company")
    private Set<Partner> partners;

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Partner> getPartners() {
        return partners;
    }

    public void setPartners(Set<Partner> partners) {
        this.partners = partners;
    }
}
