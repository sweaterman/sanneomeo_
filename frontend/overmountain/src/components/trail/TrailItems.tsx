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
import {
  setSelectedTrailKey,
  selectedTrailKey,
} from '@features/trail/selectedTrailSlice';
import { rountingTrailKey } from '@features/trail/routingTrailSlice';

function TrailItems(props: { mountainSeq: string; trailKey: number }) {
  const { mountainSeq, trailKey } = props;

  // 산에 해당하는 등산로 리스트 받아오기
  const trailListData = useAppSelector(trailList);
  const trailListDispatch = useAppDispatch();
  useEffect(() => {
    trailListDispatch(getMountainTrailList(mountainSeq));
  }, []);

  // 등산로 선택했을 때, state의 selected key 바꾸기
  const selectedKey = useAppSelector(selectedTrailKey);
  const selectedDispatch = useAppDispatch();

  // 처음에 페이지에 들어왔을 때, 대표 등산로/추천 등산로 선택된 상태
  const defaultRecomKey = useAppSelector(rountingTrailKey);
  useEffect(() => {
    if (defaultRecomKey.rountingTrailKey !== 0) {
      selectedDispatch(setSelectedTrailKey(defaultRecomKey.rountingTrailKey));
    }
  }, []);

  return (
    <div className="trailItems-root grid grid-cols-8">
      {/* TrailItems (등산로리스트) 컴포넌트 (내부 스크롤 적용해야함) */}
      <div className="col-span-1"></div>

      {/* 하나의 Trail 컴포넌트 */}
      <div className="col-span-6">
        {trailListData &&
          trailListData.result.map((trail) => (
            <div
              className={`grid grid-cols-10 trailItems-singleTrail ${
                selectedKey.selectedTrailKey === trail.sequence
                  ? 'selected'
                  : ''
              }`}
              key={trail.sequence}
            >
              <div
                className="first col-span-6"
                onClick={() =>
                  selectedDispatch(setSelectedTrailKey(trail.sequence))
                }
                onKeyDown={() =>
                  selectedDispatch(setSelectedTrailKey(trail.sequence))
                }
                role="presentation"
              >
                <div className="trail-name">
                  {trail.name.trim().substring(trail.name.indexOf(' ') + 1)}
                </div>
                <div className="trail-etc">{trail.time}분</div>
                <div className="trail-etc">{trail.length}km</div>
              </div>

              <div className="second col-span-4">
                <div className="parent_difficulty">
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

                <div className="parent_like">
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

      <div className="col-span-1"></div>
    </div>
  );
}

export default TrailItems;
