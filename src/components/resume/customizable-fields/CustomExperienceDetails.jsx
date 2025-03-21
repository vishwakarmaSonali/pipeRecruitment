import React, { useState, useEffect } from "react";
import "./index.css";
import CommonSwitch from "../../common/CommonSwitch";
import CommonButton from "../../common/CommonButton";
import CancelButton from "../../common/CancelButton";
import { ReactComponent as EditIcon } from "../../../pages/Recruitment/Candidates/assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../pages/Recruitment/Candidates/assets/delete.svg";
import CommonTextInput from "../../common/CommonTextInput";
import MonthYearPicker from "../../MonthYearView";
import HtmlViewComponent from "../../common/HtmlViewComponent";
import LocationSearchDropdown from "../../AutocompleteDropdowns/LocationSearchDropDown";
import { ReactComponent as TickIcon } from "../../../assets/icons/sourcingIcons/tick.svg";
import {
  convertToISODate,
  convertToISOWithNano,
  formatDateMonthYear,
} from "../../../helpers/utils";

const CustomExperienceDetails = ({
  on,
  onToggle,
  addExperience,
  data,
  onDelete,
  onUpdate,
}) => {
  const [addExperienceFieldVisible, setAddExperienceFieldVisible] =
    useState(false);
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [addExperienceBtnDisable, setAddExperienceBtnDisable] = useState(true);

  const resetData = () => {
    setPosition("");
    setCompany("");
    setDescription("");
    setSelectedLocations([]);
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setAddExperienceFieldVisible(false);
    setAddExperienceBtnDisable(true);
    setChecked(false);
    setEditIndex(null);
  };

  const handleAddExperience = () => {
    if (editIndex !== null) {
      // Update existing entry
      const startdate = convertToISODate(startDate);
      const enddate = convertToISODate(endDate);
      onUpdate(editIndex, {
        position: position?.trim(),
        company: company?.trim(),
        location: selectedLocations[0],
        description: description,
        start_date: convertToISOWithNano(startdate),
        end_date: checked ? "Present" : convertToISOWithNano(enddate),
      });
    } else {
      const startdate = convertToISODate(startDate);
      const enddate = convertToISODate(endDate);
      addExperience({
        position: position?.trim(),
        company: company?.trim(),
        location: selectedLocations[0],
        description: description,
        start_date: convertToISOWithNano(startdate),
        end_date: checked ? "Present" : convertToISODate(enddate),
      });
    }
    resetData();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setPosition(data[index]?.position);
    setCompany(data[index]?.company);
    setSelectedLocations(data[index]?.location);
    setDescription(data[index]?.description);
    const startDateFormat = formatDateMonthYear(data[index]?.start_date);
    const splitStartDate = startDateFormat?.split(" ");
    setStartDate({
      month: splitStartDate[0] || "",
      year: splitStartDate[1] || "",
    });

    const endDateFormat = formatDateMonthYear(data[index]?.end_date);
    const splitEndDate = endDateFormat?.split(" ");

    setEndDate(
      data[index]?.current
        ? "Present"
        : {
            month: splitEndDate[0],
            year: splitEndDate[1],
          }
    );
    setAddExperienceFieldVisible(true);
    if (data[index]?.endDate === "Present") {
      setChecked(true);
    }
  };

  const renderAddExperience = () => {
    return (
      <div className="custom-add-language-container">
        <div className="display-column" style={{ gap: 10 }}>
          <div className="display-flex " style={{ gap: 10 }}>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value?.trimStart())}
                placeholder={"Position"}
              />
            </div>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value?.trimStart())}
                placeholder={"Company Name"}
              />
            </div>
          </div>
          <div className="display-flex" style={{ gap: 10 }}>
            <div className="flex-1">
              <LocationSearchDropdown
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                placeholder={"Location"}
              />
            </div>
          </div>
          <div className="display-flex align-center" style={{ gap: 8 }}>
            <div
              className={`candidate-card-checkbox`}
              onClick={() => {
                setChecked(!checked);
                setEndDate({ month: "", year: "" });
              }}
            >
              {checked && <TickIcon />}
            </div>
            <span className="font-14-regular color-dark-black">
              Currently working at this role
            </span>
          </div>

          <div className="display-flex" style={{ gap: 10 }}>
            <div className="flex-1">
              <MonthYearPicker
                label="Start Date"
                onSelect={(date) => {
                  console.log("Start Date Selected:", date);
                  setStartDate(date);
                }}
                month={startDate?.month}
                year={startDate?.year?.toString()}
              />
            </div>
            <div className="flex-1">
              <MonthYearPicker
                label="End Date (expected)"
                onSelect={(date) => setEndDate(date)}
                month={endDate?.month}
                year={endDate?.year?.toString()}
                isCheckedDisable={checked}
              />
            </div>
          </div>
          <div className="flex-1">
            <HtmlViewComponent
              value={description}
              onChange={setDescription}
              placeholder={"Add Description"}
              toolbarId={"t3"}
            />
          </div>
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "flex-end" }}
        >
          <CancelButton title={"Cancel"} onClick={resetData} />
          <CommonButton
            title={editIndex !== null ? "Update" : "Add"}
            onClick={handleAddExperience}
            disabled={addExperienceBtnDisable}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      position?.length > 0 &&
      company?.length > 0 &&
      selectedLocations?.length > 0 &&
      !!startDate?.month &&
      !!startDate?.year
    ) {
      if (checked) {
        setAddExperienceBtnDisable(false);
      } else if (endDate?.month && endDate?.year) {
        setAddExperienceBtnDisable(false);
      } else {
        setAddExperienceBtnDisable(true);
      }
    } else {
      setAddExperienceBtnDisable(true);
    }
  }, [position, company, selectedLocations, startDate, endDate, checked]);

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Experience Details
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 20 }}>
        {data?.map((item, index) => (
          <div key={index} className="display-flex-justify">
            {editIndex === index ? (
              <div className="flex-1">{renderAddExperience()}</div>
            ) : (
              <>
                <div className="display-column" style={{ gap: 8 }}>
                  <p className="font-14-medium color-dark-black">
                    {item?.position} at {item?.company}
                  </p>
                  <p className="font-14-regular color-dark-black">
                    {item?.location}
                  </p>
                  <p className="font-14-regular color-grey">
                    {formatDateMonthYear(item?.start_date)} -{" "}
                    {item?.current
                      ? "Present"
                      : formatDateMonthYear(item?.end_date)}
                  </p>
                </div>
                <div
                  className="display-flex"
                  style={{ gap: 8, alignSelf: "flex-start" }}
                >
                  <button onClick={() => onDelete(index)}>
                    <DeleteIcon />
                  </button>
                  <button onClick={() => handleEdit(index)}>
                    <EditIcon />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {addExperienceFieldVisible &&
          editIndex === null &&
          renderAddExperience()}
        {!addExperienceFieldVisible && (
          <button
            className="add-details-btn"
            onClick={() => setAddExperienceFieldVisible(true)}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomExperienceDetails;
