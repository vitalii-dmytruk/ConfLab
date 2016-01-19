package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.repository.ImagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;

@Service
public class ImageService {

    private ImagesRepository imagesRepository;

    @Autowired
    public ImageService(ImagesRepository imagesRepository) {
        this.imagesRepository = imagesRepository;
    }

    public File get(String id) throws FileNotFoundException {
        return imagesRepository.get(id);
    }
}
