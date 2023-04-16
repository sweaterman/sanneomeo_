import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  review,
  getReviewList,
  writeReview,
  deleteReview,
} from '@features/mountain/reviewSlice';
import star_full from '@assets/images/star_full.png';
import star_empty from '@assets/images/star_empty.png';
import trash_can from '@assets/images/trash_can.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ReviewItems(props: { mountainSeq: string }) {
  const { mountainSeq } = props;

  // 후기 리스트 받아오기
  const reviewData = useAppSelector(review) || { reviewList: [] };
  const getReviewDispatch = useAppDispatch();
  useEffect(() => {
    getReviewDispatch(getReviewList(mountainSeq));
  }, [mountainSeq]);

  // 후기 작성하기 (mountainSeq, content, rate)
  const writeReviewDispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [rate, setRate] = useState('0');
  const writeMyReview = () => {
    if (localStorage.getItem('token') !== null) {
      if (content === '') {
        toast.error('내용을 작성 해주세요!');
      } else if (rate === '0' || rate === 'none') {
        toast.error('평점을 선택 해주세요!');
      } else {
        const sendReview = {
          mountainSeq: mountainSeq,
          userSeq: 0,
          content: content,
          rate: Number(rate),
        };
        writeReviewDispatch(writeReview(sendReview)).then(() => {
          setContent('');
          setRate('0');
          getReviewDispatch(getReviewList(mountainSeq));
          toast.success('후기가 등록되었습니다.');
        });
      }
    } else {
      toast.error('로그인 먼저 해주세요!');
    }
  };

  // 후기 삭제하기
  const deleteReviewDistpatch = useAppDispatch();
  const deleteMyReview = (reviewNum: number) => {
    deleteReviewDistpatch(deleteReview(reviewNum)).then(() => {
      toast.success('후기가 삭제되었습니다.');
      getReviewDispatch(getReviewList(mountainSeq));
    });
  };

  // 후기 정렬하기 (생성, 삭제 시 후기 정렬다시 최신순 - 기본값)
  // 색깔 관리
  const [colorState, setColor] = useState(0);
  const [tempReviews, setTempReviews] = useState(reviewData.reviewList);
  useEffect(() => {
    // 데이터가 바뀌면 최신 순으로 다시 정렬
    setTempReviews(reviewData.reviewList);
  }, [reviewData]);
  const sortReview = (val: number) => {
    if (val === 0) {
      // 최신 순
      setTempReviews(reviewData.reviewList);
      setColor(0);
    } else if (val === 1) {
      // 별점 높은 순
      const sortedReviews = [...tempReviews].sort((a, b) => b.rate - a.rate);
      setTempReviews(sortedReviews);
      setColor(1);
    } else {
      // 별점 낮은 순
      const sortedReviews = [...tempReviews].sort((a, b) => a.rate - b.rate);
      setTempReviews(sortedReviews);
      setColor(2);
    }
  };

  // 별점 관리
  const clickRadio = (e: any) => {
    setRate(e.target.value);
  };

  return (
    <div className="mountain-reviewItems">
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />

      <div className="review-title">후기</div>

      <div className="review-body">
        <div className="review-list">
          <div className="review-filter">
            <button
              onClick={() => sortReview(0)}
              type="button"
              className={`${colorState === 0 && 'black-button'}`}
            >
              · 최신순
            </button>
            <button
              onClick={() => sortReview(1)}
              type="button"
              className={`${colorState === 1 && 'black-button'}`}
            >
              · 별점 높은 순
            </button>
            <button
              onClick={() => sortReview(2)}
              type="button"
              className={`${colorState === 2 && 'black-button'}`}
            >
              · 별점 낮은 순
            </button>
          </div>

          <hr className="review-hr" />

          {/* 후기 리스트 */}
          {tempReviews &&
            tempReviews.map((oneReview) => (
              // 한 개의 후기
              // eslint-disable-next-line react/jsx-key
              <div className="oneReview">
                <div className="firstline">
                  <div className="userInfo">
                    <img src={oneReview.profileImage} alt="프로필 이미지" />
                    <div className="userName">{oneReview.nickname}</div>
                  </div>
                  <div className="reviewInfo">
                    <div className="star">
                      {(() => {
                        let stars = [];
                        for (let i = 1; i <= 5; i += 1) {
                          if (i <= oneReview.rate) {
                            stars.push(
                              <img key={i} src={star_full} alt="filled star" />,
                            );
                          } else {
                            stars.push(
                              <img key={i} src={star_empty} alt="empty star" />,
                            );
                          }
                        }
                        return stars;
                      })()}
                    </div>

                    <div className="dayTime">
                      {new Date(oneReview.createdAt).toISOString().slice(0, 10)}
                    </div>
                  </div>
                </div>

                <div className="content">{oneReview.content}</div>
                <div className="delete-review">
                  {oneReview.writer ? (
                    <img
                      onClick={() => deleteMyReview(oneReview.reviewSeq)}
                      onKeyDown={() => deleteMyReview(oneReview.reviewSeq)}
                      role="presentation"
                      src={trash_can}
                      alt=""
                    />
                  ) : (
                    <br />
                  )}
                </div>
                <hr className="oneRiveiw-hr" />
              </div>
            ))}
        </div>
      </div>

      {/* 후기 작성 */}
      <div className="write-form">
        <div className="write-button">
          <div className="write-rate">
            <div className="flex items-center">별점</div>
            <form
              className="flex flex-row-reverse justify-end pb-1"
              style={{ fontSize: '20px' }}
            >
              <label htmlFor="score" />
              <input
                onChange={clickRadio}
                type="radio"
                className="peer hidden"
                id="value5"
                value="5"
                name="score"
              />
              <label
                htmlFor="value5"
                className="cursor-pointer text-gray-200 peer-hover:text-yellow-300 peer-checked:text-yellow-300"
              >
                ★
              </label>
              <input
                onChange={clickRadio}
                type="radio"
                className="peer hidden"
                id="value4"
                value="4"
                name="score"
              />
              <label
                htmlFor="value4"
                className="cursor-pointer text-gray-200 peer-hover:text-yellow-300 peer-checked:text-yellow-300"
              >
                ★
              </label>
              <input
                onChange={clickRadio}
                type="radio"
                className="peer hidden"
                id="value3"
                value="3"
                name="score"
              />
              <label
                htmlFor="value3"
                className="cursor-pointer text-gray-200 peer-hover:text-yellow-300 peer-checked:text-yellow-300"
              >
                ★
              </label>
              <input
                onChange={clickRadio}
                type="radio"
                className="peer hidden"
                id="value2"
                value="2"
                name="score"
              />
              <label
                htmlFor="value2"
                className="cursor-pointer text-gray-200 peer-hover:text-yellow-300 peer-checked:text-yellow-300"
              >
                ★
              </label>
              <input
                onChange={clickRadio}
                type="radio"
                className="peer hidden"
                id="value1"
                value="1"
                name="score"
              />
              <label
                htmlFor="value1"
                className="cursor-pointer peer text-gray-200 peer-hover:text-yellow-300 peer-checked:text-yellow-300"
              >
                ★
              </label>
            </form>
          </div>

          <div
            className="submit-button"
            onClick={writeMyReview}
            onKeyDown={writeMyReview}
            role="presentation"
          >
            등록하기
          </div>
        </div>
        <hr className="write-hr" />

        <form className="write-input">
          <textarea
            placeholder="후기를 등록해주세요!"
            className="w-full h-100 resize-none p-2 overflow-y-auto rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => setContent(e.currentTarget.value)}
          />
        </form>
      </div>
    </div>
  );
}

export default ReviewItems;
