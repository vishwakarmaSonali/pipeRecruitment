import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./modal.css";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import CommonButton from "../common/CommonButton";
import CommonTextInput from "../common/CommonTextInput";
import CommonSearchBox from "../common/CommonSearchBox";
const companies = [
  {
    name: "UpTech",
    location: "New York, USA",
    color: "bg-blue-600",
    initials: "U",
  },
  {
    name: "WebSolutions",
    location: "Sydney, Australia",
    color: "bg-purple-500",
    initials: "W",
  },
  {
    name: "Spark Solutions",
    location: "New York, USA",
    color: "bg-orange-500",
    initials: "S",
  },
  {
    name: "CodeHive Technologies",
    location: "Delhi, India",
    color: "bg-black",
    initials: "H",
  },
  {
    name: "NordSoft Solutions",
    location: "Copenhagen, Denmark",
    color: "bg-gray-300",
    initials: "N",
  },
];
const ShareFolderModal = ({ visible, onClose, setTags, tags }) => {
  const { modals, setModalVisibility } = useModal();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState([]); // Store selected items

  // Handle backdrop click
  const handleBackdropClick = () => {
    setModalVisibility("ShareFolderModalVisible", false);
    onClose();
  };

  // Function to add selected company
  const handleSelectCompany = (company) => {
    if (!selectedCompanies.find((item) => item.id === company.id)) {
      setSelectedCompanies([...selectedCompanies, company]);
      console.log("Selected Companies:", [...selectedCompanies, company]); // Log selected companies
    }
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="fixed inset-0 bg-gray-100 bg-opacity-10 flex justify-center items-center ">
        <div className="bg-white p-[14px] rounded-lg shadow-lg min-w-[400px]">
          <div className="flex items-center justify-between mb-[24px] ">
            <h2 className="text-lg font-semibold ">Add Candidates to Folder</h2>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <CommonSearchBox
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div
            className="display-column"
            style={{ gap: 10, overflowY: "auto", marginTop: "16px" }}
          >
            {companies?.map((item, index) => {
              return (
                <div key={index} className="job-compony-list-item">
                  <div className="display-flex align-center" style={{ gap: 6 }}>
                    <div className="w-h-32">
                      <span>{item?.initials}</span>
                    </div>
                    <div className="display-column" style={{ gap: 4 }}>
                      <p className="font-14-medium color-dark-black">
                        {item?.name}
                      </p>
                      <p className="font-10-regular color-dark-black">
                        {item?.location}
                      </p>
                    </div>
                  </div>
                  <div className="display-flex align-center" style={{ gap: 8 }}>
                    <button
                    className="cursor-pointer"
                      onClick={() => handleSelectCompany(item)}
                      disabled={selectedCompanies.some(
                        (selectedItem) => selectedItem.id === item.id
                      )}
                    >
                      <Plus stroke="#1761D8" className="h-[20px] w-[20px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareFolderModal;
