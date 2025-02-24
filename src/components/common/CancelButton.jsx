import React from "react";

const CancelButton = ({ title, onClick, disabled, btnStyle }) => {
  return (
    <button
      disabled={disabled}
      className={`common-cancel-btn ${disabled && "disable-cancel-btn"}`}
      style={btnStyle}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default CancelButton;
