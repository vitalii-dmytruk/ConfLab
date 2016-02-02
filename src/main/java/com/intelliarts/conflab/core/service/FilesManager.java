package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;

@Service
public class FilesManager {

    private static final String SPEAKER_AVATAR_PATH_TEMPLATE = "avatars/%d";

    @Value("${images.folder.path}")
    private String          filesRootPath;
    @Autowired
    @Qualifier("imagesPathName")
    private String          imagesPathName;
    private FilesRepository filesRepository;

    @Autowired
    public FilesManager(FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
    }

    public String saveSpeakerAvatar(Long speakerId, MultipartFile file) throws IOException {
        validate(file);

        String filePath = getSpeakerAvatarFolderPath(speakerId);
        String fileName = createFileName(file);

        filesRepository.save(filesRootPath + filePath, fileName, file);

        return imagesPathName + filePath + "/" + fileName;
    }

    public void removeIfExist(Long speakerId) {
        File folder = new File(getSpeakerAvatarFolderPath(speakerId));
        if (folder.exists() && folder.isDirectory()) {
            if (folder.listFiles() != null) {
                Arrays.asList(folder.listFiles()).stream().forEach(File::delete);
            }
            folder.delete();
        }
    }

    public String saveCompanyLogo(Long id, MultipartFile imageFile) {
        return "/img/default-logo.png";
    }

    public void removeCompanyLogo(Long id) {

    }

    private String getSpeakerAvatarFolderPath(Long speakerId) {
        return String.format(SPEAKER_AVATAR_PATH_TEMPLATE, speakerId);
    }

    private String createFileName(MultipartFile file) {
        return "avatar." + getFileExpansion(file.getOriginalFilename());
    }

    private void validate(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        if (!fileName.contains(".")) {
            throw new IllegalArgumentException("Files without expansion are not supported.");
        }
        String expansion = getFileExpansion(fileName);
        try {
            SupportedImageTypes.valueOf(expansion.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(String.format("Not supported image expansion: %s.", expansion));
        }
    }

    private String getFileExpansion(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length());
    }

    public enum SupportedImageTypes {
        PNG,
        JPEG,
        JPG,
        GIF
    }
}