package com.intelliarts.conflab;

import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@SpringBootApplication
public class ConfLabApp {

    public static void main(String[] args) {
        SpringApplication.run(ConfLabApp.class, args);
    }

    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
        b.findModulesViaServiceLoader(true);
        b.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return b;
    }
}