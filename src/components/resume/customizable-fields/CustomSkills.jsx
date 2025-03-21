import React from "react";
import "./index.css";
import CommonSwitch from "../../common/CommonSwitch";
import { ReactComponent as CloseIcon } from "../../../assets/icons/closeModal.svg";

const CustomSkills = ({ on, onToggle, data, addSkill, removeSkill }) => {
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Skills
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>
      <div className="divider-line" />
      <div className="display-flex" style={{ flexWrap: "wrap", gap: 6 }}>
        {data?.map((item, index) => {
          return (
            <div key={index} className="candidate-info-skill-item">
              {item?.name}{" "}
              {item?.level && (
                <span style={{ color: "#1761D8" }}>{item?.level}</span>
              )}
              <button onClick={() => removeSkill(item?.id, index)}>
                <CloseIcon width={8} height={8} />
              </button>
            </div>
          );
        })}
      </div>
      <button className="add-details-btn" onClick={addSkill}>
        + Add
      </button>
    </div>
  );
};

export default CustomSkills;
