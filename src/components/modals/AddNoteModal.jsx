import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import HtmlViewComponent from "../common/HtmlViewComponent";

const AddNoteModal = ({ visible, onClose, selectedNote }) => {
  const [modalAnimation, setModalAnimation] = useState(false);
  const [noteText, setNoteText] = useState("");

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
        className={`common-modal-container-540 overflow-visible ${
          modalAnimation && "shake"
        }`}
      >
        <div style={{ width: "100%" }}>
          <HtmlViewComponent
            value={noteText}
            onChange={setNoteText}
            placeholder={"Add Note"}
          />
        </div>
        <div
          className="display-flex"
          style={{ gap: 8, justifyContent: "flex-end", marginTop: 10 }}
        >
          <CancelButton title={"Discard"} onClick={onClose} />
          <CommonButton title={"Save"} onClick={onClose} />
        </div>
      </div>
    </Modal>
  );
};

export default AddNoteModal;
