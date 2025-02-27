import React from "react";
import "./index.css";
import Navbar from "../../components/navbar/Navbar";
import CancelButton from "../../components/common/CancelButton";
import CommonButton from "../../components/common/CommonButton";
import { useNavigate } from "react-router-dom";
import { ReactComponent as OriginalResumeIcon } from "../../assets/images/resume/original.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/plusIcon.svg";
import CommonAddButton from "../../components/common/CommonAddButton";

const OriginalResumePage = () => {
  const navigate = useNavigate();

  const backHandler = () => {
    navigate(-1);
  };

  const renderHeaderComponent = () => {
    return (
      <div className="resume-header-div position-sticky">
        <p className="font-22-medium color-dark-black">Original</p>
        <div className="display-flex" style={{ gap: 8 }}>
          <CancelButton title={"Back"} onClick={backHandler} />
          <CommonButton title={"Branded Resume"} />
        </div>
      </div>
    );
  };

  const renderEmptyComponent = () => {
    return (
      <div
        className="display-column"
        style={{ gap: 40, maxWidth: 400, overflowY: "auto" }}
      >
        <div
          className="display-column align-center justify-center"
          style={{ gap: 14 }}
        >
          <OriginalResumeIcon />
          <div className="display-column" style={{ gap: 8 }}>
            <p className="font-14-medium color-dark-black text-center">
              No Resume
            </p>
            <p className="font-14-regular color-grey text-center">
              There is no resume available for this candidate. Upload a resume
              or make a custom CV of your choice.
            </p>
          </div>
        </div>
        <div className="display-flex justify-center" style={{ gap: 8 }}>
          <CommonAddButton
            title={"Create Custom CV"}
            icon={<AddIcon stroke="#1761D8" />}
            btnStyle={{
              backgroundColor: "transparent",
              border: "1px solid #1761D8",
              color: "#1761D8",
              alignSelf: "center",
            }}
          />
          <CommonAddButton
            title={"Upload Resume"}
            icon={<AddIcon stroke="white" />}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="sourcing-main-container">
      <Navbar />
      {renderHeaderComponent()}
      <div className="flex-1 display-flex align-center justify-center">
        {renderEmptyComponent()}
      </div>
    </div>
  );
};

export default OriginalResumePage;
