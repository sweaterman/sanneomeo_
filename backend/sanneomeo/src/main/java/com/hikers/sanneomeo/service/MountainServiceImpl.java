package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Mountain;
import com.hikers.sanneomeo.dto.response.MountainPosResponseDto;
import com.hikers.sanneomeo.repository.MountainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class MountainServiceImpl implements MountainService{
    @Autowired
    private MountainRepository mountainRepository;

    @Override
        public Optional<MountainPosResponseDto> getPos(String mountainIdx) {
        //산정보
        Mountain mountain = mountainRepository.findByMountainSeq(mountainIdx).get();
        MountainPosResponseDto mountainPosResponseDto = new MountainPosResponseDto(mountain.getName(),mountain.getLatitude(),mountain.getLongitude(),mountain.getLatitude(),mountain.getDifficulty());

        return Optional.of(mountainPosResponseDto);
    }
}
