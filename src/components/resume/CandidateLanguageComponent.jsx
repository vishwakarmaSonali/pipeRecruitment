import React from "react";
import "./index.css";

const CandidateLanguageComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        Language
      </p>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 8 }}>
        {data?.map((item, index) => {
          return (
            <div key={index} className="display-flex">
              <p
                className="font-12-regular color-dark-black flex-1"
                style={{ fontWeight: 500 }}
              >
                {item?.language}
              </p>
              <p
                className="font-12-regular color-dark-black "
                style={{ flex: "1.5" }}
              >
                {item?.proficiency}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateLanguageComponent;
