import React from "react";
import "./common.css";

const CommonSwitch = ({ on, onToggle }) => {
  return (
    <div
      className={`common-switch flex items-center rounded-full cursor-pointer transition-all duration-300`}
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
