import React, { useState } from "react";
import "./index.css";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const CandidateLog = () => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex align-center" style={{ gap: 12 }}>
        <h3 className="font-16-medium color-dark-black text-uppercase">
          Candidate Log
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
            <div className="detail-row">
              <p className="font-14-medium color-dark-black flex-1">
                Created date:
              </p>
              <p className="font-14-regular color-dark-black flex-2">
                December 28, 2024 • 1:56 PM
              </p>
            </div>
            <div className="detail-row">
              <p className="font-14-medium color-dark-black flex-1">
                Last updated:
              </p>
              <p className="font-14-regular color-dark-black flex-2">
                December 28, 2024 • 1:56 PM
              </p>
            </div>
            <div className="detail-row">
              <p className="font-14-medium color-dark-black flex-1">
                Created by:
              </p>
              <div
                className="display-flex flex-2 align-center"
                style={{ gap: 6 }}
              >
                <div className="w-h-26">
                  <img src="" className="common-img" />
                </div>
                <p className="font-14-regular color-dark-black flex-1">
                  xBoost
                </p>
              </div>
            </div>
            <div className="detail-row">
              <p className="font-14-medium color-dark-black flex-1">Source:</p>
              <p className="font-14-regular color-dark-black flex-2">
                Scrapped from Sourcing
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateLog;
