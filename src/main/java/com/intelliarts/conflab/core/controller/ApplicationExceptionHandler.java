package com.intelliarts.conflab.core.controller;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;

@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String MSG_TEMPLATE = "Request parameter '%s' has invalid value '%s'.";

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public void badArguments(HttpServletResponse res, MethodArgumentTypeMismatchException e) throws IOException {
        res.sendError(BAD_REQUEST.value(), String.format(MSG_TEMPLATE, e.getName(), e.getValue()));
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public void invalidArguments(HttpServletResponse res) throws IOException {
        res.sendError(BAD_REQUEST.value());
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    public void constraintViolation(HttpServletResponse response, DataIntegrityViolationException ex)
            throws IOException {
        String message;
        Throwable cause = ex.getCause();
        if (cause instanceof ConstraintViolationException) {
            ConstraintViolationException cEx = (ConstraintViolationException) cause;
            message = "Application already contain sent data (Constraint " + cEx.getConstraintName() + " violates).";
        } else {
            message = ex.getMessage();
        }

        response.sendError(CONFLICT.value(), message);
    }
}