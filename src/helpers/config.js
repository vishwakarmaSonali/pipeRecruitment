import React, { useState, useEffect } from "react";
import {
  blueDesign,
  designStudio,
  even,
  general,
  nord,
  techwave,
  uptech,
  pdf,
  jpg,
  zip,
  doc,
  docs,
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
  sx120: {
    boxShadow: "-1px 4px 18px 0px #0000002E",
    borderRadius: "12px",
    width: "120px",
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
    description:
      "<p>At DesignScape Studios, I have been responsible for leading end-to-end design processes for various web and mobile applications. My role involves conducting user research, wireframing, prototyping, and usability testing to create seamless and engaging user experiences.</p><p><br></p><p><strong>Key Responsibilities &amp; Achievements:</strong></p><ul><li>Led user research initiatives, conducting interviews and usability tests to gather insights.</li><li>Designed high-fidelity wireframes, UI mockups, and interactive prototypes using Figma and Adobe XD.</li><li>Developed and maintained design systems to ensure consistency across products.</li><li>Worked closely with developers, product managers, and stakeholders to bring designs to life.</li><li>Conducted A/B testing and user feedback analysis to refine designs and improve usability.</li><li>Organized and participated in design thinking workshops, fostering a culture of innovation.</li></ul><p><br></p><p>Through this role, I have honed my skills in responsive design, accessibility standards, and user psychology while also taking part in mentoring junior designers and streamlining the design workflow.</p>",
  },
  {
    id: 2,
    position: "Junior UI/UX Designer",
    company: "PixelCraft Solutions",
    location: "Bangalore, Karnataka, India",
    startDate: "July 2019",
    endDate: "February 2021",
    description:
      "<p>At DesignScape Studios, I have been responsible for leading end-to-end design processes for various web and mobile applications. My role involves conducting user research, wireframing, prototyping, and usability testing to create seamless and engaging user experiences.</p><p><br></p><p><strong>Key Responsibilities &amp; Achievements:</strong></p><ul><li>Led user research initiatives, conducting interviews and usability tests to gather insights.</li><li>Designed high-fidelity wireframes, UI mockups, and interactive prototypes using Figma and Adobe XD.</li><li>Developed and maintained design systems to ensure consistency across products.</li><li>Worked closely with developers, product managers, and stakeholders to bring designs to life.</li><li>Conducted A/B testing and user feedback analysis to refine designs and improve usability.</li><li>Organized and participated in design thinking workshops, fostering a culture of innovation.</li></ul><p><br></p><p>Through this role, I have honed my skills in responsive design, accessibility standards, and user psychology while also taking part in mentoring junior designers and streamlining the design workflow.</p>",
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
    description:
      "<p>At DesignScape Studios, I have been responsible for leading end-to-end design processes for various web and mobile applications. My role involves conducting user research, wireframing, prototyping, and usability testing to create seamless and engaging user experiences.</p><p><br></p><p><strong>Key Responsibilities &amp; Achievements:</strong></p><ul><li>Led user research initiatives, conducting interviews and usability tests to gather insights.</li><li>Designed high-fidelity wireframes, UI mockups, and interactive prototypes using Figma and Adobe XD.</li><li>Developed and maintained design systems to ensure consistency across products.</li><li>Worked closely with developers, product managers, and stakeholders to bring designs to life.</li><li>Conducted A/B testing and user feedback analysis to refine designs and improve usability.</li><li>Organized and participated in design thinking workshops, fostering a culture of innovation.</li></ul><p><br></p><p>Through this role, I have honed my skills in responsive design, accessibility standards, and user psychology while also taking part in mentoring junior designers and streamlining the design workflow.</p>",
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
  LinkedIn: <LinkedIn />,
  X: <Twitter />,
  GitHub: <Github />,
  Facebook: <Facebook />,
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
  "<p>A creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutionsA creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutions.A creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutions.A creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutions..</p>";

export const extensions = {
  jpg: jpg,
  pdf: pdf,
  doc: doc,
  docs: docs,
  zip: zip,
  png: jpg,
  jpeg: jpg,
};

export const genderOption = [
  {
    id: 1,
    type: "Female",
  },
  {
    id: 2,
    type: "Male",
  },
  {
    id: 3,
    type: "Other",
  },
];

export const employmentStatus = [
  {
    id: 1,
    status: "Hired",
  },
  {
    id: 2,
    status: "Probation",
  },
  {
    id: 3,
    status: "Employed",
  },
  {
    id: 4,
    status: "Left Organization",
  },
];

export const candidateTableHeader = [
  "Candidate Name",
  "Candidate First Name",
  "Candidate Last Name",
  "Reference Id",
  "Location",
  "Gender",
  "Diploma",
  "University",
  "Current Company",
  "Current Position",
  "Email",
  "Birthdate",
  "Candidate Address",
  "Employment Status",
  "Contact Number",
  "Hired Date",
  "Start Date",
  "ATS score",
  "Created Date",
  "Created By",
];

export const columnMapping = {
  "Candidate Name": "candidate_name",
  "Candidate First Name": "candidate_first_name",
  "Candidate Last Name": "candidate_last_name",
  "Reference Id": "reference_id",
  Location: "location",
  Gender: "gender",
  Diploma: "diploma",
  University: "university",
  "Current Company": "current_company",
  "Current Position": "current_position",
  Email: "email",
  Birthdate: "birthDate",
  "Candidate Address": "candidate_address",
  "Employment Status": "employment_status",
  "Contact Number": "phone",
  "Hired Date": "hired_date",
  "Start Date": "start_date",
  "ATS score": "ats_score",
  "Created Date": "created_at",
  "Created By": "created_by",
};

export const archivedCandidateHeader = [
  "Candidate Name",
  "Owner",
  "Archived Date",
  
];

export const archivedColumnMapping = {
  "Candidate Name": "candidate_name",
  Owner: "owner",
  "Archived Date": "archived_date",
};

export const candidateDetailsData = {
  "First Name": "Priya",
  "Last Name": "Sharma",
  "Candidate Reference": "P5L9B",
  Gender: "Female",
  "Date of Birth": "September 14, 1990",
  Location: "Mumbai, India",
  Nationality: "Indian",
  Languages: ["English", "Hindi"],
};

export const language = {
  English: "Advanced",
  Hindi: "Native",
};

export const contactDetails = {
  "Phone Number": "919664866848",
  "Email Id": "priya.s@designscape.com",
  "Social Links": {
    linkedin_url: "http://www.linkedin.com/in/himanshu-singh-861209b8",
    twitter_url: null,
    github_url: null,
    facebook_url: null,
  },
};

export const skillData = [
  {
    id: 1,
    name: "UI Design",
    rating: "08",
  },
  {
    id: 2,
    name: "UX Design",
    rating: "09",
  },
  {
    id: 3,
    name: "Figma",
    rating: "09",
  },
  {
    id: 4,
    name: "Sketch",
    rating: "05",
  },
  {
    id: 5,
    name: "InVision",
    rating: "06",
  },
  {
    id: 6,
    name: "Wireframe",
    rating: "08",
  },
  {
    id: 7,
    name: "Prototype",
    rating: "07",
  },
  {
    id: 8,
    name: "Web Design",
    rating: "09",
  },
  {
    id: 9,
    name: "Mobile Design",
    rating: "08",
  },
  {
    id: 10,
    name: "Responsive Design",
    rating: "10",
  },
];

export const professionalDetails = {
  Skills: skillData,
  Domain: "Technology & IT",
  "Years of Experience": "2 years",
  "Highest Qualification": "Bachelor of Design (B.Des)",
  "Current Job Title": "UI/UX Designer",
  "Current Employer": "DesignScape Studios",
  "Current Salary": "₹ 50,0000",
  "Expected Salary": "₹ 64,0000",
  "Notice Period": null,
  "GDPR Consent": false,
  "Email Consent": false,
};

export const candidateDescription = {
  candidateDescription:
    "<p>A creative and user-focused UI/UX Designer with 3+ years of experience in crafting intuitive digital experiences. Adept at creating wireframes, prototypes, and high-fidelity designs for web and mobile applications. Skilled in translating business goals and user needs into functional and visually appealing interfaces. Priya is known for her strong attention to detail, collaborative approach, and ability to deliver innovative design solutions.</p>",
};

export const customCVData = [
  {
    id: 1,
    cvName: "UpTech",
    resumeInfo: {
      name: "",
    },
  },
];

export const customizeCandidateDetailsFields = [
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    options: [],
    order: 1,
    default: true,
    hide: false,
    value: "Priya",
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    options: [],
    order: 2,
    default: true,
    hide: false,
    value: "Sharma",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
    order: 3,
    default: true,
    hide: false,
    value: "Female",
  },
  {
    name: "current_job_title",
    label: "Current Job Title",
    type: "text",
    options: [],
    order: 4,
    default: true,
    hide: false,
    value: "UI UX Designer",
  },
  {
    name: "current_employer",
    label: "Current Employer",
    type: "text",
    options: [],
    order: 5,
    default: true,
    hide: false,
    value: "DesignScape Studios",
  },
  {
    name: "location",
    label: "Location",
    type: "text",
    options: [],
    order: 6,
    default: true,
    hide: false,
    value: "Bristol, England, United Kingdom",
  },
  {
    name: "email",
    label: "Email ID",
    type: "text",
    options: [],
    order: 7,
    default: true,
    hide: false,
    value: "",
  },
  {
    name: "phone_number",
    label: "Phone Number",
    type: "text",
    options: [],
    order: 8,
    default: true,
    hide: false,
    value: "",
  },
];

export const proficiency = ["Beginner", "Intermediate", "Advanced", "Native"];
