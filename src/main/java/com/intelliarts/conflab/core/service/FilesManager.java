package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FilesManager {

    @Value("${images.folder.path}")
    private String          filesRoot;
    @Autowired
    @Qualifier("imagesPathName")
    private String          imagesPathName;
    private FilesRepository filesRepository;

    @Autowired
    public FilesManager(FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
    }

    public String saveImage(String id, MultipartFile file, String folderName) {
        validateImage(file);

        String fileName = createFileName(file);
        Path filePath = getImageFolderPath(id, folderName).resolve(fileName);

        filesRepository.save(resolveImagePath(filePath), file);

        return imagesPathName + filePath;
    }

    public void removeImage(String id, String folderName) {
        Path relativeImageFolderPath = getImageFolderPath(id, folderName);
        Path absoluteImageFolderPath = resolveImagePath(relativeImageFolderPath);
        filesRepository.remove(absoluteImageFolderPath);
    }

    private void validateImage(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (!fileName.contains(".")) {
            throw new IllegalArgumentException("Files without expansion are not supported.");
        }
        String expansion = getFileExtension(fileName);
        try {
            SupportedImageTypes.valueOf(expansion.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(String.format("Not supported image expansion: %s.", expansion));
        }
    }

    private String createFileName(MultipartFile file) {
        return "image." + getFileExtension(file.getOriginalFilename());
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length());
    }

    private Path resolveImagePath(Path filePath) {
        return Paths.get(filesRoot).resolve(filePath);
    }

    private Path getImageFolderPath(String id, String folderName) {
        Path path = Paths.get(folderName);
        return path.resolve(id);
    }

    public enum SupportedImageTypes {
        PNG,
        JPEG,
        JPG,
        GIF
    }
}