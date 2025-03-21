import React, { useState } from "react";
import { icons } from "../../helpers/config";
import { ReactComponent as DashIcon } from "../../assets/icons/dash.svg";

import {
  formatCustomDate,
  formatDate,
  formatPhoneNumber,
} from "../../helpers/utils";
import getSymbolFromCurrency from "currency-symbol-map";

const CandidateOverviewDetails = ({ details, label, rawData }) => {
  const [fields, setFields] = useState(details);

  const renderItemValue = (key, value) => {
    if (value?.fe_input_type === "date-time") {
      return formatCustomDate(value?.value);
    } else if (value?.fe_input_type === "date") {
      return formatDate(value?.value);
    } else if (key === "Phone Number") {
      return (
        rawData?.country_code && `(${rawData?.country_code}) ${rawData?.phone}`
      );
    } else if (value?.fe_input_type === "salary_input") {
      if (value?.name === "current_salary") {
        return `${
          !!rawData?.current_salary_currency &&
          getSymbolFromCurrency(rawData?.current_salary_currency)
        } ${value?.value}`;
      } else {
        return `${
          !!rawData?.expected_salary_currency &&
          getSymbolFromCurrency(rawData?.expected_salary_currency)
        } ${value?.value}`;
      }
    } else {
      return value?.value;
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
                    {value?.value?.map((item) => {
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
    } else if (value?.fe_input_type === "toggle") {
      return;
    } else if (key === "Social Links") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            <div className="display-flex" style={{ flexWrap: "wrap", gap: 6 }}>
              {value?.value?.map((item, index) => (
                <a
                  key={index}
                  href={item?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-item font-14-regular color-dark-black"
                >
                  {icons[item?.name]}
                  <span>{item?.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (key === "Languages") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-1">
            <div className="flex-1 display-flex-justify">
              <div
                className="display-flex"
                style={{ flexWrap: "wrap", gap: 6 }}
              >
                {value?.value ? (
                  value?.value?.map((item) => {
                    return (
                      <div className="selected-options-item font-14-regular color-dark-black">
                        {item?.name}
                      </div>
                    );
                  })
                ) : (
                  <DashIcon />
                )}
              </div>
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
                {value?.value ? (
                  <span className="font-14-regular color-dark-blak ">
                    {renderItemValue(key, value)}
                  </span>
                ) : (
                  <DashIcon />
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
