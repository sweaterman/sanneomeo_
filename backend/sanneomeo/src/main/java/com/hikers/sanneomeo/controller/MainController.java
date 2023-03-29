package com.hikers.sanneomeo.controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.dto.response.WeatherResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.spring.web.json.Json;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/main")
public class MainController {
    @Autowired
    private YmlConfig ymlConfig;

    @Autowired
    private MainService mainService;

    @GetMapping("weather/location")
    public BaseResponseDto<List<WeatherResponseDto>> getWeekWeather(@RequestParam String lat, @RequestParam String lon) {
        String result = "";

        String appid = ymlConfig.getWeatherServiceKey();
        String url_path = ymlConfig.getWeatherEndPoint(); // http://api.openweathermap.org/data/2.5/forecast ? lat & lon & appid
        String sb = url_path + "?" + "lat=" + lat + "&lon=" + lon + "&appid=" + appid +
                "&units=metric&lang=kr"; // 섭씨온도, korean
        url_path = sb;
        System.out.println(url_path);
        try {
            URL url = new URL(url_path);
            BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream()));
            result = br.readLine();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // responseDTO 에 담아야함
        JsonObject jsonObj = (JsonObject) JsonParser.parseString(result);
        JsonArray weatherArray = (JsonArray) jsonObj.get("list"); // 3시간 간격의 5일치 데이터 : 총 40개

        String[] dayOfWeek = {"일", "월", "화", "수", "목", "금", "토"};
        LocalDate now = LocalDate.now(); // api 요청 시간 기준으로 5일치 날짜 response
        int dayOfWeekValue = now.getDayOfWeek().getValue();
        int dayOfMonth = now.getDayOfMonth();
        List<WeatherResponseDto> weeklyWeather = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            WeatherResponseDto dayDto = new WeatherResponseDto(dayOfWeek[(dayOfWeekValue + i) % 7], dayOfMonth + i); // 객체 생성
            JsonObject dayWeather = (JsonObject) weatherArray.get(i * 8); // 하루 초기화
            JsonObject mainObj = (JsonObject) dayWeather.get("main"); // main에 3시간 기준의 min, max 온도 있음
            double minOfDay = Double.parseDouble(String.valueOf(mainObj.get("temp_min")));
            double maxOfDay = Double.parseDouble(String.valueOf(mainObj.get("temp_max")));
            for(int j=1; j<8; j++) { // 하루의 최저온도 최대온도 계산
                JsonObject obj = (JsonObject) weatherArray.get(i * 8 + j);
                JsonObject main = (JsonObject) obj.get("main");
                double min = Double.parseDouble(String.valueOf(main.get("temp_min")));
                if(min < minOfDay) minOfDay = min;
                double max = Double.parseDouble(String.valueOf(main.get("temp_max")));
                if(max > maxOfDay) maxOfDay = max;
            }
            dayDto.setMin(minOfDay);
            dayDto.setMax(maxOfDay);
            JsonArray weather = (JsonArray) dayWeather.get("weather");
            JsonObject weatherObj = (JsonObject) weather.get(0);
            dayDto.setDescription(weatherObj.get("icon").getAsString());
            weeklyWeather.add(dayDto);
        }
        return new BaseResponseDto<>(weeklyWeather);
    }

    @GetMapping("/season")
    public BaseResponseDto<Map<String, Object>> seasonList() {
        try {
            return new BaseResponseDto<>(mainService.seasonInfo());
        } catch (Exception e) {
            if (e instanceof BaseException) {
                throw e;
            } else {
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }
}
