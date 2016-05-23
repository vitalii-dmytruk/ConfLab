package com.intelliarts.conflab.core.controller;

import com.intelliarts.conflab.core.service.FileSystemException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@ControllerAdvice
public class ApplicationExceptionHandler {

    private static final String MSG_TEMPLATE = "Request parameter '%s' has invalid value '%s'.";

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public void badArguments(HttpServletResponse res, MethodArgumentTypeMismatchException e) throws IOException {
        res.sendError(BAD_REQUEST.value(), String.format(MSG_TEMPLATE, e.getName(), e.getValue()));
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public void handleMethodArgumentNotValidException(HttpServletResponse res, MethodArgumentNotValidException e)
            throws IOException {
        res.sendError(BAD_REQUEST.value(), e.getBindingResult()
                                            .getAllErrors()
                                            .stream()
                                            .map(ObjectError::getDefaultMessage)
                                            .collect(Collectors.joining("\n")));
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public void invalidArguments(HttpServletResponse res) throws IOException {
        res.sendError(BAD_REQUEST.value());
    }

    @ExceptionHandler({FileSystemException.class})
    public void handleFileSystemErrors(HttpServletResponse res, FileSystemException e) throws IOException {
        res.sendError(INTERNAL_SERVER_ERROR.value(), e.getMessage());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public void constraintViolation(HttpServletResponse response, DataIntegrityViolationException ex)
            throws IOException {
        String message;
        Throwable cause = ex.getCause();
        if (cause instanceof ConstraintViolationException) {
            ConstraintViolationException cEx = (ConstraintViolationException) cause;
            message =
                    "Application already contain sent data (Constraint '" + cEx.getConstraintName() + "' is violated).";
        } else {
            message = ex.getMessage();
        }

        response.sendError(CONFLICT.value(), message);
    }
}