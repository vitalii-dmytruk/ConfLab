package com.intelliarts.conflab.core.entity.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Convert;
import java.sql.Date;
import java.time.LocalDate;

@Convert
public class LocalDateConverter implements AttributeConverter<LocalDate, Date> {

    @Override
    public Date convertToDatabaseColumn(LocalDate attribute) {
        if (attribute != null) {
            return Date.valueOf(attribute);
        } else {
            return null;
        }
    }

    @Override
    public LocalDate convertToEntityAttribute(Date dbData) {
        if (dbData != null) {

            return dbData.toLocalDate();
        } else {
            return null;
        }
    }
}