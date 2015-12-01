package com.intelliarts.conflab.core.entity.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Locale;

@Converter
public class LocaleToLanguageConverter implements AttributeConverter<Locale, String> {
    @Override
    public String convertToDatabaseColumn(Locale attribute) {
        return attribute.getLanguage();
    }

    @Override
    public Locale convertToEntityAttribute(String dbData) {
        return new Locale(dbData);
    }
}