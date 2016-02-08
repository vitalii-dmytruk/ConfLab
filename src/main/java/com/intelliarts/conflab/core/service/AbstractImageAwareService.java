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

    private final String folderName;

    private FilesManager filesManager;

    protected AbstractImageAwareService(String entityName, R repository, String folderName, FilesManager filesManager) {
        super(entityName, repository);
        this.filesManager = filesManager;
        this.folderName = folderName;
    }

    @Transactional
    public String createImage(E entity, @NotNull MultipartFile imageFile) {
        ID entityId = entity.getId();
        String imagePath = filesManager.saveImage(entityId.toString(), imageFile, folderName);
        repository.updateImage(imagePath, entityId);
        return imagePath;
    }

    @Transactional
    public String updateImage(E entity, @NotNull MultipartFile imageFile) {
        filesManager.removeImage(entity.getId().toString(), folderName);
        return createImage(entity, imageFile);
    }

    @Transactional
    public void deleteImage(E entity) {
        ID entityId = entity.getId();
        filesManager.removeImage(entityId.toString(), folderName);
        repository.updateImage(null, entityId);
    }
}
