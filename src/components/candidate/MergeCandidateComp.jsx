import React, { useState } from "react";
import "./MergeCandidates.css";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import { ReactComponent as EmptyCircle } from "../../assets/icons/empty-circle.svg";
import CommonDeleteModal from "../modals/CommonDeleteModal";
import { useModal } from "../common/ModalProvider";

const MergeCandidates = ({ candidateData }) => {
  const { candidate1, candidate2 } = candidateData;
    const { modals, setModalVisibility } = useModal();

  const fieldLabels = {
    profile: "Merge profile with",
    resume: "Resume",
    owner: "Owner",
    gender: "Gender",
    date_of_birth: "Date of Birth",
    location: "Location",
    nationality: "Nationality",
    phone_number: "Phone Number",
    email: "Email",
    domain: "Domain",
    years_of_experience: "Years of Experience",
    current_salary: "Current Salary",
    expected_salary: "Expected Salary",
  };

  const formatValue = (value) => {
    if (!value) return "-";
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return value.toString();
  };

  const getInitialSelectedData = () => {
    let initialData = {};
    Object.keys(fieldLabels).forEach((key) => {
      let value1 =
        key === "profile"
          ? candidate1.profile
          : key === "resume"
          ? candidate1.resume
          : key === "owner"
          ? candidate1.owner
          : candidate1.details[key];

      let value2 =
        key === "profile"
          ? candidate2.profile
          : key === "resume"
          ? candidate2.resume
          : key === "owner"
          ? candidate2.owner
          : candidate2.details[key];

      if (JSON.stringify(value1) === JSON.stringify(value2)) {
        initialData[key] = null;
      } else {
        initialData[key] = value1
          ? { value: value1, candidateSide: "candidate1" }
          : value2
          ? { value: value2, candidateSide: "candidate2" }
          : null;
      }
    });
    return initialData;
  };

  const [selectedData, setSelectedData] = useState(getInitialSelectedData());

  const handleSelection = (key, value, candidateSide) => {
    setSelectedData((prev) => ({
      ...prev,
      [key]:
        prev[key]?.candidateSide === candidateSide
          ? null
          : { value, candidateSide },
    }));
  };

  return (
    <div className="merge-container">
      <div
        className="display-column"
        style={{ gap: 10, overflowX: "auto", maxWidth: "100%" }}
      >
        {Object.keys(fieldLabels).map((key, index) => {
          const value1 =
            key === "profile" ? candidate1.profile : candidate1.details[key];
          const value2 =
            key === "profile" ? candidate2.profile : candidate2.details[key];

          return (
            <React.Fragment key={key}>
              <div className="mergeCandidate-div-container">
                <div className="flex-1 font-16-medium color-dark-black">
                  {fieldLabels[key]}
                </div>

                {/* Candidate 1 Column */}
                <div className="field-value flex-1">
                  <div className="flex-1">
                    {key === "profile" ? (
                      <>
                        <div className="profile-info">
                          <img
                            src={candidate1.profile.avatar}
                            alt="Profile"
                            className="profile-image"
                          />
                          <div className="">
                            <strong className="font-16-medium">
                              {candidate1.profile.name}
                            </strong>
                            <p className="font-14-regular text-customGray">
                              {candidate1.profile.id}
                            </p>
                          </div>
                        </div>
                        <button className="font-ubuntu text-m text-buttonBLue mt-[10px]" onClick={()=>setModalVisibility("markDuplicateModalVisible", true)}>
                          Mark not duplicate
                        </button>
                      </>
                    ) : key === "resume" ? (
                      <a
                        href={candidate1.resume.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-ubuntu text-m text-buttonBLue"
                      >
                        {candidate1.resume.label}
                      </a>
                    ) : key === "owner" ? (
                      <div className="owner-info font-14-regular">
                        <img
                          src={candidate1.owner.logo}
                          alt="Company Logo"
                          className="company-logo"
                        />
                        <span>
                          {candidate1.owner.company} -{" "}
                          {candidate1.owner.ownerName}
                        </span>
                      </div>
                    ) : (
                      <span className="font-14-regular">
                        {formatValue(candidate1.details[key])}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleSelection(key, value1, "candidate1")}
                    className="selection-button"
                  >
                    {selectedData[key]?.candidateSide === "candidate1" ? (
                      <TickCircle className="h-[24px] w-[24px]" />
                    ) : (
                      <EmptyCircle />
                    )}
                  </button>
                </div>

                {/* Candidate 2 Column */}
                <div className="field-value flex-1">
                  <div className="flex-1">
                    {key === "profile" ? (
                      <>
                        <div className="profile-info">
                          <img
                            src={candidate2.profile.avatar}
                            alt="Profile"
                            className="profile-image"
                          />
                          <div>
                            <strong className="font-16-medium">
                              {candidate1.profile.name}
                            </strong>
                            <p className="font-14-regular text-customGray">
                              {candidate1.profile.id}
                            </p>
                          </div>
                        </div>
                        <button className="font-ubuntu text-m text-buttonBLue mt-[10px]" onClick={()=>setModalVisibility("markDuplicateModalVisible", true)}>
                          Mark not duplicate
                        </button>
                      </>
                    ) : key === "resume" ? (
                      <a
                        href={candidate2.resume.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-ubuntu text-m text-buttonBLue"
                      >
                        {candidate2.resume.label}
                      </a>
                    ) : key === "owner" ? (
                      <div className="owner-info font-14-regular">
                        <img
                          src={candidate2.owner.logo}
                          alt="Company Logo"
                          className="company-logo"
                        />
                        <span>
                          {candidate2.owner.company} -{" "}
                          {candidate2.owner.ownerName}
                        </span>
                      </div>
                    ) : (
                      <span className="font-14-regular">
                        {formatValue(candidate2.details[key])}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleSelection(key, value2, "candidate2")}
                    className="selection-button"
                  >
                    {selectedData[key]?.candidateSide === "candidate2" ? (
                      <TickCircle className="h-[24px] w-[24px]" />
                    ) : (
                      <EmptyCircle />
                    )}
                  </button>
                </div>
              </div>
              {Object.keys(fieldLabels).length - 1 !== index && (
                <div className="divider-line" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <CommonDeleteModal
        visible={modals?.markDuplicateModalVisible}
        title={"Mark Not Duplicate"}
        description={"Are you sure you want to mark this candidate as not duplicate?"}
        btnTitle={'Confirm'}
        onClose={() => {
          setModalVisibility("markDuplicateModalVisible", false);
          // setSelectedItem(null);
        }}
        // onClickDelete={deleteCategory}
      />
    </div>
  );
};

export default MergeCandidates;
