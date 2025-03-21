import React from "react";
import "./index.css";
import { formatDateMonthYear } from "../../helpers/utils";

const CandidateEmpoymentComponent = ({ title, data }) => {
  return (
    <div className="display-column" style={{ gap: 12 }}>
      <p className="font-14-medium" style={{ fontWeight: 700 }}>
        Employment
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
                  {formatDateMonthYear(item?.start_date)} -{" "}
                  {item?.current
                    ? "Present"
                    : formatDateMonthYear(item?.end_date)}
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
