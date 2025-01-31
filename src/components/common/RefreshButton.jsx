import React from "react";
import "./common.css";
import { ReactComponent as RefreshIcon } from "../../assets/icons/refreshIcon.svg";

const RefreshButton = ({ onClick }) => {
  return (
    <button className="cancel-btn" style={{ gap: 6 }} onClick={onClick}>
      Refresh <RefreshIcon />
    </button>
  );
};

export default RefreshButton;
