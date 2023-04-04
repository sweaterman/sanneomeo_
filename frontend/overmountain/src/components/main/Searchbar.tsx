import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar(props: {
  searchMountainText: string;
  setSearchMountain: any;
  searchList: Array<ElasticMountain>;
  searchResult: any;
}) {
  // input 값 변경감지하여 mainpage에 반영하는 함수
  const getValue = (e: any) => {
    props.setSearchMountain(e.target.value);
  };

  const markerMapHandler = (mountain: ElasticMountain) => {
    console.log(mountain);
    props.searchResult(mountain);
    props.setSearchMountain('');
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
          value={props.searchMountainText}
          onChange={getValue}
        ></input>
        <BiSearch size="24" />
        <div className="search-result-container">
          {props.searchList.map((mountain) => (
            <div
              key={mountain.sequence}
              className="result-box"
              role="presentation"
              onClick={() => markerMapHandler(mountain)}
              onKeyDown={() => markerMapHandler(mountain)}
            >
              <div className="mountain-name">{mountain.name}</div>
              <div className="mountain-address">
                {mountain.si} {mountain.gu} {mountain.dong}
              </div>
              <hr style={{ color: 'black' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
