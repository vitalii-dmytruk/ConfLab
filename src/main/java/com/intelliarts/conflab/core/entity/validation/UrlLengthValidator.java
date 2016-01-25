package com.intelliarts.conflab.core.entity.validation;

import org.hibernate.validator.internal.util.logging.Log;
import org.hibernate.validator.internal.util.logging.LoggerFactory;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.net.URL;

public class UrlLengthValidator implements ConstraintValidator<UrlLength, URL> {
    private static final Log log = LoggerFactory.make();

    private int min;
    private int max;

    @Override
    public void initialize(UrlLength parameters) {
        min = parameters.min();
        max = parameters.max();
        validateParameters();
    }

    @Override
    public boolean isValid(URL value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        int length = value.toString().length();
        return length >= min && length <= max;
    }

    private void validateParameters() {
        if (min < 0) {
            throw log.getMinCannotBeNegativeException();
        }
        if (max < 0) {
            throw log.getMaxCannotBeNegativeException();
        }
        if (max < min) {
            throw log.getLengthCannotBeNegativeException();
        }
    }
}
