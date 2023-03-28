import React, { useEffect } from 'react';
import mountain_selected from '@assets/images/mountain_selected.png';
import mountain_unselected from '@assets/images/mountain_unselected.png';
import like_selected from '@assets/images/like_selected.png';
import like_unselected from '@assets/images/like_unselected.png';
import { useAppSelector, useAppDispatch } from '@app/hooks';
import {
  getMountainTrailList,
  trailList,
} from '@features/trail/trailListSlice';

function TrailItems(props: { mountainSeq: string }) {
  const { mountainSeq } = props;

  // 산에 해당하는 등산로 리스트 받아오기
  const trailListData = useAppSelector(trailList);
  const trailListDispatch = useAppDispatch();
  useEffect(() => {
    trailListDispatch(getMountainTrailList(mountainSeq));
  }, [trailListDispatch]);

  return (
    <div className="trailItems-root grid grid-cols-12">
      {/* TrailItems (등산로리스트) 컴포넌트 (내부 스크롤 적용해야함) */}
      <div className="col-span-2"></div>

      {/* 하나의 Trail 컴포넌트 */}
      <div className="col-span-8">
        {trailListData &&
          trailListData.result.map((trail) => (
            <div className="trailItems-singleTrail" key={trail.sequence}>
              <div className="first">
                <div className="trail-name">{trail.name}</div>
                <div className="trail-etc">3시간</div>
                <div className="trail-etc">{trail.length}km</div>
              </div>

              <div className="second">
                <div>
                  {trail.difficulty === '어려움' ? (
                    <div className="difficulty">
                      <img src={mountain_selected} alt="difficulty" />
                      <img src={mountain_selected} alt="difficulty" />
                      <img src={mountain_selected} alt="difficulty" />
                    </div>
                  ) : null}
                  {trail.difficulty === '중간' ? (
                    <div className="difficulty">
                      <img src={mountain_selected} alt="difficulty" />
                      <img src={mountain_selected} alt="difficulty" />
                      <img src={mountain_unselected} alt="difficulty" />
                    </div>
                  ) : null}
                  {trail.difficulty === '쉬움' ? (
                    <div className="difficulty">
                      <img src={mountain_selected} alt="difficulty" />
                      <img src={mountain_unselected} alt="difficulty" />
                      <img src={mountain_unselected} alt="difficulty" />
                    </div>
                  ) : null}
                </div>

                <div className="like">
                  <div>
                    {trail.isLike ? (
                      <img
                        src={like_selected}
                        alt="like"
                        height="30"
                        width="30"
                      />
                    ) : (
                      <img
                        src={like_unselected}
                        alt="unlike"
                        height="30"
                        width="30"
                      />
                    )}
                  </div>
                  <div> {trail.keepCount}</div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="col-span-2"></div>
    </div>
  );
}

export default TrailItems;
