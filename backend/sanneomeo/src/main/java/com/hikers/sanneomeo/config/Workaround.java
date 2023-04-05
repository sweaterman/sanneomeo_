package com.hikers.sanneomeo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import java.util.Arrays;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import springfox.documentation.oas.web.OpenApiTransformationContext;
import springfox.documentation.oas.web.WebMvcOpenApiTransformationFilter;
import springfox.documentation.spi.DocumentationType;

@Component
public class Workaround implements WebMvcOpenApiTransformationFilter {

  @Override
  public OpenAPI transform(OpenApiTransformationContext<HttpServletRequest> context) {
    OpenAPI openAPI = context.getSpecification();
    Server localServer = new Server();
    localServer.setDescription("local");
    localServer.setUrl("http://localhost:9090");

    Server realServer = new Server();
    realServer.setDescription("server");
    realServer.setUrl("https://sanneomeo.site/api");
    openAPI.setServers(Arrays.asList(localServer,realServer));
    return openAPI;
  }

  @Override
  public boolean supports(DocumentationType delimiter) {
    return delimiter.equals(DocumentationType.OAS_30);
  }
}
