import React from "react";

const CommonTextInput = ({
  type,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  error,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`common-input-field ${error && "error-common-input"}`}
    />
  );
};

export default CommonTextInput;
