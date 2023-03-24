package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;
import java.net.URL;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private YmlConfig ymlConfig;

    @GetMapping("weather/location")
    public BaseResponseDto<?> getWeekWeather(@RequestParam String lat, @RequestParam String lon) {
        String result = null;
        String appid = ymlConfig.getWeatherServiceKey();
        String url_path = ymlConfig.getWeatherEndPoint(); // http://api.openweathermap.org/data/2.5/forecast ? lat & lon & appid
        System.out.println(appid);

        StringBuilder sb = new StringBuilder();
        sb.append(url_path).append("?").append("lat=").append(lat).append("&lon=").append(lon).append("&appid=").append(appid);

        URL url;
        HttpURLConnection conn = null;

        try {
            url = new URL(sb.toString());
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Cache-Control", "no-cache");
            conn.setRequestProperty("Content-Type", "application/json");
        } catch(Exception e) {

        }

        return null;
    }
}
