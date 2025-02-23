import React from "react";
import "./common.css";
import { ReactComponent as AddIcon } from "../../assets/icons/plusIcon.svg";

const CommonAddButton = ({ title, onClick, btnStyle, disable, icon }) => {
  return (
    <button
      disabled={disable}
      className={`common-add-btn ${disable && "disable-add-btn"}`}
      style={btnStyle}
      onClick={onClick}
    >
      {title}
      {icon}
    </button>
  );
};

export default CommonAddButton;
