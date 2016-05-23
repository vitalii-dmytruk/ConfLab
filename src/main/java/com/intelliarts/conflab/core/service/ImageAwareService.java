package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.ImageAwareEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.Serializable;


public interface ImageAwareService<E extends ImageAwareEntity<ID>, ID extends Serializable> extends BaseService<E, ID> {
    @Transactional
    String createImage(E entity, @NotNull MultipartFile imageFile);

    @Transactional
    String updateImage(E entity, @NotNull MultipartFile imageFile);

    @Transactional
    void deleteImage(E entity);
}
