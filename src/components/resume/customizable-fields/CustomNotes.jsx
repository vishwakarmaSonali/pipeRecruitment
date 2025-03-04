import React, { useState, useEffect } from "react";
import "./index.css";
import CommonSwitch from "../../common/CommonSwitch";
import CommonButton from "../../common/CommonButton";
import CancelButton from "../../common/CancelButton";
import { ReactComponent as EditIcon } from "../../../pages/Recruitment/Candidates/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../pages/Recruitment/Candidates/assets/delete.svg";
import HtmlViewComponent from "../../common/HtmlViewComponent";

const CustomNotes = ({ on, onToggle, note, setNote }) => {
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Notes
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>
      <div className="divider-line" />
      <div className="flex-1">
        <HtmlViewComponent
          value={note}
          onChange={setNote}
          placeholder={"Add Note"}
          toolbarId={"t4"}
        />
      </div>
    </div>
  );
};

export default CustomNotes;
