package com.intelliarts.conflab;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.intelliarts.conflab.config.MultipartResolverConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
public class ConfLabApp {

    public static void main(String[] args) {
        SpringApplication.run(ConfLabApp.class, args);
    }

    @Bean
    public ServerProperties serverProperties() {
        return new ServerProperties() {
            @Override
            public void customize(ConfigurableEmbeddedServletContainer container) {
                super.customize(container);
                container.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/404.html"));
            }
        };
    }

    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
        b.findModulesViaServiceLoader(true);
        b.featuresToDisable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return b;
    }

    @Bean
    public CommonsMultipartResolver filterMultipartResolver() {
        return new MultipartResolverConfig();
    }
}