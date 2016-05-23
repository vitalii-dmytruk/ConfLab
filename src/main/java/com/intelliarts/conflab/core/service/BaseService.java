package com.intelliarts.conflab.core.service;


import com.intelliarts.conflab.core.entity.Persistable;

import java.io.Serializable;
import java.util.List;

public interface BaseService<E extends Persistable<ID>, ID extends Serializable> {
    List<E> findAll();

    E findById(ID id);

    E create(E entity);

    E update(E entity);

    void delete(E entity);
}
