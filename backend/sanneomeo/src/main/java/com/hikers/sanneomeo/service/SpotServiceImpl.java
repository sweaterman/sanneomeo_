package com.hikers.sanneomeo.service;


import com.hikers.sanneomeo.dto.response.LocationResponseDto;
import com.hikers.sanneomeo.dto.response.MountainSpotResponseDto;
import com.hikers.sanneomeo.dto.response.PathResponseDto;
import com.hikers.sanneomeo.dto.response.SpotResponseDto;
import com.hikers.sanneomeo.exception.BaseException;
import com.hikers.sanneomeo.exception.BaseResponseStatus;
import com.hikers.sanneomeo.repository.CourseRepository;
import com.hikers.sanneomeo.repository.MountainSpotRepository;
import com.hikers.sanneomeo.repository.TrailPathRepository;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@Transactional
@RequiredArgsConstructor
public class SpotServiceImpl implements SpotService {

  private final MountainSpotRepository mountainSpotRepository;
  private final TrailPathRepository trailPathRepository;
  private final CourseRepository courseRepository;

  @Override
  public MountainSpotResponseDto getSpotsByMountainSequence(Long sequence) {
    MountainSpotResponseDto result = courseRepository.findMountainAndCourseNameBySequence(sequence)
        .orElseThrow(() -> new BaseException(BaseResponseStatus.FAIL,"해당 코스는 없습니다."));
    result.setSpotList(mountainSpotRepository.findSpotsByMountainSequence(sequence));
    return result;
  }

  @Override
  public MountainSpotResponseDto getSpotsByMountainSequenceAndCoordinate(Long sequence,
      BigDecimal latitude, BigDecimal longitude) {
    MountainSpotResponseDto result = courseRepository.findMountainAndCourseNameBySequence(sequence)
        .orElseThrow(() -> new BaseException(BaseResponseStatus.FAIL,"해당 코스는 없습니다."));
    result.setSpotList(mountainSpotRepository.findSpotsByMountainSequenceAndCoordinate(sequence, latitude, longitude));
    return result;
  }

  @Override
  public List<PathResponseDto> getRouteFromCurToSpot(BigDecimal lat, BigDecimal lon,
      Long course, Long spot) {
    List<PathResponseDto> paths =  trailPathRepository.findPathsBySequence(course);
    LocationResponseDto spotLoc = mountainSpotRepository.getSpotInfo(spot).orElseThrow(
        ()-> new BaseException(BaseResponseStatus.FAIL,"해당 스팟을 찾을 수가 없습니다."));

    if(paths.size()<=0) throw new BaseException(BaseResponseStatus.FAIL,"해당 코스의 좌표 데이터가 없습니다.");

    int[] index = getNearIndex(paths,lat,lon,spotLoc.getLatitude(),spotLoc.getLongitude());
    if( index[0] <= index[1]){
      paths = paths.subList(index[0],index[1]+1);
    }else if(index[0] > index[1]){
      paths = paths.subList(index[1],index[0]+1);
      Collections.reverse(paths);
    }

    paths.add(new PathResponseDto(spotLoc.getLatitude(),spotLoc.getLongitude(),null));
    return paths;
  }

  public int[] getNearIndex(List<PathResponseDto> paths, BigDecimal lat1, BigDecimal lon1, BigDecimal lat2, BigDecimal lon2 ){
    int firstIndex = -1,secondIndex = -1;
    double minValue1 = Double.MAX_VALUE,minValue2 = Double.MAX_VALUE;

    for(int i=0;i<paths.size();i++){
      double dist1,dist2;
      dist1 = distance(lat1.doubleValue(),lon1.doubleValue(),
          paths.get(i).getLatitude().doubleValue(),paths.get(i).getLongitude().doubleValue());
      dist2 = distance(lat2.doubleValue(),lon2.doubleValue(),
          paths.get(i).getLatitude().doubleValue(),paths.get(i).getLongitude().doubleValue());

      if( dist1  < minValue1){
        firstIndex=i;
        minValue1 = dist1;
      }
      if( dist2 < minValue2){
        secondIndex=i;
        minValue2 = dist2;
      }
    }
    return  new int[]{firstIndex,secondIndex};
  }

  public double distance(double lat1, double lon1, double lat2, double lon2) {

    double theta = lon1 - lon2;
    double dist =
        Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(
            deg2rad(lat2)) * Math.cos(deg2rad(theta));

    dist = Math.acos(dist);
    dist = rad2deg(dist);
    dist = dist * 60 * 1.1515;

//    if (unit == "kilometer") {
//      dist = dist * 1.609344;
//    } else if (unit == "meter") {
//      dist = dist * 1609.344;
//    }

    return (dist);
  }


  public double deg2rad(double deg) {
    return (deg * Math.PI / 180.0);
  }

  public double rad2deg(double rad) {
    return (rad * 180 / Math.PI);
  }

}
