import React, { useState } from "react";
import "./index.css";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/more.svg";
import { commonStyle } from "../../helpers/config";
import { Menu } from "@mui/material";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import AddEducationDetailsModal from "../modals/AddEducationDetailsModal";
import { useModal } from "../common/ModalProvider";
import AddExperienceDetailsModal from "../modals/AddExperienceDetailsModal";

const CandidateInfoExperience = ({ label, data, editable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapse, setCollapse] = useState(true);
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [educationDetails, setEducationDetails] = useState([]);
  const [experienceDetails, setExperienceDetails] = useState([]);

  const [selectedEducationDetails, setSelectedEducationDetails] =
    useState(null);
  const [selectedExperienceDetails, setSelectedExperienceDetails] =
    useState(null);

  const handleAddEducation = (details) => {
    setEducationDetails((prevDetails) => [...prevDetails, details]);
    setEducationModalVisible(false);
  };

  const handleAddExperience = (details) => {
    setExperienceDetails((prevDetails) => [...prevDetails, details]);
    setExperienceModalVisible(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderExperience = (item) => {
    return (
      <div
        key={item?.id}
        className="display-column candidate-experince-item"
        style={{ gap: 8 }}
      >
        <div className="display-flex-justify align-center">
          <p className="font-14-medium color-dark-black">
            {item?.position} at {item?.company}
          </p>
          {editable && (
            <button
              className="edit-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedExperienceDetails(item);
                setExperienceModalVisible(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </div>
        <div className="display-flex-justify align-center">
          <p className="font-14-regular color-dark-black">{item?.location}</p>
          <p className="font-14-regular color-grey">
            {item?.startDate} - {item?.endDate}
          </p>
        </div>
      </div>
    );
  };

  const renderEducation = (item) => {
    return (
      <div
        key={item?.id}
        className="display-column candidate-experince-item"
        style={{ gap: 8 }}
      >
        <div className="display-flex-justify align-center">
          <p className="font-14-medium color-dark-black">
            {item?.degree} at {item?.course}
          </p>
          {editable && (
            <button
              className="edit-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEducationDetails(item);
                setTimeout(() => {
                  setEducationModalVisible(true);
                }, 300);
              }}
            >
              <EditIcon />
            </button>
          )}
        </div>
        <div className="display-flex-justify align-center">
          <p className="font-14-regular color-dark-black">{item?.collage}</p>
          <p className="font-14-regular color-grey">
            {item?.startDate} - {item?.endDate}
          </p>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="candidate-details-main-container">
        <div className="display-flex-justify align-center">
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <h3 className="font-16-medium color-dark-black text-uppercase">
              {label}
            </h3>
            {editable && (
              <button
                className={`${
                  collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
                }`}
                onClick={() => setCollapse(!collapse)}
              >
                <ArrowIcon />
              </button>
            )}
          </div>
          {editable && (
            <button
              className="add-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (label === "Experience Details") {
                  setExperienceModalVisible(true);
                } else {
                  setEducationModalVisible(true);
                }
              }}
            >
              + Add
            </button>
          )}
        </div>
        {collapse && (
          <>
            <div className="divider-line" />
            <div className="display-column" style={{ gap: 16 }}>
              {data?.map((item) => {
                if (label === "Experience Details") {
                  return renderExperience(item);
                } else {
                  return renderEducation(item);
                }
              })}
            </div>
          </>
        )}
      </div>
      <AddEducationDetailsModal
        visible={educationModalVisible}
        onClose={() => {
          setEducationModalVisible(false);
          setSelectedEducationDetails(null);
        }}
        onAddEducation={handleAddEducation}
        selectedEducationData={selectedEducationDetails}
      />

      <AddExperienceDetailsModal
        visible={experienceModalVisible}
        onClose={() => {
          setExperienceModalVisible(false);
          setSelectedExperienceDetails(null);
        }}
        onAddExperience={handleAddExperience}
        selectedExperienceData={selectedExperienceDetails}
      />
    </>
  );
};

export default CandidateInfoExperience;
