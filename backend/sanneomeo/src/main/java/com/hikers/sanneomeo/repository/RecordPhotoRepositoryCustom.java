package com.hikers.sanneomeo.repository;

import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.domain.User;
import com.hikers.sanneomeo.dto.response.PhotoResponseDto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordPhotoRepositoryCustom{

  List<PhotoResponseDto> findPhotosBymountainSequence(Long sequence);

  List<RecordPhoto> findRecordPhotoByMonth(Long userSeq, Integer month);
}
