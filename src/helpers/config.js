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
