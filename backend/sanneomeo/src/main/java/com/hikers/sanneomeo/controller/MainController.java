package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private YmlConfig ymlConfig;

    @GetMapping("weather/location")
    public BaseResponseDto<String> getWeekWeather(@RequestParam String lat, @RequestParam String lon) {
        String result = "";

        String appid = ymlConfig.getWeatherServiceKey();
        String url_path = ymlConfig.getWeatherEndPoint(); // http://api.openweathermap.org/data/2.5/forecast ? lat & lon & appid
        StringBuilder sb = new StringBuilder();
        sb.append(url_path).append("?").append("lat=").append(lat).append("&lon=").append(lon).append("&appid=").append(appid)
                .append("&units=metric&lang=kr"); // 섭씨온도, korean
        url_path = sb.toString();
        System.out.println(url_path);

        try {
            URL url = new URL(url_path);
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
            result = br.readLine();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // responseDTO 에 담아야함
        return new BaseResponseDto<>(result);
    }
}
