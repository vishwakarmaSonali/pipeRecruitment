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
import {
  formatDate,
  formatDateMonthYear,
  getInitials,
  getRandomColor,
  notifyError,
  notifySuccess,
} from "../../helpers/utils";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/EyeIcon.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/moreMenu.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import { useModal } from "../common/ModalProvider";
import { useSelector } from "react-redux";
import { userImage } from "../../helpers/assets";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomizableCandidateTable = ({
  data,
  setSelectedCandidateUser,
  setSelectedCandidateUsers,
  deleteIconClick,
  showDeleteIcon,
  eyeClickOn,
  onCandidateClick,
  onCandidateSelect,
  isLoading,
  handleMenuClick,
  open,
  selectedCandidatesID,
}) => {
  const { columnList } = useSelector((state) => state?.candidates);
  const matchedColumns = columnList?.filter((col) => col?.key in data[0]);
  const [selectedCandidates, setSelectedCandidates] =
    useState(selectedCandidatesID);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [headerData, setHeaderData] = useState(matchedColumns);

  useEffect(() => {
    setSelectedCandidates(selectedCandidatesID);
  }, [selectedCandidatesID]);

  if (isLoading) {
    return (
      <div className="display-column" style={{ gap: 10 }}>
        {Array.from({ length: 15 }).map((_, index) => {
          return (
            <div className="display-column" style={{ gap: 4 }}>
              <div className="display-flex" style={{ gap: 20 }}>
                <Skeleton containerClassName="flex-1" height={40} />
                <Skeleton containerClassName="flex-1" height={40} />
                <Skeleton containerClassName="flex-1" height={40} />
                <Skeleton containerClassName="flex-1" height={40} />
                <Skeleton containerClassName="flex-1" height={40} />
                <Skeleton containerClassName="flex-1" height={40} />
              </div>
              <div className="divider-line" />
            </div>
          );
        })}
      </div>
    );
  }

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
                              selectedCandidates?.length === data?.length;
                            setSelectedCandidates(
                              allSelected ? [] : data?.map((c) => c._id)
                            );
                            setSelectedCandidateUsers(
                              allSelected ? [] : data?.map((c) => c._id)
                            );
                          }}
                        >
                          {selectedCandidates?.length === data?.length && (
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
                                  prev.includes(candidate?._id)
                                    ? prev.filter((id) => id !== candidate?._id)
                                    : [...prev, candidate?._id]
                                );
                                setSelectedCandidateUsers((prev) =>
                                  prev.includes(candidate?._id)
                                    ? prev.filter((id) => id !== candidate?._id)
                                    : [...prev, candidate?._id]
                                );
                              }}
                            >
                              {selectedCandidates?.includes(candidate?._id) && (
                                <Tick />
                              )}
                            </div>

                            <Avatar
                              src={""}
                              alt={value}
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
                                ? getInitials(value)
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
                                    candidate?._id === selectedCandidate?._id &&
                                    open &&
                                    "opacity-1"
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCandidate(candidate);
                                    setSelectedCandidateUser(candidate);
                                    handleMenuClick(e);
                                  }}
                                >
                                  <MoreIcon
                                    stroke="#151B23"
                                    width={20}
                                    height={20}
                                  />
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
