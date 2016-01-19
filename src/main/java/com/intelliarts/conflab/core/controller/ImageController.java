package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

@RestController
public class ImageController {

    @Autowired
    private ImageService imageService;

    @RequestMapping(value = "/speakers/{id}/image",
                    method = RequestMethod.GET)
    public ResponseEntity<InputStreamResource> create(@PathVariable("id") Long speakerId) {
        try {
            File image = imageService.get(String.valueOf(speakerId));
            InputStreamResource inputStreamResource = new InputStreamResource(new FileInputStream(image));
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(inputStreamResource, httpHeaders, HttpStatus.OK);
        } catch (FileNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}