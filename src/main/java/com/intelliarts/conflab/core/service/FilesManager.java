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

    private static final String SPEAKER_AVATAR_FOLDER = "avatars";
    private static final String COMPANY_LOGO_FOLDER = "logos";

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

    public String saveSpeakerAvatar(Long speakerId, MultipartFile file) {
        return saveImage(speakerId, file, SPEAKER_AVATAR_FOLDER);
    }

    public void removeSpeakerAvatar(Long speakerId) {
        removeImage(speakerId, SPEAKER_AVATAR_FOLDER);
    }

    public String saveCompanyLogo(Long companyId, MultipartFile imageFile) {
        return saveImage(companyId, imageFile, COMPANY_LOGO_FOLDER);
    }

    public void removeCompanyLogo(Long companyId) {
        removeImage(companyId, COMPANY_LOGO_FOLDER);
    }


    private String saveImage(Long id, MultipartFile file, String folderName) {
        validateImage(file);

        String fileName = createFileName(file);
        Path filePath = getImageFolderPath(id, folderName).resolve(fileName);

        filesRepository.save(resolveImagePath(filePath), file);

        return imagesPathName + filePath;
    }

    private void removeImage(Long speakerId, String folderName) {
        Path relativeImageFolderPath = getImageFolderPath(speakerId, folderName);
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

    private Path getImageFolderPath(Long id, String folderName) {
        Path path = Paths.get(folderName);
        return path.resolve(id.toString());
    }

    public enum SupportedImageTypes {
        PNG,
        JPEG,
        JPG,
        GIF
    }
}