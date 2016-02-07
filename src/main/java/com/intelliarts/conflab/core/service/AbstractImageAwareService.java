package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.entity.ImageAwareEntity;
import com.intelliarts.conflab.core.repository.ImageAwareRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public abstract class AbstractImageAwareService<E extends ImageAwareEntity<ID>, ID extends Serializable, R extends
        ImageAwareRepository<E, ID>>
        extends AbstractBaseService<E, ID, R> {

    private FilesManager filesManager;

    protected AbstractImageAwareService(R repository, FilesManager filesManager) {
        super(repository);
        this.filesManager = filesManager;
    }

    @Transactional
    public String createImage(E entity, @NotNull MultipartFile imageFile) {
        ID entityId = entity.getId();
        String imagePath = filesManager.saveImage(entityId.toString(), imageFile, getFolderName());
        repository.updateImage(imagePath, entityId);
        return imagePath;
    }

    @Transactional
    public String updateImage(E entity, @NotNull MultipartFile imageFile) {
        filesManager.removeImage(entity.getId().toString(), getFolderName());
        return createImage(entity, imageFile);
    }

    @Transactional
    public void deleteImage(E entity) {
        ID entityId = entity.getId();
        filesManager.removeImage(entityId.toString(), getFolderName());
        repository.updateImage(null, entityId);
    }

    protected abstract String getFolderName();
}
