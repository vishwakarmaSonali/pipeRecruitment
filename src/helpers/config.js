import React, { useState, useEffect } from "react";

export const usePersistentState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export const jobOptions = [
  { id: 1, value: "UpTech", place: "New York, USA" },
  { id: 2, value: "WebSolutions", place: "Sydney, Australia" },
  { id: 3, value: "Spark Solutions", place: "New York, USA" },
  { id: 4, value: "KiwiTech Ltd.", place: "Auckland, New Zealand" },
];

export const historyResumeData = [
  {
    importName: "Resume upload 01-04-2025",
    fileCount: "03",
    status: "Completed",
    importedBy: {
      name: "Grown",
      image: "https://example.com/avatar1.png",
    },
    createdOn: "January 04, 2025",
    completedOn: "January 04, 2025",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Ipside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Upside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Ipside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Ipside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
  {
    importName: "Resume upload 12-20-2024",
    fileCount: "11",
    status: "Completed",
    importedBy: {
      name: "Ipside",
      image: "https://example.com/avatar2.png",
    },
    createdOn: "December 20, 2024",
    completedOn: "December 20, 2024",
  },
];

export const resumeUploadedData = [
  {
    status: "Completed",
    importedBy: {
      name: "Priya Sharma",
      image: "https://example.com/avatar2.png",
    },
  },
  {
    status: "Completed",
    importedBy: {
      name: "Michael Bennett",
      image: "https://example.com/avatar2.png",
    },
  },
  {
    status: "Completed",
    importedBy: {
      name: "Maria Gonzalez",
      image: "https://example.com/avatar2.png",
    },
  },
];

export const commonStyle = {
  sx: {
    boxShadow: "-1px 4px 18px 0px #0000002E",
    borderRadius: "12px",
    width: "180px",
    padding: "0px !important",
    marginTop: "10px",
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: "12px",
    lineHeight: "13.79px",
    color: "#151B23",
    boxSizing: "border-box !important",
    "& .MuiMenu-list": {
      padding: "0px !important",
    },
  },
};

export const defaultCategoryData = [
  {
    id: 1,
    name: "Candidate Details",
    fields: [
      { id: 1, name: "Candidate Name" },
      { id: 2, name: "Candidate First Name" },
      { id: 3, name: "Candidate Last Name" },
      { id: 4, name: "Gender" },
      { id: 5, name: "Date of Birth" },
      { id: 6, name: "Current Address" },
      { id: 7, name: "Candidate Email Address" },
      { id: 8, name: "Candidate Phone Number" },
      { id: 9, name: "Skype" },
      { id: 10, name: "Other Contact" },
      { id: 11, name: "University" },
      { id: 12, name: "Current Company" },
      { id: 13, name: "Current Position" },
      { id: 14, name: "Candidate Location" },
    ],
  },
  {
    id: 2,
    name: "Placement Details",
    fields: [
      { id: 1, name: "Employment Status" },
      { id: 2, name: "Hired Date" },
      { id: 3, name: "Hired Date" },
      { id: 4, name: "Probation End Date" },
      { id: 5, name: "Left Date" },
      { id: 6, name: "Placement Job" },
      { id: 7, name: "Placement Client" },
    ],
  },
  { id: 3, name: "Log Book" },
  { id: 4, name: "Recent Activity History" },
  { id: 5, name: "Addresses" },
  { id: 6, name: "Dependent" },
  { id: 7, name: "Emergency Contacts" },
  { id: 8, name: "Skills" },
  {
    id: 9,
    name: "Additional Information",
    fields: [
      { id: 1, name: "Candidate Domain" },
      { id: 2, name: "Nationalities" },
      { id: 3, name: "Languages" },
      { id: 4, name: "Current Salary" },
      { id: 5, name: "Expected Salary" },
      { id: 6, name: "Notice Period" },
      { id: 7, name: "GDPR Consent" },
      { id: 8, name: "Email Consent" },
    ],
  },
  { id: 10, name: "Experience" },
  { id: 11, name: "Education" },
  { id: 12, name: "Jobs" },
  { id: 13, name: "Folders" },
];
