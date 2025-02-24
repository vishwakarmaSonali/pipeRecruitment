import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import SearchDropdown from "../common/SearchDropDown";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import github from "../../assets/icons/sociallinks/github.svg";
import gitlab from "../../assets/icons/sociallinks/gitlab.svg";
import artstation from "../../assets/icons/sociallinks/Artstation.svg";
import behance from "../../assets/icons/sociallinks/behance.svg";
import bitbucket from "../../assets/icons/sociallinks/bitbucket.svg";
import devto from "../../assets/icons/sociallinks/dev-to.svg";
import dribble from "../../assets/icons/sociallinks/dribble.svg";
import facebook from "../../assets/icons/sociallinks/facebook.svg";
import figma from "../../assets/icons/sociallinks/figma.svg";
import hackerrank from "../../assets/icons/sociallinks/hackerrank.svg";
import insta from "../../assets/icons/sociallinks/insta.svg";
import leetcode from "../../assets/icons/sociallinks/leetcode.svg";
import linkedin from "../../assets/icons/sociallinks/linkedin.svg";
import medium from "../../assets/icons/sociallinks/medium.svg";
import notion from "../../assets/icons/sociallinks/notion.svg";
import pinterest from "../../assets/icons/sociallinks/pinterest.svg";
import quora from "../../assets/icons/sociallinks/quora.svg";
import reddit from "../../assets/icons/sociallinks/reddit.svg";
import stackoverflow from "../../assets/icons/sociallinks/stackoverflow.svg";
import twitter from "../../assets/icons/sociallinks/twitter.svg";
import vimeo from "../../assets/icons/sociallinks/vimeo.svg";
import vk from "../../assets/icons/sociallinks/vk.svg";
import x from "../../assets/icons/sociallinks/x.svg";
import yt from "../../assets/icons/sociallinks/yt.svg";
import threads from "../../assets/icons/sociallinks/threads.svg";
import CommonTextInput from "../common/CommonTextInput";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";

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
  {
    id: 4,
    name: "Stack Overflow",
    icon: stackoverflow,
  },
  {
    id: 5,
    name: "HackerRank",
    icon: hackerrank,
  },
  {
    id: 6,
    name: "LeetCode",
    icon: leetcode,
  },
  {
    id: 7,
    name: "Dev.to",
    icon: devto,
  },
  {
    id: 8,
    name: "Dribbble",
    icon: dribble,
  },
  {
    id: 9,
    name: "Behance",
    icon: behance,
  },
  {
    id: 10,
    name: "ArtStation",
    icon: artstation,
  },
  {
    id: 11,
    name: "Pinterest",
    icon: pinterest,
  },
  {
    id: 12,
    name: "Figma",
    icon: figma,
  },
  {
    id: 13,
    name: "LinkedIn",
    icon: linkedin,
  },
  {
    id: 14,
    name: "Medium",
    icon: medium,
  },
  {
    id: 15,
    name: "Reddit",
    icon: reddit,
  },
  {
    id: 16,
    name: "Quora",
    icon: quora,
  },
  {
    id: 17,
    name: "Notion",
    icon: notion,
  },
  {
    id: 18,
    name: "Instagram",
    icon: insta,
  },
  {
    id: 19,
    name: "Threads",
    icon: threads,
  },
  {
    id: 20,
    name: "Facebook",
    icon: facebook,
  },
  { id: 21, name: "X", icon: x },
  { id: 22, name: "VK", icon: vk },
  {
    id: 23,
    name: "Youtube",
    icon: yt,
  },
  {
    id: 24,
    name: "Vimeo",
    icon: vimeo,
  },
];

const AddSocialLinksModal = ({
  visible,
  onClose,
  onAddLanguages,
  showHeader,
}) => {
  const { modals, setModalVisibility } = useModal();
  const [selectedSocialLink, setSelectedSocialLink] = useState(null);
  const [socialLinkURL, setSocialLinkURL] = useState("");
  const [modalAnimation, setModalAnimation] = useState(false);

  // ✅ Handle Add Button Click (Ensure a platform & URL is selected)
  const handleAddClick = () => {
    if (selectedSocialLink && socialLinkURL.trim() !== "") {
      onAddLanguages({ ...selectedSocialLink, url: socialLinkURL }); // ✅ Send platform + URL
      setSelectedSocialLink(null);
      setSocialLinkURL(""); // Clear fields after adding
    }
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
      dialogClassName="common-modal"
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div
        className={`common-modal-container overflow-visible ${
          modalAnimation && "shake"
        }`}
      >
        {showHeader && (
          <div className="display-flex-justify" style={{ marginBottom: 24 }}>
            <p className="font-16-medium color-dark-black">
              Add Social Media Profile
            </p>
            <button onClick={onClose}>
              <CloseIcon width={18} height={18} />
            </button>
          </div>
        )}
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

        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "center", marginTop: "24px" }}
        >
          {!showHeader && <CancelButton title={"Cancel"} onClick={onClose} />}
          <CommonButton title={"Add"} onClick={handleAddClick} />
        </div>
      </div>
    </Modal>
  );
};

export default AddSocialLinksModal;
