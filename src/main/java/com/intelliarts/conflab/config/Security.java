package com.intelliarts.conflab.config;

import com.intelliarts.conflab.core.service.UserAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserAuthenticationService authenticationService;

    @Autowired
    private CsrfTokenExtender csrfTokenExtender;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authenticationService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin().successHandler(csrfTokenExtender)
            .and()
            .authorizeRequests()
            .antMatchers("/lib/**", "/js/**", "/css/**", "/favicon.ico", "/login", "/logout", "/", "/users/current").permitAll()
            .anyRequest().authenticated()
            .and().csrf().csrfTokenRepository(new HttpSessionCsrfTokenRepository()).ignoringAntMatchers("/login")
                .and()
            .logout().logoutSuccessUrl("/");
    }
}