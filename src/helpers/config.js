import React, { useState, useEffect } from "react";
import {
  blueDesign,
  designStudio,
  even,
  general,
  nord,
  techwave,
  uptech,
} from "./assets";
import { ReactComponent as LinkedIn } from "../assets/icons/sociallinks/linkedin.svg";
import { ReactComponent as Facebook } from "../assets/icons/sociallinks/facebook.svg";
import { ReactComponent as Github } from "../assets/icons/sociallinks/github.svg";
import { ReactComponent as Twitter } from "../assets/icons/sociallinks/twitter.svg";

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

export const comapnyListing = [
  {
    id: 1,
    name: "General",
    logo: general,
    position: null,
  },
  {
    id: 2,
    name: "UpTech",
    logo: uptech,
    position: "UI Designer",
  },
  {
    id: 3,
    name: "DesignScape Studios",
    logo: designStudio,
    position: "UI UX Designer",
  },
  {
    id: 4,
    name: "NordSoft Solutions",
    logo: nord,
    position: "UI UX Designer",
  },
  {
    id: 5,
    name: "Even Solutions",
    logo: even,
    position: "UI UX Designer",
  },
  {
    id: 6,
    name: "BlueDesign Studio",
    logo: blueDesign,
    position: "UI Designer",
  },
  {
    id: 7,
    name: "TechWave",
    logo: techwave,
    position: "UI Designer",
  },
];

export const jobData = [
  {
    id: 1,
    jobName: "DesignScape Studios",
    type: "Client Interview",
  },
  {
    id: 2,
    jobName: "UpTech",
    type: "New Candidate",
  },
  {
    id: 3,
    jobName: "NordSoft Solutions",
    type: "New Candidate",
  },
  {
    id: 4,
    jobName: "Even Solutions",
    type: "New Candidate",
  },
  {
    id: 5,
    jobName: "Passion Infotech",
    type: "Client Interview",
  },
  {
    id: 6,
    jobName: "BlueDesign Studio",
    type: "Assignment",
  },
  {
    id: 7,
    jobName: "TechWave",
    type: "New Candidate",
  },
];

export const experienceData = [
  {
    id: 1,
    position: "UI/UX Designer",
    company: "DesignScape Studios",
    location: "Mumbai, Maharastra, India",
    startDate: "March 2021",
    endDate: "February 2022",
  },
  {
    id: 2,
    position: "Junior UI/UX Designer",
    company: "PixelCraft Solutions",
    location: "Bangalore, Karnataka, India",
    startDate: "July 2019",
    endDate: "February 2021",
  },
];

export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Design (B.Des)",
    course: "Visual Communication",
    collage: "National Institute of Design (NID), Ahmedabad",
    startDate: "September 2015",
    endDate: "May 2019",
  },
];

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

export const languagesOptions = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    region: "Worldwide",
    script: "Latin",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    region: "Spain, Latin America",
    script: "Latin",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    region: "France, Canada, Africa",
    script: "Latin",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    region: "Germany, Austria, Switzerland",
    script: "Latin",
  },
  {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    region: "China, Taiwan, Singapore",
    script: "Chinese",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    region: "India",
    script: "Devanagari",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    region: "Middle East, North Africa",
    script: "Arabic",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    region: "Russia, Eastern Europe",
    script: "Cyrillic",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    region: "Japan",
    script: "Kanji, Hiragana, Katakana",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    region: "Portugal, Brazil",
    script: "Latin",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    region: "Italy, Switzerland",
    script: "Latin",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    region: "South Korea, North Korea",
    script: "Hangul",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    region: "Bangladesh, India",
    script: "Bengali",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    region: "Turkey",
    script: "Latin",
  },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    region: "Vietnam",
    script: "Latin",
  },
  {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
    region: "Thailand",
    script: "Thai",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    region: "Poland",
    script: "Latin",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    region: "Netherlands, Belgium",
    script: "Latin",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    region: "Sweden",
    script: "Latin",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    region: "Greece, Cyprus",
    script: "Greek",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    region: "Israel",
    script: "Hebrew",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    region: "Pakistan, India",
    script: "Arabic",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    region: "Iran, Afghanistan, Tajikistan",
    script: "Arabic, Cyrillic (Tajik)",
  },
];

export const icons = {
  linkedin_url: <LinkedIn />,
  twitter_url: <Twitter />,
  github_url: <Github />,
  facebook_url: <Facebook />,
};

export const jobsTableHeaderData = [
  "Job Position",
  "Client Name",
  "Location",
  "Job Stage",
  "Created Date",
  "Created By",
];

export const candidateJobData = [
  {
    id: 1,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
  {
    id: 2,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
  {
    id: 3,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
  {
    id: 4,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
  {
    id: 5,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
  {
    id: 6,
    job_position: "UI UX Designer",
    client_data: {
      name: "DesignScape Studios",
      image: "",
    },
    location: "Mumbai, India",
    job_stage: "Client Interview",
    create_date: "December 28, 2024",
    created_by: {
      name: "xBoost",
      image: "",
    },
  },
];

export const attachmentsHeaderData = [
  "File Name",
  "File Type",
  "Uploaded Date",
];

export const attachmentListData = [
  {
    id: 1,
    file_name: "documents.zip",
    file_type: "zip",
    uploaded_date: "February 26, 2025 • 8:14 AM",
  },
  {
    id: 2,
    file_name: "Priya-Sharma-Assignment.pdf",
    file_type: "pdf",
    uploaded_date: "January 31, 2025 • 04:51 PM",
  },
  {
    id: 3,
    file_name: "Priya-Sharma.jpg",
    file_type: "image",
    uploaded_date: "January 25, 2025 • 11:26 AM",
  },
  {
    id: 4,
    file_name: "Priya-Sharma-Resume.doc",
    file_type: "document",
    uploaded_date: "January 25, 2025 • 11:26 AM",
  },
];

export const historyHeaderData = ["User", "Action", "Date & Time"];

export const historyData = [
  {
    id: 1,
    user: {
      name: "xBoost",
      image: "",
    },
    action: "Updated candidate",
    date: "January 15, 2025 • 6:12 PM",
  },
  {
    id: 2,
    user: {
      name: "xBoost",
      image: "",
    },
    action: "Updated candidate",
    date: "January 11, 2025 • 6:12 PM",
  },
  {
    id: 3,
    user: {
      name: "xBoost",
      image: "",
    },
    action: "Moved candidate from stage new candidate to assignmnet",
    date: "January 05, 2025 • 6:12 PM",
  },
  {
    id: 4,
    user: {
      name: "xBoost",
      image: "",
    },
    action: "Updated candidate",
    date: "January 11, 2025 • 6:12 PM",
  },
];

export const demoDescriptionText =
  "<p>A creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutions.</p>";
