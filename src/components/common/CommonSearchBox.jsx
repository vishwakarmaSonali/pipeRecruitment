import React from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";

const CommonSearchBox = ({ value, onChange }) => {
  return (
    <div className="search-box-div">
      <SearchIcon width={16} height={16} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="common-input-field"
      />
    </div>
  );
};

export default CommonSearchBox;
