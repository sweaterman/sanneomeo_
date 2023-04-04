import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar(props: {
  setSearchMountain: any;
  searchList: Array<ElasticMountain>;
}) {
  // input 값 변경감지하여 mainpage에 반영하는 함수
  const getValue = (e: any) => {
    props.setSearchMountain(e.target.value);
  };

  return (
    <div className="search-bar">
      {/* <div className = "search-title">
        <h1></h1>
      </div> */}
      <div className="search-container">
        <input
          type="search"
          placeholder="등산하고 싶은 산을 찾아보세요!"
          onChange={getValue}
        ></input>
        <BiSearch size="24" />
      </div>
      <ul>
        {props.searchList.map((mountain) => (
          <li className="search-list" key={mountain.sequence}>
            {mountain.name}
            <br />
            {mountain.si} {mountain.gu} {mountain.dong}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Searchbar;
