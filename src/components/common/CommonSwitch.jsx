import React from "react";

const CommonSwitch = ({ on, onToggle }) => {
  return (
    <div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300`}
      style={{ backgroundColor: on ? "#46A13C" : "#D7D7D7" }}
      onClick={onToggle}
    >
      <div
        className={`common-switch-inner ${
          on ? "translate-x-end" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default CommonSwitch;
