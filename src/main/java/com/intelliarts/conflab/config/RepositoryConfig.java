package com.intelliarts.conflab.config;

import com.intelliarts.conflab.core.repository.DefaultJpaRepository;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableJpaRepositories(basePackages = "com.intelliarts.conflab.core.repository",
                       repositoryBaseClass = DefaultJpaRepository.class)
@EnableTransactionManagement
public class RepositoryConfig {
}
