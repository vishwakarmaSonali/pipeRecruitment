import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";

import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import MonthYearPicker from "../MonthYearView";

const checkboxOptions = ["Currently working at this role"];

const AddExperienceDetailsModal = ({
  visible,
  onClose,
  onAddExperience,
  selectedExperienceData,
}) => {
  const { modals, setModalVisibility } = useModal();
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [modalAnimation, setModalAnimation] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleAddClick = () => {
    if (!position || !company || selectedLocations.length === 0 || !startDate)
      return;

    const experienceData = {
      position,
      company,
      location: selectedLocations,
      startDate: startDate ? `${startDate.month} ${startDate.year}` : "", // ✅ Ensure correct format
      endDate: checked
        ? "Present"
        : endDate
        ? `${endDate.month} ${endDate.year}`
        : "",
    };
    console.log("experienceDataexperienceData", experienceData);

    onAddExperience(experienceData);

    resetData();
  };

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
  };

  const resetData = () => {
    setPosition("");
    setCompany("");
    setSelectedLocations([]);
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setEdit(false);
    setChecked(false);
    onClose();
  };

  useEffect(() => {
    if (!!selectedExperienceData) {
      console.log(">>>>>>>>>>>.selectedExperienceData", selectedExperienceData);
      setEdit(true);
      setPosition(selectedExperienceData?.position);
      setCompany(selectedExperienceData?.company);
      setSelectedLocations([selectedExperienceData?.location]);

      if (selectedExperienceData?.startDate) {
        const splitDate = selectedExperienceData?.startDate?.split(" ");
        setStartDate({
          month: splitDate[0] || "",
          year: splitDate[1] || "",
        });
      }

      if (selectedExperienceData?.endDate) {
        const splitDate = selectedExperienceData?.endDate?.split(" ");
        setEndDate({
          month: splitDate[0],
          year: splitDate[1],
        });
      }
    }
  }, [selectedExperienceData]);

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
          {/* Position & Company Inputs */}
          <CommonTextInput
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder={"Position"}
          />
          <CommonTextInput
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={"Company Name"}
          />

          {/* Location Selector */}
          <LocationSearchDropdown
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            placeholder={"Location"}
          />
          <div>
            <div
              className="flex items-center space-x-3 py-2 cursor-pointer text-sm font-ubuntu"
              onClick={() => setChecked(!checked)}
            >
              <div
                className={`w-[20px] h-[20px] border rounded-md flex items-center justify-center border-black`}
              >
                {checked && <img src={Tick} alt="Selected" />}
              </div>
              <span className={"text-black"}>{checkboxOptions[0]}</span>
            </div>
          </div>
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
            isCheckedDisable={checked}
          />
          {edit && (
            <button
              className="font-12-regular color-blue"
              style={{ alignSelf: "flex-start" }}
            >
              Remove Experience
            </button>
          )}
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          <CancelButton onClick={resetData} />
          <CommonButton title={"Add"} onClick={handleAddClick} />
        </div>
      </div>
    </Modal>
  );
};

export default AddExperienceDetailsModal;
