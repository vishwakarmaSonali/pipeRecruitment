import React from "react";
import "./index.css";

const CandidateNoteComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        {title}
      </p>
      <div className="divider-line" />
      <div
        className="font-14-regular"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
    </div>
  );
};

export default CandidateNoteComponent;
