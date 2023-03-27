import React from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar() {
  return (
    <div className="searchbar">
      <input type="search" placeholder="찾아보기"></input>
      <BiSearch size="24" />
    </div>
  );
}

export default Searchbar;
