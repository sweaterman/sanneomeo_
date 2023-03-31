import MascottMain from '@components/main/MascottMain';
import React, { useState, useEffect } from 'react';
import lowLevel from '@assets/images/question_low.png';
import midLevel from '@assets/images/question_mid.png';
import highLevel from '@assets/images/question_high.png';
import narrow from '@assets/images/question_narrow.png';
import broad from '@assets/images/question_broad.png';
import healing from '@assets/images/question_healing.png';
import challenge from '@assets/images/question_challenge.png';
import under3 from '@assets/images/under3.png';
import under5 from '@assets/images/under5.png';
import under7 from '@assets/images/under7.png';
import under10 from '@assets/images/under10.png';
import over10 from '@assets/images/over10.png';
import { useAppDispatch, useAppSelector } from '@app/hooks';
import { putUserInfo, user } from '@features/user/userSlice';

function RecomQuestion() {
  const questionData = useAppSelector(user);
  const questionDispatch = useAppDispatch();

  // 유저 설문상태
  const [userLevel, setUserLevel] = useState(0);
  const [userRegion, setUserRegion] = useState(0);
  const [userPurpose, setUserPurpose] = useState(0);
  const [userTime, setUserTime] = useState(0);

  useEffect(() => {}, [userLevel, userRegion, userPurpose, userTime]);

  const setLowHandler = () => {
    setUserLevel(1);
    console.log('low', userLevel);
  };
  const setMidHandler = () => {
    setUserLevel(2);
    console.log('mid', userLevel);
  };
  const setHighHandler = () => {
    setUserLevel(3);
    console.log('high', userLevel);
  };
  const setNarrowHandler = () => {
    setUserRegion(1);
    console.log('narrow', userRegion);
  };
  const setBroadHandler = () => {
    setUserRegion(2);
    console.log('broad', userRegion);
  };

  const setHealingHandler = () => {
    setUserPurpose(1);
    console.log('healing', userPurpose);
  };
  const setChallengeHandler = () => {
    setUserPurpose(2);
    console.log('challenge', userPurpose);
  };
  const setUnder3Handler = () => {
    setUserTime(1);
  };
  const setUnder5Handler = () => {
    setUserTime(2);
  };
  const setUnder7Handler = () => {
    setUserTime(3);
  };
  const setUnder10Handler = () => {
    setUserTime(4);
  };
  const setOver10Handler = () => {
    setUserTime(5);
  };

  const submitHandler = (event: any) => {
    event?.preventDefault();
    questionDispatch(
      putUserInfo({ userLevel, userRegion, userPurpose, userTime }),
    );
  };
  return (
    // 선택된 이미지로 submit 구현하기
    <div>
      <MascottMain />
      <form onSubmit={submitHandler}>
        <div className="level-text">본인의 등산레벨은?</div>
        <div className="level-question">
          <div
            className={
              userLevel === 1 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setLowHandler}
            onKeyDown={setLowHandler}
          >
            <img src={lowLevel} alt="low" />
            <div>동산</div>
          </div>
          <div
            className={
              userLevel === 2 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setMidHandler}
            onKeyDown={setMidHandler}
          >
            <img src={midLevel} alt="mid" />
            <div>관악산</div>
          </div>
          <div
            className={
              userLevel === 3 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setHighHandler}
            onKeyDown={setHighHandler}
          >
            <img src={highLevel} alt="high" />
            <div>한라산</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="like-text">등산지역 선호도</div>
        <div className="like-question">
          <div
            className={
              userRegion === 1 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setNarrowHandler}
            onKeyDown={setNarrowHandler}
          >
            <img src={narrow} alt="narrow" />
            <div>집 주변</div>
          </div>
          <div
            className={
              userRegion === 2 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setBroadHandler}
            onKeyDown={setBroadHandler}
          >
            <img src={broad} alt="broad" />
            <div>전국</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="purpose-text">등산 목적</div>
        <div className="purpose-question">
          <div
            className={
              userPurpose === 1 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setHealingHandler}
            onKeyDown={setHealingHandler}
          >
            <img src={healing} alt="healing" />
            <div>힐링</div>
          </div>
          <div
            className={
              userPurpose === 2 ? 'select-circle active' : 'select-circle'
            }
            role="presentation"
            onClick={setChallengeHandler}
            onKeyDown={setChallengeHandler}
          >
            <img src={challenge} alt="challenge" />
            <div>도전</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="time-text">원하는 등반시간</div>
        <div className="time-question">
          <div
            className={userTime === 1 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={setUnder3Handler}
            onKeyDown={setUnder3Handler}
          >
            <img src={under3} alt="under3" />
            <div>3시간 이내</div>
          </div>
          <div
            className={userTime === 2 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={setUnder5Handler}
            onKeyDown={setUnder5Handler}
          >
            <img src={under5} alt="under5" />
            <div>3시간 이상 5시간 이내</div>
          </div>
          <div
            className={userTime === 3 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={setUnder7Handler}
            onKeyDown={setUnder7Handler}
          >
            <img src={under7} alt="under7" />
            <div>5시간 이상 7시간 이내</div>
          </div>
          <div
            className={userTime === 4 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={setUnder10Handler}
            onKeyDown={setUnder10Handler}
          >
            <img src={under10} alt="under10" />
            <div>7시간 이상 10시간 이내</div>
          </div>
          <div
            className={userTime === 5 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={setOver10Handler}
            onKeyDown={setOver10Handler}
          >
            <img src={over10} alt="over10" />
            <div>10시간 이상</div>
          </div>
        </div>
        <br />
        <div className="question-finish">
          <button className="submit-button" type="submit">
            완료
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecomQuestion;
