import React, { useState, useRef } from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeModal.svg";
import { ReactComponent as GallaryEdit } from "../../assets/icons/gallery-edit.svg";
import { useModal } from "../common/ModalProvider";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-quill/dist/quill.snow.css";
import HtmlViewComponent from "../common/HtmlViewComponent";
import CommonTextInput from "../common/CommonTextInput";
import CommonDropdown from "../common/CommonDropdown";
import CommonButton from "../common/CommonButton";
import PhoneInputComponent from "../common/PhoneInputComponent";

const jobOptions = [
  { id: 1, value: "UpTech", place: "New York, USA" },
  { id: 2, value: "WebSolutions", place: "Sydney, Australia" },
  { id: 3, value: "Spark Solutions", place: "New York, USA" },
  { id: 4, value: "KiwiTech Ltd.", place: "Auckland, New Zealand" },
];

const CreateCandidateFormModal = ({ visible, onClose }) => {
  const quillRef = useRef(null);
  const { modals, setModalVisibility } = useModal();
  const { register, handleSubmit, setValue, watch } = useForm();
  const phone = watch("phone");
  const email = watch("email");
  const name = watch("name");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [profileImages, setProfileImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [jobValue, setJobValue] = useState("");
  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 200);
  };

  const handleChange = (value) => {
    setDescription(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Update profile image with selected file
      setProfileImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`common-modal ${
        modals?.animatedModal ? "zoom-out" : "zoom-in"
      }`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
    >
      <div className="display-column-24">
        <div className="display-column-8">
          <div className="display-flex-justify align-center">
            <p className="modal-title-text">Fill Form</p>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <p className="modal-description-text">
            Enter candidate details step by step.
          </p>
        </div>
        <div>
          <form
            className="display-column"
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: 10 }}
          >
            <div className="display-flex align-center" style={{ gap: 6 }}>
              <div
                className="candidate-upload-img-div"
                onClick={() => document.getElementById("file-input").click()}
              >
                {!!imagePreview ? (
                  <img src={imagePreview} className={`common-img `} />
                ) : (
                  <GallaryEdit />
                )}
                <input
                  type="file"
                  id="file-input"
                  style={{
                    display: "none",
                  }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <CommonTextInput
                type={"text"}
                value={name}
                onChange={(e) => setValue("name", e.target.value)}
                placeholder={"Candidate Name"}
              />
            </div>
            <PhoneInputComponent />
            <CommonTextInput
              type={"email"}
              value={email}
              onChange={(e) => setValue("email", e.target.value)}
              placeholder={"Email Id"}
            />
            <CommonTextInput
              type={"text"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={"Location"}
            />
            <CommonDropdown
              options={jobOptions}
              placeholder="Select Job (optional)"
              selectedValue={jobValue}
              onChange={setJobValue}
              optionKey="value"
            />

            <HtmlViewComponent value={description} onChange={setDescription} />

            {/* <button type="submit" className="submit-btn">
              Create Candidate
            </button> */}
          </form>
        </div>
        <div className="display-flex justify-center">
          <CommonButton title={"Create Candidate"} disabled={true} />
        </div>
      </div>
    </Modal>
  );
};

export default CreateCandidateFormModal;
