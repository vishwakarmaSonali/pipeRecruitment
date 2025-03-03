import React from "react";
import "./index.css";

const CandidateDetailsComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        {title}
      </p>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 8 }}>
        {Object.entries(data).map(([label, data]) => {
          if (!data?.hide && !!data?.value) {
            return (
              <div key={label} className="display-flex">
                <p
                  className="font-12-regular color-dark-black flex-1"
                  style={{ fontWeight: 500 }}
                >
                  {label}
                </p>
                <p
                  className="font-12-regular color-dark-black "
                  style={{ flex: "1.5" }}
                >
                  {data?.value}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CandidateDetailsComponent;
