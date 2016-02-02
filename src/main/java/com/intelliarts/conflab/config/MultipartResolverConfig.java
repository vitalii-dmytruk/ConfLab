package com.intelliarts.conflab.config;


import org.springframework.http.HttpMethod;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import javax.servlet.http.HttpServletRequest;

public class MultipartResolverConfig extends StandardServletMultipartResolver {

    private static final String MULTIPART = "multipart/";

    @Override
    public boolean isMultipart(HttpServletRequest request) {
        return request != null && isMultipartContent(request);
    }

    public boolean isMultipartContent(HttpServletRequest request) {
        HttpMethod method = HttpMethod.resolve(request.getMethod().toUpperCase());

        if (HttpMethod.POST == method || HttpMethod.PUT == method) {
            String contentType = request.getContentType();
            return contentType != null && contentType.toLowerCase().startsWith(MULTIPART);
        }

        return false;
    }
}