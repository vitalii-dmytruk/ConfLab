package com.intelliarts.conflab.config;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter for attaching the CSRF token as a header after successful authentication. Must be applied after {@link
 * SessionManagementFilter}
 */
public class CsrfTokenFilter extends OncePerRequestFilter {
    private static final String CSRF_TOKEN_HEADER_NAME    = "X-CSRF-TOKEN";
    private static final String AUTHORIZATION_HEADER_NAME = "Authorization";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (request.getHeader(AUTHORIZATION_HEADER_NAME) != null) {
            CsrfToken csrf = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
            response.addHeader(CSRF_TOKEN_HEADER_NAME, csrf.getToken());
        }
        filterChain.doFilter(request, response);
    }
}