import React, { useState } from "react";
import "./index.css";
import { Menu } from "@mui/material";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import HtmlViewComponent from "../common/HtmlViewComponent";
import { demoDescriptionText } from "../../helpers/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { updateCandidateDetails } from "../../actions/candidateActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccess } from "../../helpers/utils";

const CandidateDescription = ({ label, data, editable, isLoading }) => {
  const dispatch = useDispatch();
  const { candidateId } = useSelector((state) => state?.candidates);
  const [collapse, setCollapse] = useState(true);
  const [description, setDescription] = useState(data);
  const [edit, setEdit] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const descriptionSaveHandler = () => {
    setUpdateLoading(true);
    const httpBody = {
      description: description,
    };
    dispatch(updateCandidateDetails(candidateId, httpBody)).then((response) => {
      if (response?.success) {
        notifySuccess(response?.message);
        setEdit(false);
        setUpdateLoading(false);
      } else {
        notifyError(response);
        setUpdateLoading(false);
      }
    });
  };

  if (isLoading || updateLoading) {
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
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          {edit ? (
            <div
              className="flex-1 display-flex align-center"
              style={{ gap: 8 }}
            >
              <div className="flex-1">
                <HtmlViewComponent
                  value={description}
                  onChange={setDescription}
                  placeholder={"Add Description"}
                  toolbarId={"t1"}
                />
              </div>
              <div
                className="display-flex"
                style={{ gap: 8, alignSelf: "flex-start" }}
              >
                <button
                  onClick={() => {
                    setDescription(data);
                    setEdit(false);
                  }}
                >
                  <CancleIcon />
                </button>
                <button onClick={descriptionSaveHandler}>
                  <RightIcon />
                </button>
              </div>
            </div>
          ) : !!description ? (
            <div
              className="display-flex candidate-experince-item"
              style={{ gap: 8 }}
            >
              <p
                className="font-14-regular color-dark-black"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
              {editable && (
                <button
                  className="edit-details-btn"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setEdit(true)}
                >
                  <EditIcon />
                </button>
              )}
            </div>
          ) : editable ? (
            <button
              className="add-details-btn"
              onClick={(e) => {
                e.stopPropagation();
                setEdit(true);
              }}
            >
              + Add
            </button>
          ) : (
            <span className="font-14-regular color-dark-black text-center">
              Not Found
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default CandidateDescription;
