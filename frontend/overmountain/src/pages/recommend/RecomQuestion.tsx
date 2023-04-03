import MascottMain from '@components/main/MascottMain';
import React, { useState, useEffect } from 'react';
import lowLevel from '@assets/images/question_low.png';
import midLevel from '@assets/images/question_mid.png';
import highLevel from '@assets/images/question_high.png';

import { ReactComponent as Seoul } from '@assets/images/Seoul.svg';
import { ReactComponent as Chungcheongbuk_do } from '@assets/images/Chungcheongbuk_do.svg';
import { ReactComponent as Chungcheongnam_do } from '@assets/images/Chungcheongnam_do.svg';
import { ReactComponent as Gangwon_do } from '@assets/images/Gangwon_do.svg';
import { ReactComponent as Gyeonggi_do } from '@assets/images/Gyeonggi_do.svg';
import { ReactComponent as Gyeongsangbuk_do } from '@assets/images/Gyeongsangbuk_do.svg';
import { ReactComponent as Gyeongsangnam_do } from '@assets/images/Gyeongsangnam_do.svg';
import { ReactComponent as Incheon } from '@assets/images/Incheon.svg';
import { ReactComponent as Jeju_do } from '@assets/images/Jeju_do.svg';
import { ReactComponent as Jeollabuk_do } from '@assets/images/Jeollabuk_do.svg';
import { ReactComponent as Jeollanam_do } from '@assets/images/Jeollanam_do.svg';

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
import { useNavigate } from 'react-router-dom';

function RecomQuestion() {
  const navigate = useNavigate();
  // slice 연결
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
  const setRegionHandler = (region: number) => {
    setUserRegion(region);
    console.log('narrow', userRegion);
  };

  const setHealingHandler = () => {
    setUserPurpose(1);
    console.log('healing', userPurpose);
  };
  const setChallengeHandler = () => {
    setUserPurpose(2);
    console.log('challenge', userPurpose);
  };
  const setTimeHandler = (time: number) => {
    setUserTime(time);
  };

  const submitHandler = (event: any) => {
    event?.preventDefault();
    questionDispatch(
      putUserInfo({ userLevel, userRegion, userPurpose, userTime }),
    );
    navigate('/recommend/result');
  };
  // 람쥐설문문구
  const mascottMessage = '람쥐가 추천해줄겡  자유롭게 선택해봐';
  return (
    // 선택된 이미지로 submit 구현하기
    <div>
      <MascottMain balloonText={mascottMessage} />
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
          <div className="korea-map">
            <Seoul className="seoul" />
            <Gyeonggi_do className="gyeonggi" />
            <Incheon className="incheon" />
            <Chungcheongbuk_do className="chungbuk" />
            <Chungcheongnam_do className="chungnam" />
            <Gangwon_do className="gangwon" />
            <Gyeongsangbuk_do className="gyeongbuk" />
            <Gyeongsangnam_do className="gyeongnam" />
            <Jeollabuk_do className="jeonbuk" />
            <Jeollanam_do className="jeonnam" />
            <Jeju_do className="jeju" />
          </div>

          <div
            className={userRegion === 1 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(1)}
            onKeyDown={() => setRegionHandler(1)}
          >
            <div>서울</div>
          </div>
          <div
            className={userRegion === 2 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(2)}
            onKeyDown={() => setRegionHandler(2)}
          >
            <div>경기</div>
          </div>
          <div
            className={userRegion === 3 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(3)}
            onKeyDown={() => setRegionHandler(3)}
          >
            <div>강원</div>
          </div>
          <br />
          <div
            className={userRegion === 4 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(4)}
            onKeyDown={() => setRegionHandler(4)}
          >
            <div>충청</div>
          </div>
          <div
            className={userRegion === 5 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(5)}
            onKeyDown={() => setRegionHandler(5)}
          >
            <div>전라</div>
          </div>
          <div
            className={userRegion === 6 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(6)}
            onKeyDown={() => setRegionHandler(6)}
          >
            <div>경상</div>
          </div>
          <div
            className={userRegion === 7 ? 'select-area active' : 'select-area'}
            role="presentation"
            onClick={() => setRegionHandler(7)}
            onKeyDown={() => setRegionHandler(7)}
          >
            <div>제주</div>
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
            onClick={() => {
              setTimeHandler(1);
            }}
            onKeyDown={() => {
              setTimeHandler(1);
            }}
          >
            <img src={under3} alt="under3" />
            <div>30분 이내</div>
          </div>
          <div
            className={userTime === 2 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setTimeHandler(2);
            }}
            onKeyDown={() => {
              setTimeHandler(2);
            }}
          >
            <img src={under5} alt="under5" />
            <div>30분이상 1시간이내</div>
          </div>
          <div
            className={userTime === 3 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setTimeHandler(3);
            }}
            onKeyDown={() => {
              setTimeHandler(3);
            }}
          >
            <img src={under7} alt="under7" />
            <div>1시간이상 2시간이내</div>
          </div>
          <div
            className={userTime === 4 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setTimeHandler(4);
            }}
            onKeyDown={() => {
              setTimeHandler(4);
            }}
          >
            <img src={under10} alt="under10" />
            <div>2시간이상 3시간이내</div>
          </div>
          <div
            className={userTime === 5 ? 'select-time active' : 'select-time'}
            role="presentation"
            onClick={() => {
              setTimeHandler(5);
            }}
            onKeyDown={() => {
              setTimeHandler(5);
            }}
          >
            <img src={over10} alt="over10" />
            <div>3시간이상</div>
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
