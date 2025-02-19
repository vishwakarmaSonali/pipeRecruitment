import React from "react";
import CommonLoader from "./CommonLoader";

const CommonButton = ({ title, onClick, isLoading, disabled, btnStyle }) => {
  return (
    <button
      disabled={disabled}
      className={`common-btn ${disabled && "disable-common-btn "}`}
      style={btnStyle}
      onClick={onClick}
    >
      {isLoading ? <CommonLoader /> : title}
    </button>
  );
};

export default CommonButton;
