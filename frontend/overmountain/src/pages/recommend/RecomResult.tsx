import React, { useState, useEffect } from 'react';
import { recomm } from '@features/commonSlice/recomSlice';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { useNavigate } from 'react-router-dom';
import { setRountingTrailKey } from '@features/trail/routingTrailSlice';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';
import like_selected from '@assets/images/like_selected.png';
import like_unselected from '@assets/images/like_unselected.png';
import { updateTrailKeep } from '@features/trail/trailKeepSlice';
import { toast } from 'react-toastify';

function RecomResult() {
  // 처음 페이지에 들어갔을 때, 스크롤 위치는 최상단
  window.scrollTo(0, 0);

  // 등산로 페이지 이동 시, 클릭한 등산로 기본으로 선택되게
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveToDetail = (trailSeq: number, mountainSeq: string) => {
    dispatch(setRountingTrailKey(trailSeq));
    navigate(`/mountain/detail/${mountainSeq}`);
  };

  // 추천 등산로 리스트 가져오기
  const recommData = useAppSelector(recomm);

  // 찜 관련 작업
  const [likeList, setLikeList] = useState<boolean[]>([]);
  useEffect(() => {
    if (!recommData.result.loading) {
      setLikeList([
        recommData.result.target.isLike,
        ...recommData.result.result.map((item) => item.isLike),
      ]);
    }
  }, [recommData]);

  // 등산로 찜하기
  const keepChange = (
    checkVal: boolean,
    trailSeq: number,
    likeIndex: number,
  ) => {
    dispatch(updateTrailKeep(trailSeq)).then(() => {
      if (localStorage.getItem('token')) {
        if (checkVal) {
          toast.success('찜 목록에 추가되었습니다.');
        } else {
          toast.success('찜 목록에서 삭제되었습니다.');
        }
        let newLike = likeList.slice();
        newLike[likeIndex] = !newLike[likeIndex];
        setLikeList(newLike);
      } else {
        toast.error('로그인 먼저 해주세요!');
      }
    });
  };

  return (
    <div className="recom-result">
      {/* 데이터가 로딩 중 일때  */}
      {recommData.result.loading ? (
        <div>데이터 로딩 중</div>
      ) : (
        <div>
          {recommData.result ? (
            <div>
              {/* 타겟 등산로 */}
              <div>추천하는 대표 등산로입니다!</div>
              <div className="target-trail">
                {recommData.result.target.name}
                <div>
                  {likeList[0] ? (
                    <img
                      onClick={() =>
                        keepChange(false, recommData.result.target.sequence, 0)
                      }
                      onKeyDown={() =>
                        keepChange(false, recommData.result.target.sequence, 0)
                      }
                      role="presentation"
                      src={like_selected}
                      alt="like"
                    />
                  ) : (
                    <img
                      onClick={() =>
                        keepChange(true, recommData.result.target.sequence, 0)
                      }
                      onKeyDown={() =>
                        keepChange(true, recommData.result.target.sequence, 0)
                      }
                      role="presentation"
                      src={like_unselected}
                      alt="unlike"
                    />
                  )}
                </div>
              </div>

              <div>위의 등산로를 기준으로 유사한 등산로를 뽑아봤어요.</div>
              <div className="recomLikeTrail-component">
                {/* 등산로 리스트 */}
                <div className="trail-list">
                  {recommData.result.result &&
                    recommData.result.result.map((singleTrail, index) => (
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
                            <div className="info-km">
                              {singleTrail.length}km
                            </div>
                            {/* 시간 */}
                            <div className="info-time">
                              {singleTrail.time}분 예상
                            </div>
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
                                <img
                                  src={mountain_unselected}
                                  alt="difficulty"
                                />
                              </div>
                            ) : null}
                            {singleTrail.difficulty === '쉬움' ? (
                              <div className="difficulty">
                                <img src={mountain_selected} alt="difficulty" />
                                <img
                                  src={mountain_unselected}
                                  alt="difficulty"
                                />
                                <img
                                  src={mountain_unselected}
                                  alt="difficulty"
                                />
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {/* 찜 여부 */}
                        <div className="single-islike">
                          {likeList[index + 1] ? (
                            <img
                              onClick={() =>
                                keepChange(
                                  false,
                                  singleTrail.sequence,
                                  index + 1,
                                )
                              }
                              onKeyDown={() =>
                                keepChange(
                                  false,
                                  singleTrail.sequence,
                                  index + 1,
                                )
                              }
                              role="presentation"
                              src={like_selected}
                              alt="like"
                            />
                          ) : (
                            <img
                              onClick={() =>
                                keepChange(
                                  true,
                                  singleTrail.sequence,
                                  index + 1,
                                )
                              }
                              onKeyDown={() =>
                                keepChange(
                                  true,
                                  singleTrail.sequence,
                                  index + 1,
                                )
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
          ) : (
            // 데이터가 없으면?
            <div>추천 데이터가 존재하지 않습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecomResult;
