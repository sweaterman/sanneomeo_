package com.hikers.sanneomeo.service;

import com.hikers.sanneomeo.domain.Mountain;
import com.hikers.sanneomeo.domain.RecordPhoto;
import com.hikers.sanneomeo.domain.Review;
import com.hikers.sanneomeo.dto.request.UploadImagesRequestDto;
import com.hikers.sanneomeo.dto.request.WriteReviewRequestDto;
import com.hikers.sanneomeo.dto.response.MountainPosResponseDto;
import com.hikers.sanneomeo.dto.response.ReviewResponseDto;
import com.hikers.sanneomeo.repository.MountainRepository;
import com.hikers.sanneomeo.repository.RecordPhotoRepository;
import java.util.List;

import com.hikers.sanneomeo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Service
@Transactional
public class MountainServiceImpl implements MountainService{
    @Autowired
    private MountainRepository mountainRepository;

    @Autowired
    private RecordPhotoRepository recordPhotoRepository;

    @Autowired
    private ReviewRepository  reviewRepository;


    @Transactional
    public boolean createRecordPhotos(UploadImagesRequestDto uploadImagesRequestDto, List<String> uploadImgUrls, Long mountainSeq){
        uploadImgUrls.stream().forEach(
                (uploadImgUrl) -> {
                    RecordPhoto recordPhoto = RecordPhoto.builder()
                            .mountainSeq(mountainSeq)
                            .image(uploadImgUrl)
                            .longitude(uploadImagesRequestDto.getLongitude())
                            .latitude(uploadImagesRequestDto.getLatitude())
                            .userSeq(uploadImagesRequestDto.getUserSeq())
                            .build();

                    recordPhotoRepository.save(recordPhoto);
                }
        );

        return true;
    }

    @Override
    public boolean writeReview(WriteReviewRequestDto writeReviewRequestDto) {
        //dto to entity
        Review review = Review.builder()
                .mountainSeq(writeReviewRequestDto.getMountainSeq())
                .userSeq(writeReviewRequestDto.getUserSeq())
                .content(writeReviewRequestDto.getContent())
                .rate(writeReviewRequestDto.getRate())
                .build();

        //Review 등록
        reviewRepository.save(review);

        return true;
    }

    @Override
    public Optional<MountainPosResponseDto> getPos(String mountainIdx) {
        //산정보
        Mountain mountain = mountainRepository.findByMountainSeq(mountainIdx).get();
        MountainPosResponseDto mountainPosResponseDto = new MountainPosResponseDto(mountain.getName(),mountain.getLatitude(),mountain.getLongitude(),mountain.getLatitude(),mountain.getDifficulty());

        return Optional.of(mountainPosResponseDto);
    }

    @Override
    public List<ReviewResponseDto> reviewList(String mountainIdx) {
        return null;
    }
}



