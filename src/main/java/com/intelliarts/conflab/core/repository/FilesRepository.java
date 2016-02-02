package com.intelliarts.conflab.core.repository;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Component
public class FilesRepository {

    public void save(String folderPath, String fileName, MultipartFile file) throws IOException {
        File folder = new File(folderPath);
        if (!(folder.exists() || folder.isDirectory())) {
            folder.mkdirs();
        }

        String filePath = folder.getAbsolutePath() + "/" + fileName;

        file.transferTo(new File(filePath));
    }

    public void remove(String path) {
        File folder = new File(path);
        if (folder.exists() && folder.isDirectory()) {
            folder.delete();
        }
    }
}