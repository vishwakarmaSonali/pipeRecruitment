import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

const CandidateOverviewDrawer = ({ isOpen, onClose }) => {
  const { candidateInfo, candidateDetailsLoading } = useSelector(
    (state) => state.candidates
  );
  const [summaryStructuredData, setSummaryStructuredData] = useState(
    candidateInfo?.structuredCandidate || {}
  );

  const [candidateRawData, setCandidateRawData] = useState(
    candidateInfo?.raw_data || {}
  );

  useEffect(() => {
    setSummaryStructuredData(candidateInfo?.structuredCandidate || {});
    setCandidateRawData(candidateInfo?.raw_data || {});
  }, [candidateInfo]);
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
            {Object.entries(summaryStructuredData)
              .sort((a, b) => (a[1]?.order || 0) - (b[1]?.order || 0))
              .map(([key, value]) => {
                const mappedCandidateDetailsFields = value?.fields?.reduce(
                  (acc, field) => {
                    acc[field.label] = {
                      value: field.value,
                      type: field.type,
                      options: field.options,
                      order: field.order,
                      default: field.default,
                      fe_input_type: field.fe_input_type,
                      hide: field.hide,
                    };
                    return acc;
                  },
                  {}
                );
                if (key === "candidate_description") {
                  return (
                    <CandidateDescription
                      label={value?.label}
                      editable={false}
                      data={value?.fields[0]?.value || ""}
                      isLoading={candidateDetailsLoading}
                    />
                  );
                } else if (key === "candidateDetails") {
                  return (
                    <CandidateOverviewDetails
                      details={
                        key === "skills" ? value : mappedCandidateDetailsFields
                      }
                      label={"Candidate Details"}
                      rawData={candidateRawData}
                    />
                  );
                } else if (key === "contact_details") {
                  return (
                    <CandidateOverviewDetails
                      details={mappedCandidateDetailsFields}
                      label={"Candidate Details"}
                    />
                  );
                } else {
                  return;
                }
              })}
          </div>
          <div className="display-column flex-1" style={{ gap: 12 }}>
            {Object.entries(summaryStructuredData)
              .sort((a, b) => (a[1]?.order || 0) - (b[1]?.order || 0))
              .map(([key, value]) => {
                const mappedCandidateDetailsFields = value?.fields?.reduce(
                  (acc, field) => {
                    acc[field.label] = {
                      value: field.value,
                      type: field.type,
                      options: field.options,
                      order: field.order,
                      default: field.default,
                      fe_input_type: field.fe_input_type,
                      hide: field.hide,
                    };
                    return acc;
                  },
                  {}
                );
                if (key === "professional_details") {
                  return (
                    <CandidateOverviewDetails
                      details={
                        key === "skills" ? value : mappedCandidateDetailsFields
                      }
                      label={"Professional Details"}
                      rawData={candidateRawData}
                    />
                  );
                } else if (key === "employment_history") {
                  return (
                    <CandidateInfoExperience
                      key={key}
                      label={"Experience Details"}
                      data={value?.data || []}
                      editable={false}
                      isLoading={candidateDetailsLoading}
                    />
                  );
                } else if (key === "education") {
                  return (
                    <CandidateInfoExperience
                      key={key}
                      label={"Education Details"}
                      data={value?.data || []}
                      editable={false}
                      isLoading={candidateDetailsLoading}
                    />
                  );
                } else {
                  return;
                }
              })}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CandidateOverviewDrawer;
