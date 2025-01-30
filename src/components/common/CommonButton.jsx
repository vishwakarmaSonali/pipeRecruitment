import React from "react";

const CommonButton = ({ title, onClick, isLoading, disabled, btnStyle }) => {
  return (
    <button
      disabled={disabled}
      className={`common-btn ${disabled && "disable-common-btn "}`}
      style={btnStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CommonButton;
