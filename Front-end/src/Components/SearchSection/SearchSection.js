import React from "react";
import "./SearchSection.css";

const SearchSection = (props) => {
  // console.log(props.handleSearch);
  const handleSearch = props.handleSearch;
  return (
    <div className="d-flex justify-content-center align-items-center search">
      <div className="search-container">
        <input onChange={(event) =>handleSearch(event)} type="text" placeholder="Search..." />
        <button className="searchBtn">Search</button>
      </div>
    </div>
  );
};

export default SearchSection;
