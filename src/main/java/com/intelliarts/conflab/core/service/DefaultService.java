package com.intelliarts.conflab.core.service;


import com.intelliarts.conflab.core.entity.Persistable;
import com.intelliarts.conflab.core.repository.BaseRepository;

import java.io.Serializable;
import java.util.List;

public class DefaultService<E extends Persistable<ID>, ID extends Serializable> implements BaseService<E, ID> {

    private BaseRepository<E, ID> repository;

    public DefaultService(BaseRepository<E, ID> repository) {
        this.repository = repository;
    }

    @Override
    public List<E> findAll() {
        return repository.findAll();
    }

    @Override
    public E findById(ID id) {
        return repository.findOne(id);
    }

    @Override
    public E create(E entity) {
        return repository.create(entity);
    }

    @Override
    public E update(E entity) {
        return repository.update(entity);
    }

    @Override
    public void delete(E entity) {
        repository.delete(entity);
    }
}
