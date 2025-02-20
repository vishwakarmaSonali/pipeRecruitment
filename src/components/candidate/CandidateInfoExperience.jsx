import React, { useState } from "react";
import "./index.css";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/more.svg";
import { commonStyle } from "../../helpers/config";
import { Menu } from "@mui/material";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";

const CandidateInfoExperience = ({ label, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [collapse, setCollapse] = useState(true);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
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
          <button className="edit-details-btn">
            <EditIcon />
          </button>
          {/* <button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreIcon width={14} height={14} />
          </button> */}
          {/* <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: commonStyle.sx,
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="display-column">
              <button className="common-menu-item-btn">Edit</button>
              <button className="common-menu-item-btn">Delete</button>
            </div>
          </Menu> */}
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
          <button className="edit-details-btn">
            <EditIcon />
          </button>
          {/* <button
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MoreIcon width={14} height={14} />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: commonStyle.sx,
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="display-column">
              <button className="common-menu-item-btn">Edit</button>
              <button className="common-menu-item-btn">Delete</button>
            </div>
          </Menu> */}
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
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
          <button
            className={`${
              collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <ArrowIcon />
          </button>
        </div>
        <button className="add-details-btn">+ Add</button>
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          <div className="display-column" style={{ gap: 16 }}>
            {data?.map((item) => {
              if (label === "Experience") {
                return renderExperience(item);
              } else {
                return renderEducation(item);
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateInfoExperience;
