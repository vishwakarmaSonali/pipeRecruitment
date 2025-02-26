import React, { useState } from "react";
import { icons } from "../../helpers/config";

import {
  formatCustomDate,
  formatDate,
  formatPhoneNumber,
} from "../../helpers/utils";

const CandidateOverviewDetails = ({ details, label }) => {
  const [fields, setFields] = useState(details);

  const renderItemValue = (key, value) => {
    if (key === "Hired Date") {
      return formatCustomDate(value);
    } else if (
      key === "Start Date" ||
      key === "Probation End Date" ||
      key === "Left Date" ||
      key === "Date of Birth"
    ) {
      return formatDate(value);
    } else if (key === "Phone Number") {
      return formatPhoneNumber(`+${value}`);
    } else {
      return value;
    }
  };

  const renderValues = (key, value) => {
    if (key === "Skills") {
      return (
        <div
          key={key}
          className="detail-row"
          style={{ alignItems: "flex-start" }}
        >
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            <div className="flex-1 display-flex-justify ">
              {!!value && (
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 12 }}
                >
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {value?.map((item) => {
                      return (
                        <div className="candidate-info-skill-item">
                          {item?.name}{" "}
                          <span style={{ color: "#1761D8" }}>
                            {item?.rating}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (typeof value === "boolean") {
      return;
    } else if (key === "Social Links") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            {Object.values(value).some((url) => url) && (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                <div
                  className="display-flex"
                  style={{ flexWrap: "wrap", gap: 6 }}
                >
                  {Object.entries(value)
                    .filter(([_, url]) => url)
                    .map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link-item font-14-regular color-dark-black"
                      >
                        {icons[key]}
                        <span>{key}</span>
                      </a>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else if (key === "Languages") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            <div className="flex-1 display-flex-justify">
              {!!value && (
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 12 }}
                >
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {value?.map((item) => {
                      return (
                        <div className="selected-options-item font-14-regular color-dark-black">
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    } else if (key === "Job") {
      return;
    } else {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            <div className="flex-1 display-flex-justify align-center">
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                {!!value && (
                  <span className="font-14-regular color-dark-blak ">
                    {renderItemValue(key, value)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="candidate-details-main-container">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
        </div>

        <div className="divider-line" />
        <div className="details-container">
          {Object.entries(fields).map(([key, value]) => {
            return !!value && renderValues(key, value);
          })}
        </div>
      </div>
    </>
  );
};

export default CandidateOverviewDetails;
