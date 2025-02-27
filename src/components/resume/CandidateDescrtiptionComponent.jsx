import React from "react";
import "./index.css";

const CandidateDescrtiptionComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        {title}
      </p>
      <div className="divider-line" />
      <p
        className="font-12-regular color-dark-black"
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default CandidateDescrtiptionComponent;
