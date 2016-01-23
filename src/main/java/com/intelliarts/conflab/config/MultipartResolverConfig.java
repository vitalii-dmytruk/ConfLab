package com.intelliarts.conflab.config;


import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;

public class MultipartResolverConfig extends CommonsMultipartResolver {

    private static final String MULTIPART = "multipart/";

    @Override
    public boolean isMultipart(HttpServletRequest request) {
        return request != null && isMultipartContent(request);
    }

    public boolean isMultipartContent(HttpServletRequest request) {
        String method = request.getMethod().toLowerCase();
        String contentType = request.getContentType();

        if (!"post".equals(method) && !"put".equals(method)) {
            return false;
        }

        return contentType != null && contentType.toLowerCase().startsWith(MULTIPART);
    }
}