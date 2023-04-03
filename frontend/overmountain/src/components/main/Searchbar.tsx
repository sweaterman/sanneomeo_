import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar(props: {
  setSearchMountain: any;
  searchList: Array<elasticMountain>;
}) {
  // input 값 변경감지하여 mainpage에 반영하는 함수
  const getValue = (e: any) => {
    props.setSearchMountain(e.target.value);
  };

  return (
    <div>
      <div className="searchbar">
        <input type="search" placeholder="찾아보기" onChange={getValue}></input>
        {/* <BiSearch size="24" /> */}
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
