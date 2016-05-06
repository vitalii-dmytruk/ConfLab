package com.intelliarts.conflab.core.service;


import com.intelliarts.conflab.core.entity.Persistable;
import com.intelliarts.conflab.core.repository.BaseRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

public abstract class AbstractBaseService<E extends Persistable<ID>, ID extends Serializable, R extends
        BaseRepository<E, ID>> {

    private final String entityNotFoundMsg;
    private final String idIsNotSpecifiedMsg;

    protected final R repository;

    protected AbstractBaseService(String entityName, R repository) {
        this.repository = repository;
        this.idIsNotSpecifiedMsg = entityName + " Id is not specified";
        this.entityNotFoundMsg = entityName + " with ID '%d'not found.";
    }

    public R getRepository() {
        return repository;
    }

    @Transactional(readOnly = true)
    public List<E> findAll() {
        return this.repository.findAll();
    }

    @Transactional(readOnly = true)
    public E findById(ID id) {
        Optional<E> entity = repository.findOne(id);
        return entity.orElseThrow(() -> new EntityNotFoundException(String.format(entityNotFoundMsg, id)));
    }

    @Transactional
    public E create(E entity) {
        entity.setId(null);
        return repository.save(entity);
    }

    @Transactional
    public E update(E entity) {
        if (entity.getId() == null) {
            throw new IllegalArgumentException(idIsNotSpecifiedMsg);
        }
        return repository.save(entity);
    }

}
