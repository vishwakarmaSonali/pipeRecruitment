import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as OpenIcon } from "../../assets/icons/open.svg";
import { ReactComponent as InfoIcon } from "../../assets/icons/info.svg";
import { userImage } from "../../helpers/assets";
import NotRightProfileModal from "./NotRightProfileModal";

const ProfileNotMarkedModal = ({ visible, onClose, data }) => {
  const [modalAnimation, setModalAnimation] = useState(false);
  const [notRightProfileModalVisible, setNotRightProfileModalVisible] =
    useState(false);

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
              <button className="display-flex align-center" style={{ gap: 8 }}>
                <OpenIcon />
                <span className="font-14-regular color-blue">
                  Open this profile in Youtube
                </span>
              </button>
              <button onClick={onClose}>
                <CloseIcon width={18} height={18} />
              </button>
            </div>
            <div className="profile-not-marked-info-div">
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                <div className="w-h-100">
                  <img src={userImage} className="common-img" />
                </div>
                <div className="dispay-column flex-1" style={{ gap: 6 }}>
                  <p className="font-16-medium color-dark-black">
                    Priya Sharma
                  </p>
                  <p className="font-14-regular color-dark-black">
                    This information cannot be extracted.
                  </p>
                </div>
              </div>
              <div
                className="common-badge-style "
                style={{
                  backgroundColor: "#D2A01D1A",
                  alignSelf: "flex-start",
                }}
              >
                <InfoIcon />
                <span className="font-12-regular color-holt">68% Match</span>
              </div>
            </div>
            <div
              className="display-flex"
              style={{ gap: 8, justifyContent: "flex-end" }}
            >
              <CancelButton
                title={"Not the right profile?"}
                onClick={(e) => {
                  e.stopPropagation();
                  setNotRightProfileModalVisible(true);
                }}
              />
              <CommonButton title={"Mark as verified"} />
            </div>
          </div>
        </div>
      </Modal>
      <NotRightProfileModal
        visible={notRightProfileModalVisible}
        onClose={() => setNotRightProfileModalVisible(false)}
      />
    </>
  );
};

export default ProfileNotMarkedModal;
