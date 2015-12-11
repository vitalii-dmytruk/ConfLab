package com.intelliarts.conflab.core.entity.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Locale;

@Converter
public class LocaleToLanguageConverter implements AttributeConverter<Locale, String> {
    @Override
    public String convertToDatabaseColumn(Locale attribute) {
        if (attribute == null) {
            return null;
        } else {
            return attribute.getLanguage();
        }
    }

    @Override
    public Locale convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        } else {
            return new Locale(dbData);
        }
    }
}