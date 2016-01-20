package com.intelliarts.conflab.core.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class ImagesRepository {

    @Value("${images.path}")
    private String rootPath;

    public void save(String folderId, MultipartFile file) throws IOException {
        String folderPath = rootPath + "/" + folderId;
        File folder = new File(folderPath);

        if (!(folder.exists() || folder.isDirectory())) {
            folder.mkdir();
        }

        String filePath = folder.getAbsolutePath() + "/" + file.getOriginalFilename();
        File destinationFile = new File(filePath);
        file.transferTo(destinationFile);
    }
}