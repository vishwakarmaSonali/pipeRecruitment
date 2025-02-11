import React from "react";
import "./common.css";
import { ReactComponent as AddIcon } from "../../assets/icons/plusIcon.svg";

const CommonAddButton = ({ title, onClick, btnStyle }) => {
  return (
    <button className={`common-add-btn`} style={btnStyle} onClick={onClick}>
      {title}
      <AddIcon />
    </button>
  );
};

export default CommonAddButton;
