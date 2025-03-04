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

const CustomEducationDetails = ({
  on,
  onToggle,
  addEducation,
  data,
  onDelete,
  onUpdate,
}) => {
  const [addEducationFieldVisible, setAddEducationFieldVisible] =
    useState(false);
  const [degreeValue, setDegreeValue] = useState("");
  const [majorValue, setMajorValue] = useState("");
  const [universityValue, setUniversityValue] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [addEducationBtnDisable, setAddEducationBtnDisable] = useState(true);

  const resetData = () => {
    setDegreeValue("");
    setMajorValue("");
    setDescription("");
    setGradeValue("");
    setUniversityValue("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setAddEducationFieldVisible(false);
    setEditIndex(null);
  };

  const handleAddEducation = () => {
    if (editIndex !== null) {
      // Update existing entry
      onUpdate(editIndex, {
        degree: degreeValue?.trim(),
        major: majorValue?.trim(),
        university: universityValue?.trim(),
        grade: gradeValue?.trim(),
        description: description,
        startDate: startDate,
        endDate: endDate,
      });
    } else {
      addEducation({
        degree: degreeValue?.trim(),
        major: majorValue?.trim(),
        university: universityValue?.trim(),
        grade: gradeValue?.trim(),
        description: description,
        startDate: startDate,
        endDate: endDate,
      });
    }
    resetData();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setDegreeValue(data[index]?.degree);
    setMajorValue(data[index]?.major);
    setUniversityValue(data[index]?.university);
    setGradeValue(data[index]?.grade);
    setDescription(data[index]?.description);
    setStartDate(data[index]?.startDate);
    setEndDate(data[index]?.endDate);
    setAddEducationFieldVisible(true);
  };

  const renderAddEducation = () => {
    return (
      <div className="custom-add-language-container">
        <div className="display-column" style={{ gap: 10 }}>
          <div className="display-flex " style={{ gap: 10 }}>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={degreeValue}
                onChange={(e) => setDegreeValue(e.target.value?.trimStart())}
                placeholder={"Degree"}
              />
            </div>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={majorValue}
                onChange={(e) => setMajorValue(e.target.value?.trimStart())}
                placeholder={"Major"}
              />
            </div>
          </div>
          <div className="display-flex" style={{ gap: 10 }}>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={universityValue}
                onChange={(e) =>
                  setUniversityValue(e.target.value?.trimStart())
                }
                placeholder={"University"}
              />
            </div>
            <div className="flex-1">
              <CommonTextInput
                type="text"
                value={gradeValue}
                onChange={(e) => setGradeValue(e.target.value?.trimStart())}
                placeholder={"Final Grade"}
              />
            </div>
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
              />
            </div>
          </div>
          <div className="flex-1">
            <HtmlViewComponent
              value={description}
              onChange={setDescription}
              placeholder={"Add Description"}
              toolbarId={"t2"}
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
            onClick={handleAddEducation}
            disabled={addEducationBtnDisable}
          />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (
      degreeValue?.length > 0 &&
      majorValue?.length > 0 &&
      universityValue?.length > 0 &&
      !!startDate?.month &&
      !!startDate?.year &&
      !!endDate?.month &&
      !!endDate?.year
    ) {
      setAddEducationBtnDisable(false);
    } else {
      setAddEducationBtnDisable(true);
    }
  }, [universityValue, majorValue, universityValue, startDate, endDate]);

  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            Education Details
          </h3>
        </div>
        <CommonSwitch on={on} onToggle={onToggle} />
      </div>
      <div className="divider-line" />
      <div className="display-column" style={{ gap: 20 }}>
        {data?.map((item, index) => (
          <div key={index} className="display-flex-justify">
            {editIndex === index ? (
              <div className="flex-1">{renderAddEducation()}</div>
            ) : (
              <>
                <div className="display-column" style={{ gap: 8 }}>
                  <p className="font-14-medium color-dark-black">
                    {item?.degree} in {item?.major}
                  </p>
                  <p className="font-14-regular color-dark-black">
                    {item?.university}
                  </p>
                  <p className="font-14-regular color-grey">
                    {`${item?.startDate?.month} ${item?.startDate?.year} -
                      ${item?.endDate?.month} ${item?.endDate?.year}`}
                  </p>
                  {!!item?.grade && (
                    <p className="font-14-regular color-dark-black">
                      {item?.grade}
                    </p>
                  )}
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
        {addEducationFieldVisible && editIndex === null && renderAddEducation()}
        {!addEducationFieldVisible && (
          <button
            className="add-details-btn"
            onClick={() => setAddEducationFieldVisible(true)}
          >
            + Add
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomEducationDetails;
