import React, { useState } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';

function UploadPhoto() {
  const [enteredDate, setEnteredDate] = useState('');

  const dateChangeHandler = (event: any) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    const expenseData = {
      date: new Date(enteredDate),
    };

    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <RiArrowGoBackFill />
      <hr />
      <div className="preview">미리보기</div>
      <div className="map">맵들어갈자리</div>
      <div className="calendar">
        <label>등반일자</label>
        <input
          type="date"
          min="2014-01-01"
          max="2024-12-31"
          value={enteredDate}
          onChange={dateChangeHandler}
        />
      </div>
      <div className="submit-button">
        <button type="submit">여기로 업로드!</button>
      </div>
    </form>
  );
}

export default UploadPhoto;
