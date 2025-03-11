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
import {
  formatDateMonthYear,
  notifyError,
  notifySuccess,
} from "../../helpers/utils";
import { updateCandidateDetails } from "../../actions/candidateActions";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CandidateInfoExperience = ({ key, label, data, editable, isLoading }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { candidateId } = useSelector((state) => state?.candidates);
  const [collapse, setCollapse] = useState(true);
  const [educationModalVisible, setEducationModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [experienceData, setExperienceData] = useState(data);
  const [educationData, setEducationData] = useState(data);
  const [selectedEducationDetails, setSelectedEducationDetails] =
    useState(null);
  const [selectedExperienceDetails, setSelectedExperienceDetails] =
    useState(null);

  const [selectedExperienceIndex, setSelectedExperienceIndex] = useState(null);
  const [selectedEducationIndex, setSelectedEducationIndex] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleAddEducation = (details) => {
    if (selectedEducationIndex) {
      setUpdateLoading(true);
      const updatedData = educationData?.map((item, index) => {
        if (index === selectedEducationIndex - 1) {
          return details;
        } else {
          return item;
        }
      });

      const httpBody = {
        education: [...updatedData],
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setEducationData([...updatedData]);
            setEducationModalVisible(false);
            setSelectedEducationIndex(null);
            setSelectedEducationDetails(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setEducationModalVisible(false);
            setSelectedEducationIndex(null);
            setSelectedEducationDetails(null);
            setUpdateLoading(false);
          }
        }
      );
    } else {
      setUpdateLoading(true);
      const updatedData = [...educationData, details];
      const httpBody = {
        education: updatedData,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            setUpdateLoading(false);
            notifySuccess(response?.message);
            setEducationData([...updatedData]);
            setEducationModalVisible(false);
          } else {
            setUpdateLoading(false);
            notifyError(response);
            setEducationModalVisible(false);
          }
        }
      );
    }
  };

  const handleRemoveEducation = () => {
    if (selectedEducationIndex) {
      setDeleteLoading(true);
      const updatedData = educationData?.filter((item, index) => {
        return selectedEducationIndex - 1 !== index;
      });

      const httpBody = {
        education: [...updatedData],
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setEducationData([...updatedData]);
            setEducationModalVisible(false);
            setSelectedEducationIndex(null);
            setSelectedEducationDetails(null);
            setDeleteLoading(false);
          } else {
            notifyError(response);
            setEducationModalVisible(false);
            setSelectedEducationIndex(null);
            setSelectedEducationDetails(null);
            setDeleteLoading(false);
          }
        }
      );
    }
  };

  const handleAddExperience = (details) => {
    if (selectedExperienceIndex) {
      setUpdateLoading(true);
      const updatedData = experienceData?.map((item, index) => {
        if (index === selectedExperienceIndex - 1) {
          return details;
        } else {
          return item;
        }
      });

      const httpBody = {
        employment_history: [...updatedData],
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setExperienceData([...updatedData]);
            setExperienceModalVisible(false);
            setSelectedExperienceIndex(null);
            setSelectedExperienceDetails(null);
            setUpdateLoading(false);
          } else {
            notifyError(response);
            setExperienceModalVisible(false);
            setSelectedExperienceIndex(null);
            setSelectedExperienceDetails(null);
            setUpdateLoading(false);
          }
        }
      );
    } else {
      setUpdateLoading(true);
      const updatedData = [...experienceData, details];
      const httpBody = {
        employment_history: updatedData,
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            setUpdateLoading(false);
            notifySuccess(response?.message);
            setExperienceData([...updatedData]);
            setExperienceModalVisible(false);
          } else {
            setUpdateLoading(false);
            notifyError(response);
            setExperienceModalVisible(false);
          }
        }
      );
    }
  };

  const handleRemoveExperience = () => {
    if (selectedExperienceIndex) {
      setDeleteLoading(true);
      const updatedData = experienceData?.filter((item, index) => {
        return selectedExperienceIndex - 1 !== index;
      });

      const httpBody = {
        employment_history: [...updatedData],
      };

      dispatch(updateCandidateDetails(candidateId, httpBody)).then(
        (response) => {
          if (response?.success) {
            notifySuccess(response?.message);
            setExperienceData([...updatedData]);
            setExperienceModalVisible(false);
            setSelectedExperienceIndex(null);
            setSelectedExperienceDetails(null);
            setDeleteLoading(false);
          } else {
            notifyError(response);
            setExperienceModalVisible(false);
            setSelectedExperienceIndex(null);
            setSelectedExperienceDetails(null);
            setDeleteLoading(false);
          }
        }
      );
    }
  };

  const renderExperience = (item, index) => {
    return (
      <div
        key={index}
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
                setSelectedExperienceIndex(index + 1);
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
            {formatDateMonthYear(item?.start_date)} -{" "}
            {item?.current ? "Present" : formatDateMonthYear(item?.end_date)}
          </p>
        </div>
      </div>
    );
  };

  const renderEducation = (item, index) => {
    return (
      <div
        key={index}
        className="display-column candidate-experince-item"
        style={{ gap: 8 }}
      >
        <div className="display-flex-justify align-center">
          <p className="font-14-medium color-dark-black">
            {item?.degree} in {item?.field_of_study}
          </p>
          {editable && (
            <button
              className="edit-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEducationIndex(index + 1);
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
          <p className="font-14-regular color-dark-black">{item?.school}</p>
          <p className="font-14-regular color-grey">
            {formatDateMonthYear(item?.start_date)} -{" "}
            {formatDateMonthYear(item?.end_date)}
          </p>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="candidate-details-main-container">
        <div className="display-flex-justify align-center">
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <Skeleton width={200} height={20} />
          </div>
        </div>
        <div className="divider-line" />
        <div
          className="display-flex candidate-experince-item"
          style={{ gap: 8 }}
        >
          <Skeleton containerClassName="flex-1" height={100} />
        </div>
      </div>
    );
  }
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
              {label === "Experience Details"
                ? experienceData?.length > 0
                  ? experienceData?.map((item, index) => {
                      return renderExperience(item, index);
                    })
                  : editable && (
                      <button
                        className="add-details-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExperienceModalVisible(true);
                        }}
                      >
                        + Add
                      </button>
                    )
                : educationData?.length > 0
                ? educationData?.map((item, index) => {
                    return renderEducation(item, index);
                  })
                : editable && (
                    <button
                      className="add-details-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEducationModalVisible(true);
                      }}
                    >
                      + Add
                    </button>
                  )}
            </div>
          </>
        )}
      </div>
      <AddEducationDetailsModal
        visible={educationModalVisible}
        onClose={() => {
          setEducationModalVisible(false);
          setSelectedEducationDetails(null);
          setSelectedEducationIndex(null);
        }}
        onAddEducation={handleAddEducation}
        selectedEducationData={selectedEducationDetails}
        isLoading={updateLoading}
        onRemoveEducation={handleRemoveEducation}
        removeLoading={deleteLoading}
      />

      <AddExperienceDetailsModal
        visible={experienceModalVisible}
        onClose={() => {
          setExperienceModalVisible(false);
          setSelectedExperienceDetails(null);
          setSelectedExperienceIndex(null);
        }}
        onAddExperience={handleAddExperience}
        selectedExperienceData={selectedExperienceDetails}
        isLoading={updateLoading}
        onRemoveExperience={handleRemoveExperience}
        removeLoading={deleteLoading}
      />
    </>
  );
};

export default CandidateInfoExperience;
