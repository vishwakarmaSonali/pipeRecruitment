import React from "react";
import "./index.css";

const CandidateEmpoymentComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        {title}
      </p>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 20 }}>
        {data?.map((item, index) => {
          return (
            <div key={index} className="display-column" style={{ gap: 12 }}>
              <div className="display-column" style={{ gap: 4 }}>
                <p
                  className="font-12-regular color-dark-black"
                  style={{ fontWeight: 500 }}
                >
                  {item?.position} at {item?.company}
                </p>
                <p className="font-12-regular color-dark-black">
                  {item?.location}
                </p>
                <p className="font-12-regular color-blue">
                  {item?.startDate} - {item?.endDate}
                </p>
              </div>
              <div
                className="font-12-regular color-grey description-div"
                dangerouslySetInnerHTML={{ __html: item?.description }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateEmpoymentComponent;
