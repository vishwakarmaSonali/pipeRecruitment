import React from "react";

const CommonTextArea = ({
  type,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  error,
}) => {
  return (
    <textarea
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`common-input ${error && "error-common-input"}`}
      style={{ minHeight: 100, resize: "none" }}
    />
  );
};

export default CommonTextArea;
