import React from "react";

const CommonTextInput = ({
  type,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  error,
  onKeyDown, // Accept onKeyDown as a prop
}) => {
  return (
    <div className="display-column" style={{ gap: 6 }}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown} // Handle key events
        className={`common-input ${error && "error-common-input"}`}
      />
      {!!error && <p className="font-12-regular color-error">{error}</p>}
    </div>
  );
};

export default CommonTextInput;
