package com.intelliarts.conflab.core.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;

@Component
public class ImagesRepository {

    @Value("${images.path}")
    private String imagesFolder;

    public File get(String id) throws FileNotFoundException {
        String path = "images" + "/" + id + ".jpg";
        File file = new File(path);
        if (file.exists() && file.canRead() && file.isFile()) {
            return file;
        } else {
            throw new FileNotFoundException(
                    String.format("Image with identifier '%s' was not found in path '%s'", id, imagesFolder));
        }
    }
}