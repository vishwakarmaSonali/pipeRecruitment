import React from "react";
import CommonLoader from "./CommonLoader";

const CommonButton = ({
  title,
  onClick,
  isLoading,
  disabled,
  btnStyle,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      className={`common-btn space-x-1 ${disabled && "disable-common-btn "} ${
        icon ? "justify-between" : "justify-center"
      }`}
      style={btnStyle}
      onClick={onClick}
    >
      {isLoading ? <CommonLoader /> : title}
      {icon ? icon : ""}
    </button>
  );
};

export default CommonButton;
