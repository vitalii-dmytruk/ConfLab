package com.intelliarts.conflab.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Value("${images.folder.path}")
    private String filesRootFolder;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(getImagesPathName() + "**").addResourceLocations("file:" + filesRootFolder);
    }

    @Bean(name = "imagesPathName")
    public String getImagesPathName() {
        return "/images/";
    }
}