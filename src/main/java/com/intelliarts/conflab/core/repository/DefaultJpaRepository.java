package com.intelliarts.conflab.core.repository;


import com.intelliarts.conflab.core.entity.Persistable;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import java.io.Serializable;

public class DefaultJpaRepository<E extends Persistable<ID>, ID extends Serializable> extends SimpleJpaRepository<E, ID>
        implements BaseRepository<E, ID> {
    private final String idMustNotBeNullMsg;
    private final String entityNotFoundMsg;

    public DefaultJpaRepository(JpaEntityInformation<E, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        String entityName = entityInformation.getEntityName();
        this.idMustNotBeNullMsg = entityName + " ID must not be null!";
        this.entityNotFoundMsg = entityName + " with ID '%s' not found.";
    }

    @Override
    public E findOne(ID id) {
        E entity = super.findOne(id);
        if (null == entity) {
            throw new EntityNotFoundException(String.format(entityNotFoundMsg, id));
        }
        return entity;
    }

    @Transactional
    @Override
    public E create(E entity) {
        entity.setId(null);
        return super.save(entity);
    }

    @Transactional
    @Override
    public E update(E entity) {
        ID id = entity.getId();
        if (id == null) {
            throw new IllegalArgumentException(idMustNotBeNullMsg);
        }
        return super.save(entity);
    }
}
