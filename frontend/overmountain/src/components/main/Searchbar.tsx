import React, { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import mapMarker from '@assets/images/map-marker.png';

function Searchbar(props: {
  searchMountainText: string;
  setSearchMountain: any;
  searchList: Array<ElasticMountain>;
  searchResult: any;
}) {
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    if (props.searchList.length > 0) {
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  }, [props.searchList]);

  const getValue = (e: any) => {
    props.setSearchMountain(e.target.value);
  };

  const markerMapHandler = (mountain: ElasticMountain) => {
    console.log(mountain);
    props.searchResult(mountain);
    props.setSearchMountain('');
  };

  const searchContainerClassName = searchPerformed ? 'search-container squared' : 'search-container';

  return (
    <div className="search-bar">
      <div className={searchContainerClassName}>
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
                {/* <img src={mapMarker} className="mountain-address-marker" alt=""></img> */}
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
