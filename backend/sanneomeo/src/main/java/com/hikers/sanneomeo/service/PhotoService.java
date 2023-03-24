package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import java.util.List;
import org.springframework.stereotype.Service;


public interface PhotoService {
List<PhotoResponseDto> getPhotosBymountainSequence(Long sequence);
}
