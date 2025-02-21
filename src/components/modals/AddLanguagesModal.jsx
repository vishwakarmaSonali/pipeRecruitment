import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import "./modal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as LabelClose } from "../../assets/icons/labelClose.svg";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonDropdown from "../common/CommonDropdown";
import SearchDropdown from "../common/SearchDropDown";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";

const languagesOptions = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    region: "Worldwide",
    script: "Latin",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    region: "Spain, Latin America",
    script: "Latin",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    region: "France, Canada, Africa",
    script: "Latin",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    region: "Germany, Austria, Switzerland",
    script: "Latin",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    region: "China, Taiwan, Singapore",
    script: "Chinese",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    region: "India",
    script: "Devanagari",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    region: "Middle East, North Africa",
    script: "Arabic",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    region: "Russia, Eastern Europe",
    script: "Cyrillic",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    region: "Japan",
    script: "Kanji, Hiragana, Katakana",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    region: "Portugal, Brazil",
    script: "Latin",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    region: "Italy, Switzerland",
    script: "Latin",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    region: "South Korea, North Korea",
    script: "Hangul",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    region: "Bangladesh, India",
    script: "Bengali",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    region: "Turkey",
    script: "Latin",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    region: "Vietnam",
    script: "Latin",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    region: "Thailand",
    script: "Thai",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    region: "Poland",
    script: "Latin",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    region: "Netherlands, Belgium",
    script: "Latin",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    region: "Sweden",
    script: "Latin",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    region: "Greece, Cyprus",
    script: "Greek",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    region: "Israel",
    script: "Hebrew",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    region: "Pakistan, India",
    script: "Arabic",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    region: "Iran, Afghanistan, Tajikistan",
    script: "Arabic, Cyrillic (Tajik)",
  },
];

const AddLanguages = ({ visible, onClose, onAddLanguages }) => {
  const { modals, setModalVisibility } = useModal();
  const [searchValue, setSearchValue] = useState("");
  const [selectedJobStatus, setSelectedJobStatus] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]); // Allow multiple selection
  const [selectedMultiLanguages, setSelectedMultiLanguages] = useState([]);
  const [modalAnimation, setModalAnimation] = useState(false);
  // ✅ Handle Add Button Click
  const handleAddClick = () => {
    onAddLanguages(selectedMultiLanguages); // Send selected languages to parent
    setSelectedMultiLanguages([]); // Clear selection after adding
    onClose();
  };
  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
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
          modalAnimation && "shake"
        }`}
      >
        <div className="display-column" style={{ gap: 24 }}>
          <SearchDropdown
            options={languagesOptions}
            optionKey="name" // 👈 Choose which key to display & search
            placeholder="Language"
            multiSelect={true}
            onSelect={(values) => setSelectedMultiLanguages(values)}
          />
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          <CancelButton
            onClick={() => setModalVisibility("addLanguageModalVisible", false)}
          />
          <CommonButton
            title={"Add"}
            onClick={handleAddClick}
            disabled={selectedMultiLanguages?.length < 1}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddLanguages;

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
