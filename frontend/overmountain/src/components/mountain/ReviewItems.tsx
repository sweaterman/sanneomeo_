import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  review,
  getReviewList,
  writeReview,
  deleteReview,
} from '@features/mountain/reviewSlice';

function ReviewItems(props: { mountainSeq: string }) {
  const { mountainSeq } = props;

  // 후기 리스트 받아오기
  const reviewList = useAppSelector(review);
  const getReviewDispatch = useAppDispatch();
  useEffect(() => {
    getReviewDispatch(getReviewList(mountainSeq));
  }, [mountainSeq]);

  // 후기 작성하기 (mountainSeq, content, rate)
  const writeReviewDispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [rate, setRate] = useState(0);
  const writeMyReview = () => {
    if (content === '') {
      alert('내용을 작성해주세요!');
    } else if (rate === 0) {
      alert('평점을 선택해주세요!');
    } else {
      const sendReview = {
        mountainSeq: mountainSeq,
        userSeq: 0,
        content: content,
        rate: rate,
      };
      writeReviewDispatch(writeReview(sendReview));
    }
  };

  // 후기 삭제하기
  const deleteReviewDistpatch = useAppDispatch();
  const deleteMyReview = (reviewNum: number) => {
    console.log(reviewNum);
  };

  return (
    <>
      {/* 후기 리스트 */}
      <div>후기 및 평점</div>
      {reviewList &&
        reviewList.reviewList.map((oneReview) => (
          <div>
            <div>작성자 : {oneReview.nickname}</div>
            <div>
              프로필 이미지:
              <img src={oneReview.profileImage} alt="프로필 이미지" />
            </div>
            <div>평점 : {oneReview.rate}</div>
            <div>날짜 : {oneReview.createdAt}</div>
            <div>내용 : {oneReview.content}</div>
            {oneReview.writer ? (
              <button
                onClick={() => deleteMyReview(oneReview.reviewSeq)}
                onKeyDown={() => deleteMyReview(oneReview.reviewSeq)}
                type="button"
              >
                삭제하기버튼
              </button>
            ) : null}
          </div>
        ))}

      {/* 후기 작성 */}
      <div>
        <form>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => setContent(e.currentTarget.value)}
          />

          <div
            onClick={writeMyReview}
            onKeyDown={writeMyReview}
            role="presentation"
          >
            작성하기
          </div>
        </form>

        <select onChange={(e) => setRate(Number(e.target.value))} value={rate}>
          <option value="1">0.1톤</option>
          <option value="2">0.2톤</option>
          <option value="3">0.3톤</option>
          <option value="4">0.4톤</option>
          <option value="5">0.5톤</option>
        </select>
      </div>
    </>
  );
}

export default ReviewItems;
