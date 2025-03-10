import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import MonthYearPicker from "../MonthYearView";
import { convertToISODate, formatDateMonthYear } from "../../helpers/utils";
import CommonLoader from "../common/CommonLoader";

const AddEducationDetailsModal = ({
  visible,
  onClose,
  onAddEducation,
  selectedEducationData,
  isLoading,
  removeLoading,
  onRemoveEducation,
}) => {
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [modalAnimation, setModalAnimation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addBtnDisable, setAddBtnDisable] = useState(true);

  const handleAddClick = () => {
    if (!degree || !major || !university || !startDate || !endDate) return; // Prevent empty fields
    const educationData = {
      degree: degree,
      field_of_study: major,
      school: university,
      start_date: convertToISODate(startDate),
      end_date: convertToISODate(endDate),
    };
    onAddEducation(educationData); // Send data to parent
  };

  const resetData = () => {
    setDegree("");
    setMajor("");
    setUniversity("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setEdit(false);
    onClose();
  };

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
  };

  useEffect(() => {
    if (!!selectedEducationData) {
      setEdit(true);
      setDegree(selectedEducationData?.degree || "");
      setUniversity(selectedEducationData?.school || "");
      setMajor(selectedEducationData?.field_of_study || "");
      const startDateFormat = formatDateMonthYear(
        selectedEducationData?.start_date
      );
      const splitStartDate = startDateFormat?.split(" ");
      setStartDate({
        month: splitStartDate[0] || "",
        year: splitStartDate[1] || "",
      });

      const endDateFormat = formatDateMonthYear(
        selectedEducationData?.end_date
      );
      const splitEndDate = endDateFormat?.split(" ");
      setEndDate({
        month: splitEndDate[0] || "",
        year: splitEndDate[1] || "",
      });
    } else {
      setEdit(false);
      setDegree("");
      setUniversity("");
      setMajor("");
      setEndDate({
        month: "",
        year: "",
      });
      setStartDate({
        month: "",
        year: "",
      });
    }
  }, [selectedEducationData]);

  useEffect(() => {
    if (
      degree?.length > 0 &&
      university?.length > 0 &&
      major?.length > 0 &&
      !!startDate?.month &&
      !!startDate?.year &&
      !!endDate?.month &&
      !!endDate?.year
    ) {
      setAddBtnDisable(false);
    } else {
      setAddBtnDisable(true);
    }
  }, [major, university, degree, startDate, endDate]);

  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container overflow-visible ${
          modalAnimation && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 10 }}>
          <CommonTextInput
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder={"Degree"}
          />
          <CommonTextInput
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder={"Major"}
          />
          <CommonTextInput
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            placeholder={"University"}
          />
          <MonthYearPicker
            label="Start Date"
            onSelect={(date) => {
              console.log("Start Date Selected:", date);
              setStartDate(date);
            }}
            month={startDate?.month}
            year={startDate?.year?.toString()}
          />
          <MonthYearPicker
            label="End Date (expected)"
            onSelect={(date) => setEndDate(date)}
            month={endDate?.month}
            year={endDate?.year?.toString()}
          />
          {edit && (
            <div className="display-flex align-center" style={{ gap: 10 }}>
              <button
                className="font-12-regular color-blue"
                style={{ alignSelf: "flex-start" }}
                onClick={onRemoveEducation}
              >
                Remove Experience
              </button>
              {removeLoading && <CommonLoader className={"loader-blue"} />}
            </div>
          )}
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          <CancelButton title={"Cancel"} onClick={resetData} />
          <CommonButton
            title={"Add"}
            onClick={handleAddClick}
            isLoading={isLoading}
            disabled={addBtnDisable}
          />
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(AddEducationDetailsModal);
