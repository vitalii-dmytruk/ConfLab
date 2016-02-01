package com.intelliarts.conflab.core.service;

import com.intelliarts.conflab.core.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class FilesManager {

    private static final String SPEAKER_AVATAR_PATH_TEMPLATE = "avatars/%d";

    @Value("${files.path}")
    private String filesRootPath;

    private FilesRepository filesRepository;

    @Autowired
    public FilesManager(FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
    }

    public String saveSpeakerAvatar(Long speakerId, MultipartFile file) throws IOException {

        String speakerFolderPath = String.format(filesRootPath + SPEAKER_AVATAR_PATH_TEMPLATE, speakerId);

        filesRepository.save(speakerFolderPath, file);

        return speakerFolderPath + "/" + file.getOriginalFilename();
    }

    public void remove(String path) {
        File folder = new File(path);
        if (folder.exists() && folder.isDirectory()) {
            folder.delete();
        }
    }

    private void validate(MultipartFile file) {
    }
}
