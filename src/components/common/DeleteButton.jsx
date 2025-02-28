import React from "react";
import CommonLoader from "./CommonLoader";

const DeleteButton = ({ onClick, disabled, btnStyle, isLoading,btnTitle }) => {
  return (
    <button
      disabled={disabled}
      className={`common-delete-btn  ${disabled && "disable-common-btn "}`}
      style={btnStyle}
      onClick={onClick}
    >
      {isLoading ? <CommonLoader /> :btnTitle?btnTitle: "Delete"}
    </button>
  );
};

export default DeleteButton;
