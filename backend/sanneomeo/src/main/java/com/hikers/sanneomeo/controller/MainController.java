package com.hikers.sanneomeo.controller;

import io.swagger.annotations.ApiOperation;
import net.bytebuddy.build.Plugin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/main")
public class MainController {
    @GetMapping("weather/location")
    public ResponseEntity<?> getWeekWeather(@RequestParam String level1, @RequestParam String level2, @RequestParam String level3) {

        return null;
    }
}
