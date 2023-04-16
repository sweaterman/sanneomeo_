import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

function UserWishList() {
  // 처음 페이지에 들어갔을 때, 스크롤 위치는 최상단
  window.scrollTo(0, 0);

  // 처음에 찜리스트 받아오기
  const userLikeData = useAppSelector(userTrailLike);
  const [likeList, setLikeList] = useState<boolean[]>([]);
  const userLikeDispatch = useAppDispatch();
  useEffect(() => {
    userLikeDispatch(getUserTrailLike());
  }, []);
  useEffect(() => {
    setLikeList(userLikeData.result.map((item) => item.isLike));
  }, [userLikeData.result]);

  // 등산로 페이지 이동 시, 클릭한 등산로 기본으로 선택되게
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveToDetail = (trailSeq: number, mountainSeq: string) => {
    dispatch(setRountingTrailKey(trailSeq));
    navigate(`/mountain/detail/${mountainSeq}`);
  };

  const keepDispatch = useAppDispatch();
  const keepChange = (checkVal: boolean, trailSeq: number, index: number) => {
    keepDispatch(updateTrailKeep(trailSeq)).then(() => {
      if (checkVal) {
        toast.success('찜 목록에 추가되었습니다.');
      } else {
        toast.success('찜 목록에서 삭제되었습니다.');
      }
      let newLike = likeList.slice();
      newLike[index] = !newLike[index];
      setLikeList(newLike);
    });
  };

  return (
    <div className="user-wishlist">
      <div className="wish-header">
        <div className="wish-title">
          <h1>내가 찜한 등산로</h1>
        </div>
      </div>

      <div className="recomLikeTrail-component">
        {/* 등산로들 */}
        <div className="trail-list">
          {userLikeData.result &&
            userLikeData.result.map((singleTrail, index) => (
              // 하나의 등산로
              // eslint-disable-next-line react/jsx-key
              <div className="single-trail" key={singleTrail.sequence}>
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
                  {likeList[index] ? (
                    <img
                      onClick={() =>
                        keepChange(false, singleTrail.sequence, index)
                      }
                      onKeyDown={() =>
                        keepChange(false, singleTrail.sequence, index)
                      }
                      role="presentation"
                      src={like_selected}
                      alt="like"
                    />
                  ) : (
                    <img
                      onClick={() =>
                        keepChange(true, singleTrail.sequence, index)
                      }
                      onKeyDown={() =>
                        keepChange(true, singleTrail.sequence, index)
                      }
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
