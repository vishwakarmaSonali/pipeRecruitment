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
import github from "../../assets/icons/sociallinks/github.svg";
import gitlab from "../../assets/icons/sociallinks/gitlab.svg";
import bitbucket from "../../assets/icons/sociallinks/bitbucket.svg";
import CommonTextInput from "../common/CommonTextInput";

const socialLinksOptions = [
  {
    id: 1,
    name: "GitHub",
    icon: github,
  },
  {
    id: 2,
    name: "GitLab",
    icon: gitlab,
  },
  {
    id: 3,
    name: "Bitbucket",
    icon: bitbucket,
  },
  //   {
  //     id: 4,
  //     name: "Stack Overflow",
  //     icon: "../../assets/icons/sociallinks/stackoverflow.svg",
  //   },
  //   {
  //     id: 5,
  //     name: "HackerRank",
  //     icon: "../../assets/icons/sociallinks/hackerrank.svg",
  //   },
  //   {
  //     id: 6,
  //     name: "LeetCode",
  //     icon: "../../assets/icons/sociallinks/leetcode.svg",
  //   },
  //   {
  //     id: 7,
  //     name: "Dev.to",
  //     icon: "../../assets/icons/sociallinks/devto.svg",
  //   },
  //   {
  //     id: 8,
  //     name: "Dribbble",
  //     icon: "../../assets/icons/sociallinks/dribbble.svg",
  //   },
  //   {
  //     id: 9,
  //     name: "Behance",
  //     icon: "../../assets/icons/sociallinks/behance.svg",
  //   },
  //   {
  //     id: 10,
  //     name: "ArtStation",
  //     icon: "../../assets/icons/sociallinks/artstation.svg",
  //   },
  //   {
  //     id: 11,
  //     name: "Pinterest",
  //     icon: "../../assets/icons/sociallinks/pinterest.svg",
  //   },
  //   {
  //     id: 12,
  //     name: "Figma",
  //     icon: "../../assets/icons/sociallinks/figma.svg",
  //   },
  //   {
  //     id: 13,
  //     name: "LinkedIn",
  //     icon: "../../assets/icons/sociallinks/linkedin.svg",
  //   },
  //   {
  //     id: 14,
  //     name: "Medium",
  //     icon: "../../assets/icons/sociallinks/medium.svg",
  //   },
  //   {
  //     id: 15,
  //     name: "Reddit",
  //     icon: "../../assets/icons/sociallinks/reddit.svg",
  //   },
  //   {
  //     id: 16,
  //     name: "Quora",
  //     icon: "../../assets/icons/sociallinks/quora.svg",
  //   },
  //   {
  //     id: 17,
  //     name: "Notion",
  //     icon: "../../assets/icons/sociallinks/notion.svg",
  //   },
  //   {
  //     id: 18,
  //     name: "Instagram",
  //     icon: "../../assets/icons/sociallinks/instagram.svg",
  //   },
  //   {
  //     id: 19,
  //     name: "Threads",
  //     icon: "../../assets/icons/sociallinks/threads.svg",
  //   },
  //   {
  //     id: 20,
  //     name: "Facebook",
  //     icon: "../../assets/icons/sociallinks/facebook.svg",
  //   },
  //   { id: 21, name: "X", icon: "../../assets/icons/sociallinks/x.svg" },
  //   { id: 22, name: "VK", icon: "../../assets/icons/sociallinks/vk.svg" },
  //   {
  //     id: 23,
  //     name: "Youtube",
  //     icon: "../../assets/icons/sociallinks/youtube.svg",
  //   },
  //   {
  //     id: 24,
  //     name: "Vimeo",
  //     icon: "../../assets/icons/sociallinks/vimeo.svg",
  //   },
  //   {
  //     id: 25,
  //     name: "Other",
  //     icon: "../../assets/icons/sociallinks/other.svg",
  //   },
];



const AddSocialLinksModal = ({ visible, onClose, onAddLanguages }) => {
  const { modals, setModalVisibility } = useModal();
  const [selectedSocialLink, setSelectedSocialLink] = useState(null);
  const [socialLinkURL, setSocialLinkURL] = useState("");

  // ✅ Handle Add Button Click (Ensure a platform & URL is selected)
  const handleAddClick = () => {
    if (selectedSocialLink && socialLinkURL.trim() !== "") {
      onAddLanguages({ ...selectedSocialLink, url: socialLinkURL }); // ✅ Send platform + URL
      setSelectedSocialLink(null);
      setSocialLinkURL(""); // Clear fields after adding
    }
  };

  return (
    <Modal
      show={visible}
      onHide={() => setModalVisibility("addSocialLinksModalVisible", false)}
      dialogClassName="common-modal"
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="common-modal-container overflow-visible">
        <div className="display-column" style={{ gap: 10 }}>
          {/* 🔹 Social Links Dropdown */}
          <SearchDropdown
            options={socialLinksOptions}
            optionKey="name"
            iconKey="icon"
            placeholder="Platform Name"
            multiSelect={false}
            onSelect={(value) => setSelectedSocialLink(value)}
          />

          {/* 🔹 URL Input Field */}
          <CommonTextInput
            type="text"
            value={socialLinkURL}
            onChange={(e) => setSocialLinkURL(e.target.value)}
            placeholder={"Platform URL"}
          />
        </div>

        <div className="display-flex" style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}>
          <CancelButton onClick={() => setModalVisibility("addSocialLinksModalVisible", false)}/>
          <CommonButton title={"Add"} onClick={handleAddClick} />
        </div>
      </div>
    </Modal>
  );
};

export default AddSocialLinksModal;

  

