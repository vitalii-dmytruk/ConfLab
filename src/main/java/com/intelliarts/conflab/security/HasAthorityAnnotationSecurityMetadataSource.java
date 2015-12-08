package com.intelliarts.conflab.security;


import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.method.AbstractMethodSecurityMetadataSource;
import org.springframework.security.access.prepost.PreInvocationAttribute;
import org.springframework.security.access.prepost.PrePostInvocationAttributeFactory;
import org.springframework.util.ClassUtils;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Collections;

public class HasAthorityAnnotationSecurityMetadataSource extends AbstractMethodSecurityMetadataSource {
    private static final String HAS_ROLE = "hasAuthority('%s')";
    private final PrePostInvocationAttributeFactory attributeFactory;

    public HasAthorityAnnotationSecurityMetadataSource(PrePostInvocationAttributeFactory attributeFactory) {
        this.attributeFactory = attributeFactory;
    }


    public Collection<ConfigAttribute> getAttributes(Method method, Class<?> targetClass) {
        if (method.getDeclaringClass() == Object.class) {
            return Collections.emptyList();
        }

        logger.trace("Looking for HasRole annotations for method '" + method.getName() + "' on target class '" +
                     targetClass + "'");
        HasAuthority hasAuthority = findAnnotation(method, targetClass, HasAuthority.class);

        if (hasAuthority == null) {
            // There is no meta-data so return
            logger.trace("No expression annotations found");
            return Collections.emptyList();
        }
        String hasRoleAttrString = String.format(HAS_ROLE, hasAuthority.role());
        PreInvocationAttribute hasRoleAttr =
                attributeFactory.createPreInvocationAttribute(null, null, hasRoleAttrString);

        return Collections.singletonList(hasRoleAttr);
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    /**
     * See
     * {@link org.springframework.security.access.method.AbstractFallbackMethodSecurityMetadataSource#getAttributes
     * (Method, Class)}
     * for the logic of this method. The ordering here is slightly different in that we
     * consider method-specific annotations on an interface before class-level ones.
     */
    private <A extends Annotation> A findAnnotation(Method method, Class<?> targetClass, Class<A> annotationClass) {
        // The method may be on an interface, but we need attributes from the target
        // class.
        // If the target class is null, the method will be unchanged.
        Method specificMethod = ClassUtils.getMostSpecificMethod(method, targetClass);
        A annotation = AnnotationUtils.findAnnotation(specificMethod, annotationClass);

        if (annotation != null) {
            logger.debug(annotation + " found on specific method: " + specificMethod);
            return annotation;
        }

        // Check the original (e.g. interface) method
        if (specificMethod != method) {
            annotation = AnnotationUtils.findAnnotation(method, annotationClass);

            if (annotation != null) {
                logger.debug(annotation + " found on: " + method);
                return annotation;
            }
        }

        // Check the class-level (note declaringClass, not targetClass, which may not
        // actually implement the method)
        annotation = AnnotationUtils.findAnnotation(specificMethod.getDeclaringClass(), annotationClass);

        if (annotation != null) {
            logger.debug(annotation + " found on: " + specificMethod.getDeclaringClass().getName());
            return annotation;
        }

        return null;
    }
}
