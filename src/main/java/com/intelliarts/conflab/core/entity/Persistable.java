package com.intelliarts.conflab.core.entity;

import java.io.Serializable;

public interface Persistable<ID extends Serializable> {

    ID getId();

    void setId(ID id);
}
