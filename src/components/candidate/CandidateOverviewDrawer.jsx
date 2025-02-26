import React from "react";
import { Drawer } from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import "./index.css";
import ProfessionalDetails from "./ProfessionalDetails";
import {
  candidateDetailsData,
  contactDetails,
  educationData,
  experienceData,
  professionalDetails,
} from "../../helpers/config";
import CandidateDescription from "./CandidateDescription";
import CandidateOverviewDetails from "./CandidateOverviewDetails";
import CandidateInfoExperience from "./CandidateInfoExperience";

const CandidateOverviewDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-overview-drawer">
        <div className="flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">
            Candidate Overview
          </h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div
          className="display-flex flex-1"
          style={{ overflowY: "auto", gap: 12 }}
        >
          <div className="display-column flex-1" style={{ gap: 12 }}>
            <CandidateOverviewDetails
              details={candidateDetailsData}
              label={"Candidate Details"}
            />

            <CandidateOverviewDetails
              label={"Contact Details"}
              details={contactDetails}
            />

            <CandidateDescription label={"Candidate Description"} />
          </div>
          <div className="display-column flex-1" style={{ gap: 12 }}>
            <CandidateOverviewDetails
              label={"Professional Details"}
              details={professionalDetails}
            />

            <CandidateInfoExperience
              label={"Experience Details"}
              data={experienceData}
            />

            <CandidateInfoExperience
              label={"Education Details"}
              data={educationData}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CandidateOverviewDrawer;
