package com.intelliarts.conflab.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * This class add's CSRF token to response on successful authentication.
 */
@Component
public class CsrfTokenExtender implements AuthenticationSuccessHandler {

    private static final String CSRF_TOKEN_HEADER_NAME = "_csrf";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        response.addHeader(CSRF_TOKEN_HEADER_NAME, csrf.getToken());
    }
}