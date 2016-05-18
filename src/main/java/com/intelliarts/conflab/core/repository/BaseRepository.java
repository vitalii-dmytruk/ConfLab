package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.Persistable;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface BaseRepository<E extends Persistable<ID>, ID extends Serializable> extends Repository<E, ID> {

    List<E> findAll();

    E findOne(ID id);

    E create(E entity);

    E update(E entity);

    void delete(E entity);

}