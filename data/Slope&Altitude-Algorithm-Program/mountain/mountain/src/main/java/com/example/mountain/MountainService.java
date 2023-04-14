package com.example.mountain;

import com.example.mountain.entity.Mountain;
//import com.example.mountain.entity.MountainSpot;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.sun.xml.bind.v2.model.core.ArrayInfo;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class MountainService {

  @Autowired
  final MountainRepository mountainRepository;

//  @Autowired
//  final MountainSpotRepository mountainSpotRepository;

  static GeoApiContext geoApiContext;

  @PostConstruct
  private void init(){
    geoApiContext = new GeoApiContext.Builder()
        .apiKey("AIzaSyCDNueCqNZfkC7ov0eC_W6qK2tO3MY7GQE")
        .build();
  }

  //받은 산림청 등산로 산코드 파일에서 산 코드, 이름, 주소의 가장 마지막(가장 specific한) 부분을 저장한다.
  public void loadData() throws IOException, InvalidFormatException {

        File file = new ClassPathResource("data/MNT_CODE.xlsx").getFile();

        XSSFWorkbook xssfWorkbook = new XSSFWorkbook(file);
        XSSFSheet xssfSheet = xssfWorkbook.getSheetAt(0);

        ArrayList<Mountain> mountains = new ArrayList<>();

        for (int r = 1; r < xssfSheet.getPhysicalNumberOfRows(); r++) {
          XSSFRow xssfRow = xssfSheet.getRow(r);

          String name = xssfRow.getCell(1).getStringCellValue();
          String code = null;

          XSSFCell xssfCell = xssfRow.getCell(3);
          if (xssfCell.getCellType().equals(CellType.NUMERIC)) {
            code = String.valueOf(xssfCell.getNumericCellValue());
          } else if (xssfCell.getCellType().equals(CellType.STRING)) {
            code = xssfCell.getStringCellValue();
          }
          Mountain mountain = new Mountain();

          String[] loc = xssfRow.getCell(2).getStringCellValue().split(" ");

          mountain.setMountainSeq(code);
          mountain.setName(name);
          mountain.setSi(loc[0]);

          if (loc.length >= 2) {
            mountain.setGu(loc[1]);
          }
          if (loc.length >= 3) {
            mountain.setDong(loc[2]);
          }

          try{
            mountainRepository.save(mountain);
          } catch (Exception e){
            mountains.add(mountain);
          }
        }

        for(Mountain m : mountains){
          System.out.println(m);
        }

    }


    //각 산에 대해
    //산 이름과 주소를 가지고 키워드를 검색하여 위도 경도를 뽑아온다.
    @Transactional
    public void getGeoInfo(){
      //모든 mountain 객체를 가져온다.
      List<Mountain> mountainList = mountainRepository.findAll();

      //기본사항
      RestTemplate restTemplate = new RestTemplate();

      HttpHeaders headers = new HttpHeaders();
      headers.set("Authorization", "KakaoAK 86c129f88001cb12d71814a9a8c4cb38");
      HttpEntity<String> httpEntity = new HttpEntity<>(headers);

      String keywordUrl = "https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=1&sort=accuracy&query=";
      String addressUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?";

      for(Mountain m:mountainList){

//        if(m.getLatitude()!=null) continue;

        String key = m.getSi()+" "+m.getGu()+" "+m.getName();
        //검색 -> 위도 경도 알아오기
        ResponseEntity<Map> response = restTemplate.exchange(
            keywordUrl+key,
            HttpMethod.GET,
            httpEntity,
            Map.class);

        ArrayList<LinkedHashMap<String, String>> documents = (ArrayList<LinkedHashMap<String, String>>) response.getBody().get("documents");
        if(documents.size()==0) continue;
        LinkedHashMap<String,String> elements = documents.get(0);

        m.setLatitude(BigDecimal.valueOf(Double.valueOf(elements.get("y"))));
        m.setLongitude(BigDecimal.valueOf(Double.valueOf(elements.get("x"))));

        //위도 경도로 정확한 주소 알아오기
        response = restTemplate.exchange(
            addressUrl+"x="+elements.get("x")+"&y="+elements.get("y"),
            HttpMethod.GET,
            httpEntity,
            Map.class
        );

        documents = (ArrayList<LinkedHashMap<String, String>>) response.getBody().get("documents");
        elements = documents.get(0);

        m.setSi(elements.get("region_1depth_name"));
        m.setGu(elements.get("region_2depth_name"));
        m.setDong(elements.get("region_3depth_name"));

        mountainRepository.save(m);
      }


    }

  //위도 경도를 가지고 주소를 3 depth에 맞춰 가져온다.
  @Transactional
  public void getAddress(){
    //모든 mountain 객체를 가져온다.
    List<Mountain> mountainList = mountainRepository.findAll();

    //기본사항
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.set("Authorization", "KakaoAK 86c129f88001cb12d71814a9a8c4cb38");
    HttpEntity<String> httpEntity = new HttpEntity<>(headers);

    String addressUrl = "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?";

    for(Mountain m:mountainList){


      //검색 -> 위도 경도 알아오기
      ResponseEntity<Map> response = restTemplate.exchange(
          addressUrl+"x="+m.getLongitude()+"&y="+m.getLatitude(),
          HttpMethod.GET,
          httpEntity,
          Map.class
      );

      ArrayList<LinkedHashMap<String, String>> documents = (ArrayList<LinkedHashMap<String, String>>) response.getBody().get("documents");
      LinkedHashMap<String,String> elements = documents.get(0);

      m.setSi(elements.get("region_1depth_name"));
      m.setGu(elements.get("region_2depth_name"));
      m.setDong(elements.get("region_3depth_name"));

      mountainRepository.save(m);
    }


  }


//



    //산림청 산정보 서비스를 통해 각 산의 설명을 뽑아온다
    @Transactional
    public void getDetail() throws IOException {

      //xml이라.. resttemplate 안됨..
      String strUrl = "http://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoOpenAPI2?ServiceKey=%2F4IeoceXaP3kVvOUuUXzALXhUHPMY6vuAaNFXsFxzxamLNDB5Qq2asSZyDO60Vg%2BgAUApgsXIN1ehQqRZKuFcg%3D%3D&numOfRows=5000";

      URL url = new URL(strUrl);
      HttpURLConnection conn = (HttpURLConnection)url.openConnection();

      conn.setRequestProperty("Content-Type","application/xml");
      conn.setRequestMethod("GET");
      conn.connect();

      BufferedReader br = null;
      if(conn.getResponseCode()==200){
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      }


      // 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
      StringBuilder sb = new StringBuilder();
      String line;
      while ((line = br.readLine()) != null) {
        sb.append(line);
      }
      // 객체 해제.
      br.close();
      conn.disconnect();


      // XML형식을 JSON형식으로 변환
      JSONObject json = XML.toJSONObject(sb.toString());

      JSONArray itemList = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONArray("item");
      Iterator<Object> iterator = itemList.iterator();
      while(iterator.hasNext()){
        JSONObject curObj = (JSONObject) iterator.next();

        //seq에 해당하는 산에 설명 넣기
        Mountain m = mountainRepository.findBySeq(String.valueOf(curObj.getInt("mntilistno")));
        if(m==null) continue;

        String detail = curObj.getString("mntidetails");
        if(detail.length()<10) continue;
        //개행문자 제거
        detail = detail.replaceAll("\r", "");

        m.setIntroduction(detail);
        mountainRepository.save(m);
      }

    }

    //이미지 넣어주기
    @Transactional
    public void getImages() throws IOException {

      List<Mountain> mountainList = mountainRepository.findAll();

      for(Mountain m: mountainList){

        //xml이라.. resttemplate 안됨..
        String strUrl = "http://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2?numOfRows=1&ServiceKey=%2F4IeoceXaP3kVvOUuUXzALXhUHPMY6vuAaNFXsFxzxamLNDB5Qq2asSZyDO60Vg%2BgAUApgsXIN1ehQqRZKuFcg%3D%3D&mntiListNo="+m.getMountainSeq();

        URL url = new URL(strUrl);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();

        conn.setRequestProperty("Content-Type","application/xml");
        conn.setRequestMethod("GET");
        conn.connect();

        BufferedReader br = null;
        if(conn.getResponseCode()==200){
          br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        }

        // 저장된 데이터를 라인별로 읽어 StringBuilder 객체로 저장.
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
          sb.append(line);
        }
        // 객체 해제.
        br.close();
        conn.disconnect();

        // XML형식을 JSON형식으로 변환
        JSONObject json = XML.toJSONObject(sb.toString());

        try{
          JSONObject item = json.getJSONObject("response").getJSONObject("body").getJSONObject("items").getJSONObject("item");
          if(item.has("imgfilename")){
            URL imgUrl = new URL("https://www.forest.go.kr/images/data/down/mountain/" + item.getString("imgfilename"));

            InputStream in = null;
            OutputStream out = null;

            //이미지 파일 로컬 저장
              try {
                in = imgUrl.openStream();
                out = new FileOutputStream("C:/tmp/"+item.getString("imgfilename"));

                while(true){
                  //이미지를 읽어온다.
                  int data = in.read();
                  if(data == -1){
                    break;
                  }
                  //이미지를 쓴다.
                  out.write(data);
                }

                in.close();
                out.close();
              } catch (Exception e) {
                e.printStackTrace();
                continue;
              }finally{
                if(in != null){in.close();}
                if(out != null){out.close();}
              }
            }

            m.setPhoto("mountain/"+item.getString("imgfilename"));
            mountainRepository.save(m);

        } catch(Exception e){

        }
      }
  }

  @Transactional
  public void saveRandomImage(){
    String[] randomImgUrls = {
        "mountain/2017-05-04-07-01-06-900x600.jpg",
        "mountain/2017-05-17-09-42-39-900x600.jpg",
        "mountain/2017-05-31-10-42-50-900x600.jpg",
        "mountain/2017-05-31-16-49-36-900x600.jpg",
        "mountain/2017-05-31-19-02-17-900x600.jpg",
        "mountain/2017-05-31-23-19-47-900x600.jpg",
        "mountain/2017-09-12-06-43-29-1100x731.jpg",
        "mountain/2017-09-12-06-44-36-1100x733.jpg",
        "mountain/2017-09-12-06-45-44-1100x696.jpg",
        "mountain/2017-09-12-06-51-50-1100x675 (1).jpg"};

    List<Mountain> mountainList = mountainRepository.findAll();

    for(Mountain m : mountainList){
      if(m.getPhoto()!=null) continue;

      int random = (int)(Math.random()*10);

      m.setPhoto(randomImgUrls[random]);

    }
  }





}
