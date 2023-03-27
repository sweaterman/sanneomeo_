import React from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="찾아보기"></input>
      <BiSearch size="30" />
    </div>
  );
}

export default Searchbar;
