import MascottMain from '@components/main/MascottMain';
import React from 'react';
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

function RecomQuestion() {
  const submitHandler = (event: any) => {
    event?.preventDefault();
  };
  return (
    // 선택된 이미지로 submit 구현하기
    <div>
      <MascottMain />
      <form onSubmit={submitHandler}>
        <div className="level-text">본인의 등산레벨은?</div>
        <div className="level-question">
          <div className="select-circle">
            <img src={lowLevel} alt="low" />
            <div>동산</div>
          </div>
          <div className="select-circle">
            <img src={midLevel} alt="mid" />
            <div>관악산</div>
          </div>
          <div className="select-circle">
            <img src={highLevel} alt="high" />
            <div>한라산</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="like-text">등산지역 선호도</div>
        <div className="like-question">
          <div className="select-circle">
            <img src={narrow} alt="narrow" />
            <div>집 주변</div>
          </div>
          <div className="select-circle">
            <img src={broad} alt="broad" />
            <div>전국</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="purpose-text">등산 목적</div>
        <div className="purpose-question">
          <div className="select-circle">
            <img src={healing} alt="healing" />
            <div>힐링</div>
          </div>
          <div className="select-circle">
            <img src={challenge} alt="challenge" />
            <div>도전</div>
          </div>
        </div>
        <br />
        <hr />
        <div className="time-text">원하는 등반시간</div>
        <div className="time-question">
          <div className="select-time">
            <img src={under3} alt="under3" />
            <div>3시간 이내</div>
          </div>
          <div className="select-time">
            <img src={under5} alt="under5" />
            <div>3시간 이상 5시간 이내</div>
          </div>
          <div className="select-time">
            <img src={under7} alt="under7" />
            <div>5시간 이상 7시간 이내</div>
          </div>
          <div className="select-time">
            <img src={under10} alt="under10" />
            <div>7시간 이상 10시간 이내</div>
          </div>
          <div className="select-time">
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
