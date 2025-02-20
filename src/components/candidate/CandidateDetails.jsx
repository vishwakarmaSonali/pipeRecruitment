import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import CommonTextInput from "../common/CommonTextInput";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const CandidateDetails = ({ details, label }) => {
  const [fields, setFields] = useState(details);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [collapse, setCollapse] = useState(true);

  const handleEdit = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const handleSave = (key) => {
    setFields({ ...fields, [key]: tempValue });
    setEditField(null);
  };

  const handleCancel = () => {
    setEditField(null);
  };

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex align-center" style={{ gap: 12 }}>
        <h3 className="font-16-medium color-dark-black text-uppercase">
          {label}
        </h3>
        <button
          className={`${
            collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
          }`}
          onClick={() => setCollapse(!collapse)}
        >
          <ArrowIcon />
        </button>
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          <div className="details-container">
            {Object.entries(fields).map(([key, value]) => (
              <div key={key} className="detail-row">
                <p className="font-14-medium color-dark-black flex-1">{key}:</p>
                <div className="flex-2">
                  {editField === key ? (
                    <div
                      className="flex-1 display-flex align-center"
                      style={{ gap: 8 }}
                    >
                      <div className="flex-1">
                        <CommonTextInput
                          type="text"
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                        />
                      </div>
                      <div className="display-flex" style={{ gap: 8 }}>
                        <button onClick={handleCancel}>
                          <CancleIcon />
                        </button>
                        <button onClick={() => handleSave(key)}>
                          <RightIcon />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 display-flex-justify align-center">
                      {!!value ? (
                        <div
                          className="flex-1 display-flex align-center"
                          style={{ gap: 12 }}
                        >
                          <span className="font-14-regular color-dark-blak ">
                            {value}
                          </span>
                          <button
                            className="edit-details-btn"
                            onClick={() => handleEdit(key, value)}
                          >
                            <EditIcon />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="add-details-btn"
                          onClick={() => handleEdit(key, "")}
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateDetails;
