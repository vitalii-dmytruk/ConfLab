package com.intelliarts.conflab.core.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;

@MappedSuperclass
public abstract class AbstractImageAwareEntity<ID extends Serializable> extends AbstractPersistable<ID>
        implements ImageAwareEntity<ID> {


    @Column(updatable = false)
    private String image;

    @Override
    public String getImage() {
        return image;
    }

    @Override
    public void setImage(String image) {
        this.image = image;
    }
}
