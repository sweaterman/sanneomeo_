import React, { useState, useEffect } from 'react';
import lowLevel from '@assets/images/question_low.png';
import midLevel from '@assets/images/question_mid.png';
import highLevel from '@assets/images/question_high.png';
import Lottie from 'lottie-react';
import squirrelAnimation from '@assets/lottie/squirrel.json';
import { getRecomTrail } from '@features/commonSlice/recomSlice';

import healing from '@assets/images/question_healing.png';
import challenge from '@assets/images/question_challenge.png';
import under3 from '@assets/images/under3.png';
import under5 from '@assets/images/under5.png';
import under7 from '@assets/images/under7.png';
import under10 from '@assets/images/under10.png';
import over10 from '@assets/images/over10.png';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { putUserInfo, user, getUserInfo } from '@features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RecomQuestion() {
  // 처음 페이지에 들어갔을 때, 스크롤 위치는 최상단
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  // 처음에 유저 데이터 가져오기. (있으면)
  const questionData = useAppSelector(user);
  const userDispatch = useAppDispatch();
  useEffect(() => {
    userDispatch(getUserInfo());
  }, []);

  // 유저 설문상태
  const [userLevel, setUserLevel] = useState(0);
  const [userRegion, setUserRegion] = useState(0);
  const [userPurpose, setUserPurpose] = useState(0);
  const [userTime, setUserTime] = useState(0);

  useEffect(() => {
    if (questionData.result.login && questionData.result.purpose !== 0) {
      setUserLevel(questionData.result.level);
      setUserRegion(questionData.result.region);
      setUserPurpose(questionData.result.purpose);
      setUserTime(questionData.result.time);
    }
  }, [questionData]);

  // 추천 진행하기
  const recomDispatch = useAppDispatch();
  const questionDispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (event: any) => {
    event?.preventDefault();
    // 추천을 보낸다.
    if (
      userLevel !== 0 &&
      userRegion !== 0 &&
      userPurpose !== 0 &&
      userTime !== 0
    ) {
      recomDispatch(
        getRecomTrail({
          level: userLevel,
          region: userRegion,
          purpose: userPurpose,
          time: userTime,
        }),
      );
      // 로그인이 되어있으면 정보 수정
      if (localStorage.getItem('token')) {
        questionDispatch(
          putUserInfo({ userLevel, userRegion, userPurpose, userTime }),
        );
      }
      navigate('/recommend/result');
    } else {
      toast.error('모든 항목을 선택해주세요!');
    }
  };

  return (
    // 선택된 이미지로 submit 구현하기
    <div className="recom-question">
      <div className="recom-banner">
        <div className="recom-title">
          <h1>람쥐의 추천!</h1>
          <span>
            어떤 등산 스타일을 가지고 계신가요?
            <br />
            람쥐가 산을 추천해줄거에요!
          </span>
        </div>
        <Lottie
          style={{ height: 320 }}
          animationData={squirrelAnimation}
          loop={false}
        />
      </div>

      <form onSubmit={submitHandler}>
        <div className="level-text">어느 단계의 산을 원하시나요?</div>
        <div className="level-question">
          <div
            className={
              userLevel === 1 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={() => setUserLevel(1)}
            onKeyDown={() => setUserLevel(1)}
          >
            <img src={lowLevel} alt="low" />
            <div className="question-text">동산</div>
          </div>
          <div
            className={
              userLevel === 2 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={() => setUserLevel(2)}
            onKeyDown={() => setUserLevel(2)}
          >
            <img src={midLevel} alt="mid" />
            <div className="question-text">관악산</div>
          </div>
          <div
            className={
              userLevel === 3 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={() => setUserLevel(3)}
            onKeyDown={() => setUserLevel(3)}
          >
            <img src={highLevel} alt="high" />
            <div className="question-text">한라산</div>
          </div>
        </div>

        <hr />
        <div className="like-text">어디에 있는 산을 가고싶나요?</div>
        <div className="like-question">
          <div
            className={userRegion === 1 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(1)}
            onKeyDown={() => setUserRegion(1)}
          >
            <div>서울</div>
          </div>
          <div
            className={userRegion === 2 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(2)}
            onKeyDown={() => setUserRegion(2)}
          >
            <div>경기</div>
          </div>
          <div
            className={userRegion === 3 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(3)}
            onKeyDown={() => setUserRegion(3)}
          >
            <div>강원</div>
          </div>
          <br />
          <div
            className={userRegion === 4 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(4)}
            onKeyDown={() => setUserRegion(4)}
          >
            <div>충청</div>
          </div>
          <div
            className={userRegion === 5 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(5)}
            onKeyDown={() => setUserRegion(5)}
          >
            <div>전라</div>
          </div>
          <div
            className={userRegion === 6 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(6)}
            onKeyDown={() => setUserRegion(6)}
          >
            <div>경상</div>
          </div>
          <div
            className={userRegion === 7 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setUserRegion(7)}
            onKeyDown={() => setUserRegion(7)}
          >
            <div>제주</div>
          </div>
        </div>
        <hr />
        <div className="purpose-text">등산 목적</div>
        <div className="purpose-question">
          <div
            className={
              userPurpose === 1 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={() => setUserPurpose(1)}
            onKeyDown={() => setUserPurpose(1)}
          >
            <img src={healing} alt="healing" />
            <div className="question-text">힐링</div>
          </div>
          <div
            className={
              userPurpose === 2 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={() => setUserPurpose(2)}
            onKeyDown={() => setUserPurpose(2)}
          >
            <img src={challenge} alt="challenge" />
            <div className="question-text">도전</div>
          </div>
        </div>
        <hr />
        <div className="time-text">원하는 등반시간</div>
        <div className="time-question">
          <div
            className={userTime === 1 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setUserTime(1);
            }}
            onKeyDown={() => {
              setUserTime(1);
            }}
          >
            <img src={under3} alt="under3" />
            <div className="time-specific-text">30분 이내</div>
          </div>
          <div
            className={userTime === 2 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setUserTime(2);
            }}
            onKeyDown={() => {
              setUserTime(2);
            }}
          >
            <img src={under5} alt="under5" />
            <div className="time-specific-text">30분 이상 1시간 이내</div>
          </div>
          <div
            className={userTime === 3 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setUserTime(3);
            }}
            onKeyDown={() => {
              setUserTime(3);
            }}
          >
            <img src={under7} alt="under7" />
            <div className="time-specific-text">1시간 이상 2시간 이내</div>
          </div>
          <div
            className={userTime === 4 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setUserTime(4);
            }}
            onKeyDown={() => {
              setUserTime(4);
            }}
          >
            <img src={under10} alt="under10" />
            <div className="time-specific-text">2시간 이상 3시간 이내</div>
          </div>
          <div
            className={userTime === 5 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setUserTime(5);
            }}
            onKeyDown={() => {
              setUserTime(5);
            }}
          >
            <img src={over10} alt="over10" />
            <div className="time-specific-text">3시간 이상</div>
          </div>
        </div>
        <br />
        <div className="question-finish">
          {/* <div className="finish-text">
            많은 항목에 응답할수록 좋은 추천 결과를 받을 수 있어요!
          </div> */}
          <button className="submit-button" type="submit">
            추천 받으러 가기
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecomQuestion;
