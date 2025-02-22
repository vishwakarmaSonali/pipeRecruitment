import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import MonthYearPicker from "../MonthYearView";

const AddEducationDetailsModal = ({
  visible,
  onClose,
  onAddEducation,
  selectedEducationData,
}) => {
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [modalAnimation, setModalAnimation] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleAddClick = () => {
    if (!degree || !major || !university || !startDate || !endDate) return; // Prevent empty fields
    onAddEducation({ degree, major, university, startDate, endDate }); // Send data to parent
    setDegree(""); // Clear input fields
    setMajor("");
    setUniversity("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    onClose();
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
      setUniversity(selectedEducationData?.collage || "");
      setMajor(selectedEducationData?.course || "");
      if (selectedEducationData?.startDate) {
        const splitDate = selectedEducationData?.startDate?.split(" ");
        setStartDate({
          month: splitDate[0] || "",
          year: splitDate[1] || "",
        });
      }

      if (selectedEducationData?.endDate) {
        const splitDate = selectedEducationData?.endDate?.split(" ");
        setEndDate({
          month: splitDate[0],
          year: splitDate[1],
        });
      }
    }
  }, [selectedEducationData]);

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
            <button
              className="font-12-regular color-blue"
              style={{ alignSelf: "flex-start" }}
            >
              Remove Education
            </button>
          )}
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          <CancelButton title={"Cancel"} onClick={resetData} />
          <CommonButton title={"Add"} onClick={handleAddClick} />
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(AddEducationDetailsModal);
