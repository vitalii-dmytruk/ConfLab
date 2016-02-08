package com.intelliarts.conflab.core.entity;


import java.io.Serializable;

public interface ImageAwareEntity<ID extends Serializable> extends Persistable<ID> {

    String getImage();

    void setImage(String image);

}
