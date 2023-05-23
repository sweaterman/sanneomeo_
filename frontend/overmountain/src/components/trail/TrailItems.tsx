/* eslint-disable import/no-extraneous-dependencies */
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
import { updateTrailKeep } from '@features/trail/trailKeepSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TrailItems(props: { mountainSeq: string }) {
  const { mountainSeq } = props;

  // 산에 해당하는 등산로 리스트 받아오기
  const trailListData = useAppSelector(trailList);
  const trailListDispatch = useAppDispatch();
  useEffect(() => {
    trailListDispatch(getMountainTrailList(mountainSeq));
  }, []);

  // 등산로 선택했을 때, state의 selected key 바꾸기
  const selectedKey = useAppSelector(selectedTrailKey);
  const selectedDispatch = useAppDispatch();

  // 등산로 찜하기
  const keepDispatch = useAppDispatch();
  const keepChange = (checkVal: boolean, trailSeq: number) => {
    if (localStorage.getItem('token') !== null) {
      keepDispatch(updateTrailKeep(trailSeq)).then(() => {
        if (checkVal) {
          toast.success('찜 목록에 추가되었습니다.');
        } else {
          toast.success('찜 목록에서 삭제되었습니다.');
        }
        trailListDispatch(getMountainTrailList(mountainSeq));
      });
    } else {
      toast.error('로그인 먼저 해주세요!');
    }
  };

  return (
    <div className="trailItems-root grid grid-cols-8">
      {/* TrailItems (등산로리스트) 컴포넌트 (내부 스크롤 적용해야함) */}
      <div className="col-span-1" />

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
                  <div> {trail.recommend ? <div>추천!</div> : null}</div>
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
                        onClick={() => keepChange(false, trail.sequence)}
                        onKeyDown={() => keepChange(false, trail.sequence)}
                        role="presentation"
                        src={like_selected}
                        alt="like"
                        height="30"
                        width="30"
                      />
                    ) : (
                      <img
                        onClick={() => keepChange(true, trail.sequence)}
                        onKeyDown={() => keepChange(true, trail.sequence)}
                        role="presentation"
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

      <div className="col-span-1">
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
        />
      </div>
    </div>
  );
}

export default TrailItems;
