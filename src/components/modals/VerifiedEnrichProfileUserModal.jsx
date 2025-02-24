import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useModal } from "../common/ModalProvider";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as OpenIcon } from "../../assets/icons/open.svg";
import { ReactComponent as VerifyIcon } from "../../assets/icons/verified.svg";
import { priya, userImage } from "../../helpers/assets";
import NotRightProfileModal from "./NotRightProfileModal";
import { onCLS } from "web-vitals";

const VerifiedEnrichProfileUserModal = ({ visible, onClose, data }) => {
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
            <div
              className="display-column"
              style={{ gap: 10, overflowY: "auto" }}
            >
              <div
                className="common-user-info-div display-flex"
                style={{ gap: 12 }}
              >
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 12 }}
                >
                  <div className="w-h-100">
                    <img src={priya} className="common-img" />
                  </div>
                  <div className="display-column" style={{ gap: 14 }}>
                    <p className="font-16-medium color-dark-black">
                      Priya Sharma
                    </p>
                    <div className="display-column" style={{ gap: 6 }}>
                      <p className="font-14-regular color-dark-black">
                        UI/UX Designer at DesignScape Studios
                      </p>
                      <p className="font-14-regular color-dark-black">
                        Mumbai, India
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="common-badge-style "
                  style={{
                    backgroundColor: "#46A13C1A",
                    alignSelf: "flex-start",
                  }}
                >
                  <VerifyIcon />
                  <span className="font-12-regular color-success">
                    Verified
                  </span>
                </div>
              </div>
              <div
                className="common-user-info-div display-column"
                style={{ gap: 12 }}
              >
                <p
                  className="font-16-medium color-dark-black"
                  style={{ textTransform: "uppercase" }}
                >
                  Contact Info
                </p>
                <div className="display-column" style={{ gap: 9 }}>
                  <p className="font-16-medium color-dark-black">
                    Priya’s Profile
                  </p>
                  <a className="font-14-regular color-dark-black">
                    linkedin.com/priyasharma
                  </a>
                </div>
                <div className="divider-line" />
                <div className="display-column" style={{ gap: 9 }}>
                  <p className="font-16-medium color-dark-black">Website</p>
                  <a className="font-14-regular color-dark-black">
                    www.priyasharma.design
                  </a>
                </div>
                <div className="divider-line" />
                <div className="display-column" style={{ gap: 9 }}>
                  <p className="font-16-medium color-dark-black">Birthdate</p>
                  <a className="font-14-regular color-dark-black">
                    May 15, 1990
                  </a>
                </div>
              </div>
              <div
                className="common-user-info-div display-column"
                style={{ gap: 12 }}
              >
                <p className="font-16-medium color-dark-black">About</p>
                <p className="font-14-regular color-dark-black">
                  Passionate about designing intuitive and user-centric digital
                  experiences, I specialize in UI/UX design, wireframing,
                  prototyping, and user research. With a keen eye for aesthetics
                  and functionality, I thrive on transforming complex ideas into
                  seamless, engaging interfaces.
                </p>
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
                  onClose();
                  setNotRightProfileModalVisible(true);
                }}
              />
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

export default VerifiedEnrichProfileUserModal;
