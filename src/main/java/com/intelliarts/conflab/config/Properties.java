package com.intelliarts.conflab.config;

import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.ErrorPage;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

@Configuration
public class Properties {

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
}