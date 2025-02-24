import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as OpenIcon } from "../../assets/icons/open.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { ReactComponent as SelectedIcon } from "../../assets/icons/selected-blue.svg";
import { userImage, priyaImage } from "../../helpers/assets";
import AddSocialLinksModal from "./AddSocialLinksModal";
import { onCLS } from "web-vitals";

const allProfileYoutube = [
  {
    id: 1,
    name: "Priya Sharma",
    match: "85%",
    image: priyaImage,
    visitLink: "www.youtube.com",
  },
  {
    id: 2,
    name: "PriyaS",
    match: "68%",
    image: null,
    visitLink: "www.youtube.com",
  },
  {
    id: 3,
    name: "Priya Sharma",
    match: "41%",
    image: null,
    visitLink: "www.youtube.com",
  },
];

const NotRightProfileModal = ({ visible, onClose, data }) => {
  const [modalAnimation, setModalAnimation] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [
    enrichUserProfileSocialAddModalVisible,
    setEnrichUserProfileSocialAddModalVisible,
  ] = useState(false);

  const handleBackdropClick = () => {
    setModalAnimation(true);
    setTimeout(() => {
      setModalAnimation(false);
    }, 600);
  };

  return (
    <>
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
          style={{ minWidth: 800, maxWidth: 800 }}
        >
          <div className="display-column" style={{ gap: 24 }}>
            <div className="display-flex-justify align-center">
              <p className="font-16-medium color-dark-black">
                Not the right profile?
              </p>
              <button onClick={onClose}>
                <CloseIcon width={18} height={18} />
              </button>
            </div>
            <div className="display-flex" style={{ gap: 12, flexWrap: "wrap" }}>
              {allProfileYoutube?.map((item) => {
                return (
                  <div
                    className={`not-right-profile-item flex-1 ${
                      item?.id === selectedProfile?.id &&
                      "selected-not-right-profile"
                    }`}
                    onClick={() => setSelectedProfile(item)}
                  >
                    <div className="display-flex-justify">
                      <div
                        className="display-flex align-center"
                        style={{ gap: 8 }}
                      >
                        <div className="w-h-54">
                          <img
                            src={item?.image ? item?.image : userImage}
                            className="common-img"
                          />
                        </div>
                        <div className="display-column" style={{ gap: 6 }}>
                          <p className="font-14-regular color-dark-black">
                            {item?.name}
                          </p>
                          <div
                            className="common-badge-style "
                            style={{
                              backgroundColor: "#D2A01D1A",
                            }}
                          >
                            <InfoIcon />
                            <span className="font-12-regular color-holt">
                              {item?.match} Match
                            </span>
                          </div>
                        </div>
                      </div>
                      {item?.id === selectedProfile?.id && (
                        <div style={{ alignSelf: "flex-start" }}>
                          <SelectedIcon />
                        </div>
                      )}
                    </div>
                    <div className="divider-line" />
                    <a
                      href={
                        item?.visitLink?.startsWith("http")
                          ? item.visitLink
                          : `https://${item?.visitLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="display-flex align-center"
                      style={{ gap: 6, alignSelf: "center" }}
                    >
                      <OpenIcon />
                      <span className="font-14-regular color-blue">
                        Open this profile in Youtube
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>
            <p className="font-12-regular color-grey text-center">
              If no matching profiles are found, you can either enter the{" "}
              <span
                className="color-blue"
                onClick={() => {
                  onClose();
                  setEnrichUserProfileSocialAddModalVisible(true);
                }}
                style={{ cursor: "pointer" }}
              >
                Youtube account URL manually
              </span>{" "}
              or confirm that the candidate{" "}
              <span className="color-blue" style={{ cursor: "pointer" }}>
                does not have a Youtube account
              </span>
              .
            </p>
            <div
              className="display-flex"
              style={{ gap: 8, justifyContent: "center" }}
            >
              <CancelButton title={"Back"} />
              <CommonButton title={"Save"} disabled={!selectedProfile} />
            </div>
          </div>
        </div>
      </Modal>
      <AddSocialLinksModal
        visible={enrichUserProfileSocialAddModalVisible}
        onClose={() => setEnrichUserProfileSocialAddModalVisible(false)}
        showHeader={true}
      />
    </>
  );
};

export default NotRightProfileModal;
