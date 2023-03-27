package com.hikers.sanneomeo.service;


import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import com.hikers.sanneomeo.repository.RecordPhotoRepositoryImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName    : com.hikers.sanneomeo.service fileName       : PathServiceImpl author         :
 * SSAFY date           : 2023-03-23 description    :
 * <p>
 * =========================================================== DATE              AUTHOR
 * NOTE -----------------------------------------------------------
 * <p>
 * 2023-03-23        SSAFY       최초 생성
 */
@Service
@Transactional
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

  private final RecordPhotoRepositoryImpl recordPhotoRepositoryImpl;
  @Override
  public List<PhotoResponseDto> getPhotosBymountainSequence(Long sequence) {
    return recordPhotoRepositoryImpl.findPhotosBymountainSequence(sequence);
  }
}
