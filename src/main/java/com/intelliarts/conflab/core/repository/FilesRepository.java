package com.intelliarts.conflab.core.repository;

import com.intelliarts.conflab.core.service.FileSystemException;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

@Repository
public class FilesRepository {

    public void save(Path path, MultipartFile multipartFile) {
        try {
            File file = path.toAbsolutePath().toFile();
            createDirectories(file);
            multipartFile.transferTo(file);
        } catch (IOException e) {
            throw new FileSystemException("File is not saved.", e);
        }
    }

    public void remove(Path path) {
        if (path.toFile().exists()) {
            try {
                Files.walkFileTree(path, new DeleteFileVisitor());
            } catch (IOException e) {
                throw new FileSystemException("Speaker avatar is not deleted.", e);
            }
        }
    }

    private void createDirectories(File targetFile) throws IOException {
        File parent = targetFile.getParentFile();
        if (!parent.exists()) {
            Files.createDirectories(parent.toPath());
        }
    }


    private class DeleteFileVisitor extends SimpleFileVisitor<Path> {
        @Override
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
            Files.delete(file);
            return FileVisitResult.CONTINUE;
        }

        @Override
        public FileVisitResult postVisitDirectory(Path dir, IOException e) throws IOException {
            if (e == null) {
                Files.delete(dir);
                return FileVisitResult.CONTINUE;
            } else {
                // directory iteration failed
                throw e;
            }
        }
    }
}