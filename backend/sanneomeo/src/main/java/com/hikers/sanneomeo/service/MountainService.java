package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.dto.response.MountainPosResponseDto;

import java.util.Optional;

public interface MountainService {

    Optional<MountainPosResponseDto> getPos(String mountainIdx);
}
