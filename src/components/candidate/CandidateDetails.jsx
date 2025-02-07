import React, { useState } from "react";
import "./index.css";

const candidateData = {
  name: "Priya Sharma",
  firstName: "Priya",
  lastName: "Sharma",
  reference: "CAND-12345",
  gender: "Female",
  diploma: "B.Tech in Computer Science",
  university: "ABC University",
  currentCompany: "Tech Corp",
  currentPosition: "Software Engineer",
  location: "New York, USA",
  dob: "1995-08-10",
  address: "123 Main St, New York, NY",
  email: "priya.sharma@example.com",
  phone: "+1234567890",
  skype: "priya.sharma123",
  otherContact: "+9876543210",
};

const fields = [
  { key: "name", label: "Candidate Name" },
  { key: "firstName", label: "Candidate First Name" },
  { key: "lastName", label: "Candidate Last Name" },
  { key: "reference", label: "Candidate Reference" },
  { key: "gender", label: "Gender" },
  { key: "diploma", label: "Diploma" },
  { key: "university", label: "University" },
  { key: "currentCompany", label: "Current Company" },
  { key: "currentPosition", label: "Current Position" },
  { key: "location", label: "Candidate Location" },
  { key: "dob", label: "Date of Birth" },
  { key: "address", label: "Candidate Address" },
  { key: "email", label: "Candidate Email Id" },
  { key: "phone", label: "Candidate Phone" },
  { key: "skype", label: "Skype" },
  { key: "otherContact", label: "Other Contact" },
];

const CandidateDetails = () => {
  const [hoveredField, setHoveredField] = useState(null);
  return (
    <div className="candidate-details-main-div">
      <h3>CANDIDATE DETAILS</h3>
      <div className="divider-line" />
      <div>
        {fields.map(({ key, label }) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onMouseEnter={() => candidateData?.[key] && setHoveredField(key)}
            onMouseLeave={() => setHoveredField(null)}
          >
            <p
              className="font-14-regular color-dark-black"
              style={{ flex: 1, fontWeight: 500 }}
            >
              {label}:
            </p>
            <span
              className="font-14-regular color-dark-black"
              style={{ position: "relative", flex: 1 }}
            >
              {candidateData?.[key] ? (
                <>
                  {candidateData[key]}
                  {hoveredField === key && (
                    <button
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        background: "none",
                        border: "none",
                        color: "blue",
                        textDecoration: "underline",
                      }}
                      onClick={() => alert(`Edit ${label}`)}
                    >
                      Edit
                    </button>
                  )}
                </>
              ) : (
                <a
                  href="#"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  + Add
                </a>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateDetails;
