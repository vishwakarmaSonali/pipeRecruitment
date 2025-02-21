import React, { useState } from "react";
import "./index.css";
import { Menu } from "@mui/material";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import HtmlViewComponent from "../common/HtmlViewComponent";

const CandidateDescription = ({ label, data }) => {
  const [collapse, setCollapse] = useState(true);
  const [description, setDescription] = useState("");

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
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
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          {true ? (
            <div
              className="flex-1 display-flex align-center"
              style={{ gap: 8 }}
            >
              <div className="flex-1">
                <HtmlViewComponent
                  value={description}
                  onChange={setDescription}
                  placeholder={"Add Description"}
                />
              </div>
              <div
                className="display-flex"
                style={{ gap: 8, alignSelf: "flex-start" }}
              >
                <button>
                  <CancleIcon />
                </button>
                <button>
                  <RightIcon />
                </button>
              </div>
            </div>
          ) : (
            <div
              className="display-flex candidate-experince-item"
              style={{ gap: 8 }}
            >
              <p className="font-14-regular color-dark-black">
                A creative and user-focused UI/UX Designer with 3+ years of
                experience in crafting intuitive digital experiences. Adept at
                creating wireframes, prototypes, and high-fidelity designs for
                web and mobile applications. Skilled in translating business
                goals and user needs into functional and visually appealing
                interfaces. Priya is known for her strong attention to detail,
                collaborative approach, and ability to deliver innovative design
                solutions.
              </p>
              <button
                className="edit-details-btn"
                style={{ alignSelf: "flex-start" }}
              >
                <EditIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateDescription;
