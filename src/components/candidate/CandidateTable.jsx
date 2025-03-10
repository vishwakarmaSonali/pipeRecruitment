import React, { useState } from "react";
import "./index.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInitials, getRandomColor } from "../../helpers/utils";
import { commonStyle } from "../../helpers/config";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/moreMenu.svg";
import { ReactComponent as AddJobIcon } from "../../pages/Recruitment/Candidates/assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "../../pages/Recruitment/Candidates/assets/addFolder.svg";
import { ReactComponent as EditUser } from "../../assets/icons/user-edit.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import CandidateInfoModal from "../modals/CandidateInfoModal";
import { useModal } from "../common/ModalProvider";

const CandidateTable = ({
  header,
  data,
  setSelectedCandidateUser,
  setSelectedCandidateUsers,
  AddJobClick,
  AddFolderClick,
  ChangeOwnerShipClick,
  deleteIconClick,
  showDeleteIcon,
  eyeClickOn,
  onCandidateClick,
}) => {
  const navigate = useNavigate();
  const { modals, setModalVisibility } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ✅ Format column headers (removes underscores & capitalizes words)
  const formatHeader = (header) => {
    return header
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  console.log("data im candidateTable", data);

  return (
    <>
      <TableContainer style={{ height: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{
            borderSpacing: "0 10px",
            borderCollapse: "separate",
          }}
        >
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#1761D81A",
                position: "sticky",
                top: 0,
                zIndex: 10,
              }}
            >
              {header?.map((item, index) => (
                <TableCell
                  key={index}
                  className="font-14-regular"
                  style={{ minWidth: 250 }}
                >
                  <div className="display-flex align-center" style={{ gap: 6 }}>
                    {index === 0 && (
                      <button
                        className={`candidate-card-checkbox`}
                        onClick={(e) => {
                          e.stopPropagation();
                          const allSelected =
                            selectedCandidates.length === data.length;
                          setSelectedCandidates(
                            allSelected ? [] : data.map((c) => c._id)
                          );
                          setSelectedCandidateUsers(
                            allSelected ? [] : data.map((c) => c._id)
                          );
                        }}
                      >
                        {selectedCandidates.length === data.length && <Tick />}
                      </button>
                    )}
                    <span>{formatHeader(item)}</span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((candidate, index) => {
              return (
                <TableRow
                  key={index}
                  className="hover-row"
                  onClick={() => onCandidateClick(candidate?._id)}
                  // onClick={() => {
                  //   setSelectedCandidate(candidate);
                  //   setSelectedCandidateUser(candidate);
                  //   setModalVisibility("candidateInfoModalVisible", true);
                  // }}
                >
                  {header.map((columnName, index) => {
                    let value = candidate[columnName] || "-";

                    // ✅ Convert "skills" array to a readable string
                    if (columnName === "skills" && Array.isArray(value)) {
                      value =
                        value.map((skill) => skill.name).join(", ") || "-";
                    }

                    // ✅ Convert "skills" array to a readable string
                    if (columnName === "skills" && Array.isArray(value)) {
                      value =
                        value.map((skill) => skill.name).join(", ") || "-";
                    }

                    // ✅ Convert "employment_history" to a readable string
                    if (
                      columnName === "employment_history" &&
                      Array.isArray(value)
                    ) {
                      value =
                        value
                          .map((job) => `${job.position} at ${job.company}`)
                          .join(", ") || "-";
                    }

                    // ✅ Convert objects to JSON string (fallback)
                    if (typeof value === "object" && value !== null) {
                      value = JSON.stringify(value);
                    }
                    // ✅ Handle First Column (Candidate Name, Photo, Checkbox)
                    if (index === 0) {
                      return (
                        <TableCell key={index}>
                          <div
                            className="display-flex align-center"
                            style={{ gap: 6 }}
                          >
                            <div
                              className={`candidate-card-checkbox`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCandidates((prev) =>
                                  prev.includes(candidate._id)
                                    ? prev.filter((id) => id !== candidate._id)
                                    : [...prev, candidate._id]
                                );
                                setSelectedCandidateUsers((prev) =>
                                  prev.includes(candidate._id)
                                    ? prev.filter((id) => id !== candidate._id)
                                    : [...prev, candidate._id]
                                );
                              }}
                            >
                              {selectedCandidates.includes(candidate._id) && (
                                <Tick />
                              )}
                            </div>

                            <Avatar
                              src={candidate.photo_url || ""}
                              alt={candidate.first_name}
                              style={{
                                width: 32,
                                height: 32,
                                backgroundColor: candidate.photo_url
                                  ? "transparent"
                                  : getRandomColor(),
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {!candidate.photo_url
                                ? getInitials(
                                    candidate.candidate_first_name +
                                      " " +
                                      candidate.candidate_last_name
                                  )
                                : ""}
                            </Avatar>

                            <span className="font-14-regular truncate-text">
                              {candidate.candidate_name || ""}
                            </span>

                            {!showDeleteIcon ? (
                              <>
                                <button
                                  className="eye-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    eyeClickOn();
                                  }}
                                >
                                  <EyeIcon />
                                </button>
                                <button
                                  aria-controls={
                                    open ? "basic-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                  className={`eye-icon ${
                                    open &&
                                    candidate?._id === selectedCandidate?._id &&
                                    "opacity-1"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCandidate(candidate);
                                    setSelectedCandidateUser(candidate);
                                    handleMenuClick(e);
                                  }}
                                >
                                  <MoreIcon stroke="#151B23" />
                                </button>
                              </>
                            ) : (
                              <button
                                className="eye-icon"
                                onClick={(e) => {
                                  deleteIconClick();
                                  e.stopPropagation();
                                }}
                              >
                                <ArchiveIcon />
                              </button>
                            )}
                          </div>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={index} className="font-14-regular">
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{ sx: commonStyle.sx }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <div className="display-column">
          <button className="common-menu-item-btn" onClick={AddJobClick}>
            <AddJobIcon /> Add to Jobs
          </button>
          <button className="common-menu-item-btn" onClick={AddFolderClick}>
            <AddFolderIcon /> Add to Folder
          </button>
          <button
            className="common-menu-item-btn"
            onClick={ChangeOwnerShipClick}
          >
            <EditUser /> Change Ownership
          </button>
          <button
            className="common-menu-item-btn"
            onClick={() => navigate("/merge-candidate")}
          >
            <ArchiveIcon /> Archive
          </button>
        </div>
      </Menu>
    </>
  );
};

export default CandidateTable;
