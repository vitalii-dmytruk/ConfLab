package com.intelliarts.conflab.core.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

@Component
public class ImagesRepository {

    @Value("${images.path}")
    private String rootPath;

}