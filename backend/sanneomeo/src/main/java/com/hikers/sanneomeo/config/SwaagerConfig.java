package com.hikers.sanneomeo.config;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.Server;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableWebMvc
@EnableSwagger2
public class SwaagerConfig {

	@Bean
	public Docket api() {
		Server serverLocal = new Server("local", "http://localhost:9090", "for local usages", Collections.emptyList(), Collections.emptyList());
		Server realServer = new Server("test", "https://sanneomeo.site/api", "for testing", Collections.emptyList(), Collections.emptyList());
		return new Docket(DocumentationType.OAS_30)
				.servers(serverLocal,realServer)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.hikers.sanneomeo.controller"))
				.paths(PathSelectors.any())
				.build()
				.apiInfo(apiInfo())
				.securityContexts(Arrays.asList(securityContext()))
				.securitySchemes(Arrays.asList(apiKey()));
	}


	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title("Sanneomeo Swaager")
				.description("Sanneomeo swagger")
				.version("v3")
				.build();
	}

	//전역적인 권한 해제를 위한 authorization api key 설정
	private ApiKey apiKey() {
		return new ApiKey("Authorization", "Authorization", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder()
				.securityReferences(defaultAuth())
				.forPaths(PathSelectors.any())
				.build();
	}
	List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope
				= new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(
				new SecurityReference("Authorization", authorizationScopes));
	}

}
