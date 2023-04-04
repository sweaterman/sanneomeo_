import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@app/hooks';
import { setRountingTrailKey } from '@features/trail/routingTrailSlice';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';
import like_selected from '@assets/images/like_selected.png';
import like_unselected from '@assets/images/like_unselected.png';

function RecomLikeTrail(props: { data: Trail[] }) {
  const { data } = props;

  // 등산로 페이지 이동 시, 클릭한 등산로 기본으로 선택되게
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const moveToDetail = (trailSeq: number, mountainSeq: string) => {
    dispatch(setRountingTrailKey(trailSeq));
    navigate(`/mountain/detail/${mountainSeq}`);
  };

  return (
    <div className="recomLikeTrail-component">
      <div>등산로 컴포넌트</div>

      {/* 등산로들 */}
      <div className="trail-list">
        {data &&
          data.map((singleTrail) => (
            // 하나의 등산로
            // eslint-disable-next-line react/jsx-key
            <div className="single-trail">
              {/* 이름 */}
              <div
                onClick={() =>
                  moveToDetail(singleTrail.sequence, singleTrail.mountainSeq)
                }
                onKeyDown={() =>
                  moveToDetail(singleTrail.sequence, singleTrail.mountainSeq)
                }
                role="presentation"
              >
                {singleTrail.name}
              </div>

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

              {/* 시간 */}
              <div>{singleTrail.time}분</div>

              {/* km */}
              <div>{singleTrail.length}km</div>

              {/* 찜 여부 */}
              {singleTrail.isLike ? (
                <img src={like_selected} alt="찜" />
              ) : (
                <img src={like_unselected} alt="안찜" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecomLikeTrail;
