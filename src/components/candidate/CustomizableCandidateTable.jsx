import React, { useEffect, useState } from "react";
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
import {
  formatDate,
  formatDateMonthYear,
  getInitials,
  getRandomColor,
} from "../../helpers/utils";
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
import { useSelector } from "react-redux";
import { userImage } from "../../helpers/assets";

const CustomizableCandidateTable = ({
  data,
  setSelectedCandidateUser,
  setSelectedCandidateUsers,
  deleteIconClick,
  showDeleteIcon,
  eyeClickOn,
  onCandidateClick,
  onCandidateSelect,
}) => {
  const navigate = useNavigate();
  const { columnList } = useSelector((state) => state?.candidates);
  const matchedColumns = columnList?.filter((col) => col.key in data[0]);
  const { modals, setModalVisibility } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [headerData, setHeaderData] = useState(matchedColumns);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (id) => {
    onCandidateSelect(id); // Call the parent function
  };

  console.log("data in CandidateTable", selectedCandidates);

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
              {headerData
                ?.sort((a, b) => a?.order - b?.order)
                ?.map((item, index) => (
                  <TableCell
                    key={index}
                    className="font-14-regular"
                    style={{ minWidth: 250 }}
                  >
                    <div
                      className="display-flex align-center"
                      style={{ gap: 6 }}
                    >
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
                          {selectedCandidates.length === data.length && (
                            <Tick />
                          )}
                        </button>
                      )}
                      <span>{item?.label}</span>
                    </div>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((candidate, index) => {
              return (
                <TableRow
                  key={index}
                  className="hover-row"
                  onClick={() => onCandidateClick(candidate?._id)}
                >
                  {headerData?.map((columnName, index) => {
                    let value = candidate[columnName?.key] || "-";

                    if (
                      columnName?.name === "created_at" ||
                      columnName?.name === "date_of_birth"
                    ) {
                      value = candidate[columnName?.key]
                        ? formatDate(candidate[columnName?.key])
                        : "NA";
                    }

                    if (columnName?.name === "created_by") {
                      return (
                        <TableCell key={index}>
                          <div
                            className="display-flex align-center"
                            style={{ gap: 6 }}
                          >
                            <Avatar
                              src={userImage}
                              alt={candidate?.candidate_name}
                              style={{
                                width: 32,
                                height: 32,
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            ></Avatar>
                            <span className={`font-14-regular truncate-text `}>
                              {candidate[columnName?.key]?.first_name +
                                " " +
                                candidate[columnName?.key]?.last_name}
                            </span>
                          </div>
                        </TableCell>
                      );
                    }

                    if (columnName?.name === "social_links") {
                      return;
                    }

                    if (columnName?.name === "skills") {
                      return;
                    }
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
                              {selectedCandidates.includes(candidate?._id) && (
                                <Tick />
                              )}
                            </div>

                            <Avatar
                              src={
                                candidate?.profile_photo &&
                                Object.keys(candidate?.profile_photo).length > 0
                                  ? candidate?.profile_photo
                                  : ""
                              }
                              alt={candidate?.candidate_name}
                              style={{
                                width: 32,
                                height: 32,
                                backgroundColor:
                                  candidate?.profile_photo &&
                                  Object.keys(candidate?.profile_photo)
                                    ?.length > 0
                                    ? "transparent"
                                    : getRandomColor(),
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {!candidate?.profile_photo ||
                              Object.keys(candidate?.profile_photo)?.length ===
                                0
                                ? getInitials(candidate?.candidate_name)
                                : ""}
                            </Avatar>

                            <span className="font-14-regular truncate-text">
                              {value === "-" ? "NA" : value}
                            </span>

                            {!showDeleteIcon ? (
                              <>
                                <button
                                  className="eye-icon"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    eyeClickOn(candidate?._id);
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
                      <TableCell key={index}>
                        <span className={`font-14-regular truncate-text `}>
                          {value === "-" ? "NA" : value}
                        </span>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustomizableCandidateTable;
