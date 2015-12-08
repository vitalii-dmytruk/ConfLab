package com.intelliarts.conflab.config;

import com.intelliarts.conflab.security.HasRoleAnnotationSecurityMetadataSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.expression.method.ExpressionBasedAnnotationAttributeFactory;
import org.springframework.security.access.method.MethodSecurityMetadataSource;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig extends GlobalMethodSecurityConfiguration {

    @Override
    protected MethodSecurityMetadataSource customMethodSecurityMetadataSource() {
        ExpressionBasedAnnotationAttributeFactory attributeFactory =
                new ExpressionBasedAnnotationAttributeFactory(getExpressionHandler());
        return new HasRoleAnnotationSecurityMetadataSource(attributeFactory);
    }
}
