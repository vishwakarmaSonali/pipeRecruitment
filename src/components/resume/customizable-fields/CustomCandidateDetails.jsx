import React from "react";
import "./index.css";
import CommonSwitch from "../../common/CommonSwitch";
import PhoneInputComponent from "../../common/PhoneInputComponent";
import CommonTextInput from "../../common/CommonTextInput";
import DropdownWithInput from "../../candidate/StyledDropdownInput";
import CommonDropdown from "../../common/CommonDropdown";
import LocationSearchDropdown from "../../AutocompleteDropdowns/LocationSearchDropDown";

const CustomCandidateDetails = ({ on, onToggle, fields, onChange, onHide }) => {
  const renderEditInput = (key, value) => {
    if (value?.type === "select") {
      return (
        <CommonDropdown
          options={value?.options}
          placeholder="Gender"
          selectedValue={value?.value}
          onChange={(newValue) => onChange(key, "value", newValue)}
          candidateInfo={true}
        />
      );
    } else if (value?.type === "text") {
      return (
        <CommonTextInput
          type="text"
          value={value?.value}
          onChange={(e) => onChange(key, "value", e.target.value)}
        />
      );
    } else {
      return <p>{value?.value}</p>;
    }
  };
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Candidate Details
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>

      <div className="divider-line" />
      <div className="details-container">
        {Object.entries(fields)
          .sort((a, b) => (a[1]?.order || 0) - (b[1]?.order || 0)) // Sort based on order
          .map(([key, value]) => (
            <div key={key} className="detail-row" style={{ gap: 12 }}>
              <p className="font-14-medium color-dark-black flex-1">{key}</p>
              <div className="flex-2">
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 8 }}
                >
                  <div className="flex-1">{renderEditInput(key, value)}</div>
                </div>
              </div>
              <CommonSwitch
                on={!value?.hide}
                onToggle={() => onChange(key, "hide", !value.hide)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomCandidateDetails;
