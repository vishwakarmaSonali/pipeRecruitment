import React from "react";

const DeleteButton = ({ onClick, disabled, btnStyle, isLoading }) => {
  return (
    <button
      disabled={disabled}
      className={`common-delete-btn`}
      style={btnStyle}
      onClick={onClick}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
