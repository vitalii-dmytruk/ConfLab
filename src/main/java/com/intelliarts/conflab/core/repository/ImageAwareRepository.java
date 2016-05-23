package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.entity.ImageAwareEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;

@NoRepositoryBean
public interface ImageAwareRepository<E extends ImageAwareEntity<ID>, ID extends Serializable>
        extends BaseRepository<E, ID> {

    @Modifying
    @Query("update #{#entityName} entity set image=:image where entity.id = :entityId")
    void updateImage(@Param("image") String image, @Param("entityId") ID entityID);

}
