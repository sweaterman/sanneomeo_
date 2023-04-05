import React, { useEffect } from 'react';
import {
  getUserTrailLike,
  userTrailLike,
} from '@features/user/userTrailLikeSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { setRountingTrailKey } from '@features/trail/routingTrailSlice';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';
import like_selected from '@assets/images/like_selected.png';
import like_unselected from '@assets/images/like_unselected.png';
import { updateTrailKeep } from '@features/trail/trailKeepSlice';
import { toast, ToastContainer } from 'react-toastify';

function UserWishList() {
  // 처음에 찜리스트 받아오기
  const userLikeData = useAppSelector(userTrailLike);
  const userLikeDispatch = useAppDispatch();
  useEffect(() => {
    userLikeDispatch(getUserTrailLike());
  }, []);

  // 등산로 페이지 이동 시, 클릭한 등산로 기본으로 선택되게
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveToDetail = (trailSeq: number, mountainSeq: string) => {
    dispatch(setRountingTrailKey(trailSeq));
    navigate(`/mountain/detail/${mountainSeq}`);
  };

  // 등산로 찜하기
  const keepDispatch = useAppDispatch();
  const keepChange = (checkVal: boolean, trailSeq: number) => {
    keepDispatch(updateTrailKeep(trailSeq)).then(() => {
      if (checkVal) {
        toast.success('찜 목록에 추가되었습니다.');
      } else {
        toast.success('찜 목록에서 삭제되었습니다.');
      }
      userLikeDispatch(getUserTrailLike());
    });
  };

  return (
    <div className="user-wishlist">
      <div className="wish-header">
        <div className="wish-title">
          <h1>내가 찜한 등산로</h1>
          {/* <span>
          찜해놓은 등산로를 확인해봐요!
          </span> */}
        </div>
      </div>

      <div className="recomLikeTrail-component">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
        />

        {/* 등산로들 */}
        <div className="trail-list">
          {userLikeData.result &&
            userLikeData.result.map((singleTrail) => (
              // 하나의 등산로
              // eslint-disable-next-line react/jsx-key
              <div className="single-trail">
                <div className="single-info">
                  <div className="info-name">
                    {/* 이름 */}
                    <div
                      onClick={() =>
                        moveToDetail(
                          singleTrail.sequence,
                          singleTrail.mountainSeq,
                        )
                      }
                      onKeyDown={() =>
                        moveToDetail(
                          singleTrail.sequence,
                          singleTrail.mountainSeq,
                        )
                      }
                      role="presentation"
                    >
                      {singleTrail.name}
                    </div>
                  </div>
                  <div className="info-km-time">
                    {/* km */}
                    <div className="info-km">{singleTrail.length}km</div>
                    {/* 시간 */}
                    <div className="info-time">{singleTrail.time}분 예상</div>
                  </div>
                  <div className="info-difficulty">
                    {/* 난이도 */}
                    {singleTrail.difficulty === '어려움' ? (
                      <div className="difficulty">
                        <img src={mountain_selected} alt="difficulty" />
                        <img src={mountain_selected} alt="difficulty" />
                        <img src={mountain_selected} alt="difficulty" />
                      </div>
                    ) : null}
                    {singleTrail.difficulty === '중간' ? (
                      <div className="difficulty">
                        <img src={mountain_selected} alt="difficulty" />
                        <img src={mountain_selected} alt="difficulty" />
                        <img src={mountain_unselected} alt="difficulty" />
                      </div>
                    ) : null}
                    {singleTrail.difficulty === '쉬움' ? (
                      <div className="difficulty">
                        <img src={mountain_selected} alt="difficulty" />
                        <img src={mountain_unselected} alt="difficulty" />
                        <img src={mountain_unselected} alt="difficulty" />
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* 찜 여부 */}
                <div className="single-islike">
                  {singleTrail.isLike ? (
                    <img
                      onClick={() => keepChange(false, singleTrail.sequence)}
                      onKeyDown={() => keepChange(false, singleTrail.sequence)}
                      role="presentation"
                      src={like_selected}
                      alt="like"
                    />
                  ) : (
                    <img
                      onClick={() => keepChange(true, singleTrail.sequence)}
                      onKeyDown={() => keepChange(true, singleTrail.sequence)}
                      role="presentation"
                      src={like_unselected}
                      alt="unlike"
                    />
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserWishList;
