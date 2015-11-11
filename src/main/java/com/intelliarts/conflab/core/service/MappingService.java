package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.repository.BaseRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;
import java.util.stream.Collectors;

public class MappingService<A, E> {
    private final Class<A>                                  apiClass;
    private final Class<E>                                  entityClass;
    @Autowired
    private       ModelMapper                               mapper;
    private       BaseRepository<E, ? extends Serializable> repository;

    public MappingService(BaseRepository<E, ? extends Serializable> repository) {
        this.apiClass = getClassFromParameters(0);
        this.entityClass = getClassFromParameters(1);
        this.repository = repository;
    }

    public A create(A stage) {
        E entity = toEntity(stage);
        E persisted = repository.save(entity);
        return toApi(persisted);
    }

    public List<A> getAll() {
        List<E> stageEntities = repository.findAll();
        return stageEntities.stream().map(this::toApi).collect(Collectors.toList());
    }

    protected E toEntity(A speaker) {
        return mapper.map(speaker, entityClass);
    }

    protected A toApi(E entity) {
        return mapper.map(entity, apiClass);
    }

    @SuppressWarnings("unchecked")
    private <T> Class<T> getClassFromParameters(int index) {
        return (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[index];
    }
}