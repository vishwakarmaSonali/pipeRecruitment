import React, { useState } from "react";
import "./index.css";
import { Menu } from "@mui/material";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import HtmlViewComponent from "../common/HtmlViewComponent";
import { demoDescriptionText } from "../../helpers/config";

const CandidateDescription = ({ label, data, editable }) => {
  const [collapse, setCollapse] = useState(true);
  const [description, setDescription] = useState(demoDescriptionText);
  const [edit, setEdit] = useState(false);

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
          {editable && (
            <button
              className={`${
                collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
              }`}
              onClick={() => setCollapse(!collapse)}
            >
              <ArrowIcon />
            </button>
          )}
        </div>
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          {edit ? (
            <div
              className="flex-1 display-flex align-center"
              style={{ gap: 8 }}
            >
              <div className="flex-1">
                <HtmlViewComponent
                  value={description}
                  onChange={setDescription}
                  placeholder={"Add Description"}
                  toolbarId={"t1"}
                />
              </div>
              <div
                className="display-flex"
                style={{ gap: 8, alignSelf: "flex-start" }}
              >
                <button
                  onClick={() => {
                    setDescription(demoDescriptionText);
                    setEdit(false);
                  }}
                >
                  <CancleIcon />
                </button>
                <button onClick={() => setEdit(false)}>
                  <RightIcon />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="display-flex candidate-experince-item"
              style={{ gap: 8 }}
            >
              <p
                className="font-14-regular color-dark-black"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
              {editable && (
                <button
                  className="edit-details-btn"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setEdit(true)}
                >
                  <EditIcon />
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateDescription;
