import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";

import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import MonthYearPicker from "../MonthYearView";
import { convertToISODate, formatDateMonthYear } from "../../helpers/utils";
import CommonLoader from "../common/CommonLoader";

const checkboxOptions = ["Currently working at this role"];

const AddExperienceDetailsModal = ({
  visible,
  onClose,
  onAddExperience,
  selectedExperienceData,
  isLoading,
  onRemoveExperience,
  removeLoading,
}) => {
  const { modals, setModalVisibility } = useModal();
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState({ month: "", year: "" });
  const [endDate, setEndDate] = useState({ month: "", year: "" });
  const [modalAnimation, setModalAnimation] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addBtnDisable, setAddBtnDisable] = useState(true);

  const handleAddClick = () => {
    if (!position || !company || !selectedLocation || !startDate) return;

    const experienceData = {
      position,
      company,
      location: selectedLocation,
      title: position,
      start_date: convertToISODate(startDate),
      end_date: checked ? null : convertToISODate(endDate),
      current: checked,
    };

    console.log("convertToISODate(startDate)", convertToISODate(startDate));

    onAddExperience(experienceData);
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
    setSelectedLocation("");
    setStartDate({ month: "", year: "" });
    setEndDate({ month: "", year: "" });
    setEdit(false);
    setChecked(false);
    onClose();
  };

  useEffect(() => {
    if (!!selectedExperienceData) {
      setEdit(true);
      setPosition(selectedExperienceData?.position);
      setCompany(selectedExperienceData?.company);
      setSelectedLocation(selectedExperienceData?.location);
      setChecked(selectedExperienceData?.current);

      const startDateFormat = formatDateMonthYear(
        selectedExperienceData?.start_date
      );
      const splitStartDate = startDateFormat?.split(" ");
      setStartDate({
        month: splitStartDate[0] || "",
        year: splitStartDate[1] || "",
      });

      const endDateFormat = formatDateMonthYear(
        selectedExperienceData?.end_date
      );
      const splitEndDate = endDateFormat?.split(" ");

      setEndDate(
        selectedExperienceData?.current
          ? "Present"
          : {
              month: splitEndDate[0],
              year: splitEndDate[1],
            }
      );
    } else {
      setPosition("");
      setCompany("");
      setSelectedLocation("");
      setEndDate({ month: "", year: "" });
      setStartDate({ month: "", year: "" });
      setChecked(false);
      setEdit(false);
    }
  }, [selectedExperienceData]);

  useEffect(() => {
    if (checked) {
      setEndDate({
        month: "",
        year: "",
      });
    } else {
      if (selectedExperienceData?.end_date) {
        const endDateFormat = formatDateMonthYear(
          selectedExperienceData?.end_date
        );
        const splitEndDate = endDateFormat?.split(" ");
        setEndDate(
          selectedExperienceData?.current
            ? "Present"
            : {
                month: splitEndDate[0],
                year: splitEndDate[1],
              }
        );
      }
    }
  }, [checked, selectedExperienceData]);

  useEffect(() => {
    if (
      position?.length > 0 &&
      company?.length > 0 &&
      selectedLocation?.length > 0 &&
      !!startDate?.month &&
      !!startDate?.year
    ) {
      if (checked) {
        setAddBtnDisable(false);
      } else if (endDate?.month && endDate?.year) {
        setAddBtnDisable(false);
      } else {
        setAddBtnDisable(true);
      }
    } else {
      setAddBtnDisable(true);
    }
  }, [position, company, selectedLocation, startDate, endDate, checked]);

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
          <CommonTextInput
            type="text"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            placeholder={"Location"}
          />
          {/* <LocationSearchDropdown
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            placeholder={"Location"}
          /> */}
          <div>
            <div
              className="flex items-center space-x-3 py-2 cursor-pointer text-sm font-ubuntu"
              onClick={() => {
                setChecked(!checked);
              }}
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
            <div className="display-flex align-center" style={{ gap: 10 }}>
              <button
                className="font-12-regular color-blue"
                style={{ alignSelf: "flex-start" }}
                onClick={onRemoveExperience}
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

export default AddExperienceDetailsModal;
