import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as LabelClose } from "../../assets/icons/labelClose.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonDropdown from "../common/CommonDropdown";
import SearchDropdown from "../common/SearchDropDown";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import LocationSearchDropdown from "../AutocompleteDropdowns/LocationSearchDropDown";
import Tick from "../../assets/icons/sourcingIcons/tick.svg";
import MonthYearPicker from "../MonthYearView";

const checkboxOptions = ["Currently working at this role"];

const AddExperienceDetailsModal = ({ visible, onClose, onAddExperience }) => {
  const { modals, setModalVisibility } = useModal();
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Function to handle form submission
  const handleAddClick = () => {
      console.log(
       
        "position, company,",
        position,
        company,
        "selectedLocations",selectedLocations,startDate,"startDate"
      );
    if (!position || !company || selectedLocations.length === 0 || !startDate)
      return;

    const experienceData = {
        position,
        company,
        location: selectedLocations,
        startDate: startDate ? `${startDate.month} ${startDate.year}` : "", // ✅ Ensure correct format
        endDate: checked ? "Present" : endDate ? `${endDate.month} ${endDate.year}` : "",
      };
console.log("experienceDataexperienceData",experienceData);

    onAddExperience(experienceData);

    // ✅ Reset fields after adding
    setPosition("");
    setCompany("");
    setSelectedLocations([]);
    setStartDate(null);
    setEndDate(null);
    setChecked(false);

    setModalVisibility("AddExperienceDetailModalVisible", false);
  };

  const handleBackdropClick = () => {
    setModalVisibility("AddExperienceDetailModalVisible", false);
  };

  const handleStartDateChange = (selectedDate) => {
    console.log("Selected Date:", selectedDate); // { month: "September", year: 2015 }

  };
  const handleEndDateChange = (selectedDate) => {
    console.log("Selected end Date:", selectedDate); // { month: "September", year: 2015 }
  };

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
          modals?.animatedModal && "shake"
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
          <MonthYearPicker label="Start Date" onSelect={(date) => { console.log("Start Date Selected:", date); setStartDate(date); }} />
          <MonthYearPicker label="End Date (expected)" onSelect={(date) => setEndDate(date)} isCheckedDisable={checked} />
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          <CancelButton onClick={onClose} />
          <CommonButton title={"Add"} onClick={handleAddClick} />
        </div>
      </div>
    </Modal>
  );
};

export default AddExperienceDetailsModal;
