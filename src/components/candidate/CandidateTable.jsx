import React, { useState } from "react";
import "./index.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInitials, getRandomColor } from "../../helpers/utils";
import { columnMapping, commonStyle } from "../../helpers/config";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/moreMenu.svg";
import { ReactComponent as AddJobIcon } from "../../pages/Recruitment/Candidates/assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "../../pages/Recruitment/Candidates/assets/addFolder.svg";
import { ReactComponent as MarkProfileIcon } from "../../pages/Recruitment/Candidates/assets/profile-tick.svg";
import { ReactComponent as DownloadIcon } from "../../pages/Recruitment/Candidates/assets/download.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import CandidateInfoModal from "../modals/CandidateInfoModal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as MergeDuplicateIcon } from "../../assets/icons/merge.svg";
import { ReactComponent as EditUser } from "../../assets/icons/user-edit.svg";

const CandidateTable = ({
  header,
  data,
  setSelectedCandidateUser,
  AddJobClick,
  AddFolderClick,
  ChangeOwnerShipClick,
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
              {header?.map((item, index) => {
                if (index === 0) {
                  return (
                    <TableCell
                      className="font-14-regular"
                      style={{ minWidth: 250 }}
                    >
                      <div
                        className="display-flex align-center"
                        style={{ gap: 6 }}
                      >
                        <button
                          className={`candidate-card-checkbox`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidates(
                              selectedCandidates.length === data.length
                                ? []
                                : data.map((c) => c.id)
                            );
                          }}
                        >
                          {selectedCandidates.length === data.length && (
                            <Tick />
                          )}
                        </button>
                        <span>{item}</span>
                      </div>
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    className="font-14-regular"
                    style={{ minWidth: 240 }}
                  >
                    {item}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((candidate, index) => {
              const randomColor = getRandomColor();
              return (
                <>
                  <TableRow
                    key={index}
                    className="hover-row"
                    onClick={() => {
                      setSelectedCandidate(candidate);
                      setSelectedCandidateUser(candidate);
                      setModalVisibility("candidateInfoModalVisible", true);
                    }}
                  >
                    {header.map((columnName, index) => {
                      const key = columnMapping[columnName];
                      if (index === 0) {
                        return (
                          <TableCell>
                            <div
                              className="display-flex align-center"
                              style={{ gap: 6 }}
                            >
                              <div
                                className={`candidate-card-checkbox`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCandidates((prev) =>
                                    prev.includes(candidate.id)
                                      ? prev.filter((id) => id !== candidate.id)
                                      : [...prev, candidate.id]
                                  );
                                }}
                              >
                                {selectedCandidates.includes(candidate.id) && (
                                  <Tick />
                                )}
                              </div>
                              <Avatar
                                src={""}
                                alt={candidate[key]}
                                style={{
                                  width: 32,
                                  height: 32,
                                  backgroundColor: randomColor,
                                  fontSize: 14,
                                  lineHeight: "19.1px",
                                  textAlign: "center",
                                }}
                              >
                                {candidate[key] && getInitials(candidate[key])}
                              </Avatar>
                              <span className="font-14-regular truncate-text ">
                                {candidate[key] || "-"}
                              </span>
                              <button className="eye-icon">
                                <EyeIcon />
                              </button>
                              <button
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                className={`eye-icon ${
                                  open &&
                                  candidate?.id === selectedCandidate?.id &&
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
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell className="font-14-regular">
                          {candidate[key] || "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CandidateInfoModal
        visible={modals?.candidateInfoModalVisible}
        onClose={() => setModalVisibility("candidateInfoModalVisible", false)}
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{
          sx: commonStyle.sx,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <div className="display-column">
          <button
            className="common-menu-item-btn"
            onClick={() => {
              handleMenuClose();
              AddJobClick();
            }}
          >
            <AddJobIcon /> Add to Jobs
          </button>
          <button
            className="common-menu-item-btn"
            onClick={() => {
              handleMenuClose();
              AddFolderClick();
            }}
          >
            <AddFolderIcon /> Add to Folder
          </button>
          <button
            className="common-menu-item-btn"
            onClick={() => {
              handleMenuClose();
              ChangeOwnerShipClick();
            }}
          >
            <EditUser /> Change Ownership
          </button>
          <button className="common-menu-item-btn">
            <MergeDuplicateIcon /> Merge Duplicate
          </button>
          <button className="common-menu-item-btn">
            <ArchiveIcon /> Archive
          </button>
        </div>
      </Menu>
    </>
  );
};

export default CandidateTable;
