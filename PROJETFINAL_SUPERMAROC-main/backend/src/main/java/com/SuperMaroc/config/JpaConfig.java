package com.SuperMaroc.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages = "com.SuperMaroc.repository")
@EntityScan(basePackages = "com.SuperMaroc.model")
public class JpaConfig {
}
