package com.intelliarts.conflab.config;

import com.intelliarts.conflab.security.CsrfTokenFilter;
import com.intelliarts.conflab.security.CsrfTokenExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.access.DelegatingAccessDeniedHandler;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.csrf.CsrfException;
import org.springframework.security.web.session.SessionManagementFilter;

import java.util.LinkedHashMap;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CsrfTokenFilter csrfTokenFilter() throws Exception {
        return new CsrfTokenFilter();
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        LinkedHashMap<Class<? extends AccessDeniedException>, AccessDeniedHandler> handlers = new LinkedHashMap<>();
        handlers.put(CsrfException.class, new CsrfTokenExceptionHandler());
        return new DelegatingAccessDeniedHandler(handlers, new AccessDeniedHandlerImpl());
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        login(http);
        logout(http);
        csrf(http);
        authorizeRequests(http);
        exceptionHandling(http);
    }

    private void login(HttpSecurity http) throws Exception {
        http.httpBasic();
    }

    private void logout(HttpSecurity http) throws Exception {
        http.logout().logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler());
    }

    private void csrf(HttpSecurity http) throws Exception {
        http.csrf()
            .ignoringAntMatchers("/users/current")
            .and()
            .addFilterAfter(csrfTokenFilter(), SessionManagementFilter.class);
    }

    private void authorizeRequests(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/lib/**", "/js/**", "/css/**", "/favicon.ico", "/", "/users/current")
            .permitAll()
            .anyRequest()
            .authenticated();
    }

    private void exceptionHandling(HttpSecurity http) throws Exception {
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());
    }

}