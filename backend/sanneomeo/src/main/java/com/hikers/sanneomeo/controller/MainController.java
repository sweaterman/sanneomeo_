package com.hikers.sanneomeo.controller;

import com.hikers.sanneomeo.config.YmlConfig;
import com.hikers.sanneomeo.dto.response.BaseResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
=======
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.service.MainService;
import io.swagger.annotations.ApiOperation;
import net.bytebuddy.build.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
>>>>>>> 6592214684e4e625bcadfcf33ec83fdc70d16855
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
=======
import java.util.Map;
>>>>>>> 6592214684e4e625bcadfcf33ec83fdc70d16855

@RestController
@RequestMapping("/main")
public class MainController {
<<<<<<< HEAD
    @Autowired
    private YmlConfig ymlConfig;
=======

    @Autowired
    private MainService mainService;

    @GetMapping("weather/location")
    public BaseResponseDto<?> getWeekWeather(@RequestParam String lat, @RequestParam String lon) {
>>>>>>> 6592214684e4e625bcadfcf33ec83fdc70d16855

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

    @GetMapping("/season")
    public BaseResponseDto<Map<String,Object>> seasonList(){
        try{
            return new BaseResponseDto<>(mainService.seasonInfo());
        }catch (Exception e){
            if(e instanceof BaseException){
                throw e;
            }else{
                throw new BaseException(BaseResponseStatus.FAIL);
            }
        }
    }
}
