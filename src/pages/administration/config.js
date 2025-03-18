export const administrationTab = [
  {
    id: 1,
    name: "Candidate Customization",
    desc: "Customize your candidate summary fields, labels, and domains",
    navigate: "/candidate-customization",
  },
  {
    id: 2,
    name: "User Role",
    desc: "Create and customize the user roles as per your requirement",
    navigate: "/user-roles-permissions",
  },
  {
    id: 3,
    name: "User & Team Management",
    desc: "Create and customize the user and team with ease",
    navigate: "/user-team-management",
  },
  {
    id: 4,
    name: "Archived Candidates",
    desc: "Unarchive or premaritally delete the candidates from your profile",
    navigate: "/archive-candidates",
  },
];

export const userRolePermissionData = {
  Administration: {
    "Candidate Customization": ["Summary Fields", "Labels", "Domains"],
    "Archive Management": ["Delete Candidate", "Delete Client"],
    "Pipeline Management": [
      "Create Pipeline",
      "Edit Pipeline",
      "Delete Pipeline",
    ],
    "User Role Management": ["Create", "Update", "Delete"],
    "User & Team Management": {
      Users: ["Create", "Update", "Delete"],
      Teams: ["Create", "Update", "Delete"],
      "Guest Users": ["Create", "Update", "Delete"],
    },
  },
  Candidate: [
    "Create Candidate",
    "Update Candidate",
    "Archive Candidate",
    "Candidate Contact Info",
    "Export Candidate",
    "Duplicate Management",
    {
      "Resume Management": ["Download", "View", "Edit"],
    },
  ],
  Sourcing: [
    "Create Candidate",
    "Add to Jobs",
    "Add to Folder",
    "Download Resume",
  ],
  Clients: [
    "Create Client",
    "Update Client",
    "Archive Client",
    "Export Client",
    "Reports",
  ],
  Jobs: ["Create Job", "Update Job", "Export Job", "Reports"],
};
