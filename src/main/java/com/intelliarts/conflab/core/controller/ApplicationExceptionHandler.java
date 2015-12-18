package com.intelliarts.conflab.core.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseStatus(value = BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<Object> badRequest(HttpServletRequest req, Exception exception) {
        Map<String, String> responseBody = new LinkedHashMap<>();
        responseBody.put("path", req.getServletPath());
        responseBody.put("message", exception.getMessage());

        return new ResponseEntity<>(responseBody, BAD_REQUEST);
    }
}