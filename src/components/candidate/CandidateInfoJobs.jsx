import React, { useState } from "react";
import "./index.css";
import { Avatar } from "@mui/material";
import { getRandomColor } from "../../helpers/utils";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const CandidateInfoJobs = ({ data }) => {
  const [collapse, setCollapse] = useState(true);
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {"Jobs"}
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
        <button className="add-details-btn">+ Add</button>
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          <div className="display-column" style={{ gap: 12 }}>
            {data?.map((item) => {
              const randomColor = getRandomColor();
              return (
                <div
                  key={item?.id}
                  className="display-flex-justify align-center"
                  style={{ gap: 6 }}
                >
                  <div className="display-flex align-center" style={{ gap: 6 }}>
                    <Avatar
                      src={item?.image || ""}
                      alt={item?.jobName}
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: randomColor,
                        fontSize: 10,
                      }}
                    >
                      {!item.image && item.jobName?.slice(0, 2)}
                    </Avatar>
                    <p className="font-14-regular color-dark-black">
                      {item?.jobName}
                    </p>
                  </div>
                  <div className="display-flex align-center" style={{ gap: 6 }}>
                    <div className="job-type-label">{item?.type}</div>
                    <Avatar
                      src={item?.image || ""}
                      alt={item?.type}
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: randomColor,
                        fontSize: 10,
                      }}
                    >
                      {!item.image && item.type?.slice(0, 2)}
                    </Avatar>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateInfoJobs;
