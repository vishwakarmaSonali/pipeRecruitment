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
import MonthYearPicker from "../MonthYearView";


const AddEducationDetailsModal = ({ visible, onClose,onAddEducation }) => {
  const { modals, setModalVisibility } = useModal();
const [degree,setDegree] = useState("")
const [major,setMajor] = useState("")
const [university,setUniversity] = useState("")
  const [selectedMultiLanguages, setSelectedMultiLanguages] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // ✅ Handle Add Button Click
  const handleAddClick = () => {
    if (!degree || !major || !university) return; // Prevent empty fields
    onAddEducation({ degree, major, university }); // Send data to parent
    setDegree(""); // Clear input fields
    setMajor("");
    setUniversity("");
    setModalVisibility("AddEducationDetailModalVisible", false); // Close modal
  };

  const handleBackdropClick = () => {
    setModalVisibility("AddEducationDetailModalVisible", false);
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
        <MonthYearPicker label="Start Date" onSelect={(date) => { console.log("Start Date Selected:", date); setStartDate(date); }} />
          <MonthYearPicker label="End Date (expected)" onSelect={(date) => setEndDate(date)}  />
        </div>
        <div className="display-flex" style={{ gap: 8 ,justifyContent:'center',marginTop:"24px"}}>
            <CancelButton  onClick={onClose}/>
            <CommonButton title={"Add"} onClick={handleAddClick}  />
          </div>
      </div>
    </Modal>
  );
};

export default AddEducationDetailsModal;

// const languagesOptions = [
//     { code: "en", name: "English", nativeName: "English", region: "Worldwide", script: "Latin" },
//     { code: "es", name: "Spanish", nativeName: "Español", region: "Spain, Latin America", script: "Latin" },
//     { code: "fr", name: "French", nativeName: "Français", region: "France, Africa, Canada", script: "Latin" }
//   ];
  
//   const App = () => {
//     const [selectedLanguage, setSelectedLanguage] = useState(null);
  
//     return (
//       <div className="p-6">
//         <h2 className="text-md font-medium">Select a Language</h2>
//         <SearchDropdown
//           options={languagesOptions}
//           optionKey="name" // 👈 Choose which key to display & search
//           placeholder="Search for a language..."
//           onSelect={(value) => setSelectedLanguage(value)}
//         />
//         {selectedLanguage && <p className="mt-2 text-gray-700">Selected: <strong>{selectedLanguage.name} ({selectedLanguage.nativeName})</strong></p>}
//       </div>
//     );
//   };
  