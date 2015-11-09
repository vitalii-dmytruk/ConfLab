package com.intelliarts.conflab.core.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface BaseRepository<T, ID extends Serializable> extends Repository<T, ID> {

    List<T> findAll();

    Optional<T> findOne(ID id);

    T save(T persisted);

    void delete(ID id);
}