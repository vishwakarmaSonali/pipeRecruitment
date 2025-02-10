import React, { useState } from "react";
import "./index.css";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/more.svg";
import { commonStyle } from "../../helpers/config";
import { Menu } from "@mui/material";

const CandidateInfoExperience = ({ label, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderExperience = (item) => {
    return (
      <div key={item?.id} className="display-column" style={{ gap: 8 }}>
        <div className="display-flex-justify">
          <p className="font-14-medium color-dark-black">
            {item?.position} at {item?.company}
          </p>
          <button
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
          </Menu>
        </div>
        <p className="font-14-regular color-dark-black">{item?.location}</p>
        <p className="font-14-regular color-grey">
          {item?.startDate} - {item?.endDate}
        </p>
      </div>
    );
  };

  const renderEducation = (item) => {
    return (
      <div key={item?.id} className="display-column" style={{ gap: 8 }}>
        <div className="display-flex-justify">
          <p className="font-14-medium color-dark-black">
            {item?.degree} at {item?.course}
          </p>
          <button
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
          </Menu>
        </div>
        <p className="font-14-regular color-dark-black">{item?.collage}</p>
        <p className="font-14-regular color-grey">
          {item?.startDate} - {item?.endDate}
        </p>
      </div>
    );
  };
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <h3 className="font-16-medium color-dark-black text-uppercase">
          {label}
        </h3>
        <button className="add-details-btn">+ Add</button>
      </div>
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
    </div>
  );
};

export default CandidateInfoExperience;
