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
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  getInitials,
  getRandomColor,
  notifySuccess,
} from "../../helpers/utils";
import {
  archivedColumnMapping,
  columnMapping,
  commonStyle,
} from "../../helpers/config";
import { ReactComponent as Tick } from "../../assets/icons/sourcingIcons/tick.svg";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/moreMenu.svg";
import { ReactComponent as AddJobIcon } from "../../pages/Recruitment/Candidates/assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "../../pages/Recruitment/Candidates/assets/addFolder.svg";
import { ReactComponent as MarkProfileIcon } from "../../pages/Recruitment/Candidates/assets/profile-tick.svg";
import { ReactComponent as DownloadIcon } from "../../pages/Recruitment/Candidates/assets/download.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import CandidateInfoModal from "../modals/CandidateInfoModal";
import { useModal } from "../common/ModalProvider";
import { ReactComponent as MergeDuplicateIcon } from "../../assets/icons/merge.svg";
import { ReactComponent as EditUser } from "../../assets/icons/user-edit.svg";
import DeleteCandidateDrawer from "./DeleteCandidateDrawer";
import { archivedCandidates } from "../../helpers/dataCandidates";
import { format } from "date-fns";

const ArchiveCandidateTable = ({
  header,
  data,
  setSelectedCandidateUser,
  setSelectedCandidateUsers,
  AddJobClick,
  AddFolderClick,
  ChangeOwnerShipClick,
  deleteIconClick,
  showDeleteIcon,
}) => {
  const navigate = useNavigate();
  const { modals, setModalVisibility } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(""); // New state to store the delete message
  const [deletingCandidates, setDeletingCandidates] = useState([]); // Track candidates to delete
  const [deleteCandidateDrawerOpen, setDeleteCandidateDrawerOpen] =
    useState(false);
  const open = Boolean(anchorEl);
  const [candidateList, setCandidateList] = useState(archivedCandidates);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleArchive = (id) => {
    console.log(`Archiving candidate with ID: ${id}`);
    // TODO: Implement API call or state update to archive candidate
  };

  // 🔥 Handle Delete Action (Determines message & opens drawer)
  const handleDelete = (id = null) => {
    if (id) {
      setDeleteMessage("This candidate profile");
      setDeletingCandidates([id]); // Only delete this one user
    } else if (selectedCandidates?.length === 1) {
      setDeleteMessage("Selected candidate profile");
      setDeletingCandidates([...selectedCandidates]); // Single selected user
    } else {
      setDeleteMessage("Selected candidate profiles");
      setDeletingCandidates([...selectedCandidates]); // Multiple selected users
    }

    setDeleteCandidateDrawerOpen(true);
  };
  // 🔥 Handle Confirm Delete (Filters Out Deleted Candidates)
  const handleConfirmDelete = (id) => {
    if (id) {
      notifySuccess("Candidate has been permanently deleted.");
    } else if (selectedCandidates?.length === 1) {
      notifySuccess("Selected candidate has been permanently deleted.");
    }
    setCandidateList((prev) =>
      prev?.filter((candidate) => !deletingCandidates.includes(candidate.id))
    );
    setSelectedCandidates([]); // Clear selection after deletion
    setDeleteCandidateDrawerOpen(false);
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
                              selectedCandidates?.length === data?.length
                                ? []
                                : data?.map((c) => c.id)
                            );
                            setSelectedCandidateUsers(
                              selectedCandidates?.length === data?.length
                                ? []
                                : data?.map((c) => c.id)
                            );
                          }}
                        >
                          {selectedCandidates?.length === data?.length && (
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((candidate, index) => (
              <TableRow key={index} className="hover-row">
                {/* Checkbox Column */}
                <TableCell>
                  <div className="display-flex align-center">
                    <button
                      className="candidate-card-checkbox"
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
                      {selectedCandidates.includes(candidate._id) && <Tick />}
                    </button>
                  </div>
                </TableCell>

                {/* Dynamic Data Columns */}
                {header.map((colName, colIndex) => {
                  let value = "-";

                  if (colName === "Candidate Name") {
                    value = `${candidate.first_name || ""} ${candidate.last_name || ""}`.trim() || "-";
                  } else if (colName === "Owner") {
                    value = candidate.archived_by?.email || "-";
                  } else if (colName === "Archived Date") {
                    value = candidate.archived_at
                      ? format(new Date(candidate.archived_at), "yyyy-MM-dd")
                      : "-";
                  }

                  return (
                    <TableCell key={colIndex} className="font-14-regular">
                      {value}
                    </TableCell>
                  );
                })}

                {/* Action Buttons */}
                <TableCell>
                  <div className="flex gap-2">
                    {/* Restore Button */}
                    <Tooltip title="Restore">
                      <button className="px-2 py-1 text-white rounded-md">
                        <ArchiveIcon />
                      </button>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete Permanently">
                      <button className="px-2 py-1 bg-red-500 text-white rounded-md">
                        <DeleteIcon />
                      </button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
          <button
            className="common-menu-item-btn"
            onClick={() => navigate("/merge-candidate")}
          >
            <MergeDuplicateIcon /> Merge Duplicate
          </button>
          <button className="common-menu-item-btn">
            <ArchiveIcon /> Archive
          </button>
        </div>
      </Menu>
      <DeleteCandidateDrawer
        isOpen={deleteCandidateDrawerOpen}
        onClose={() => setDeleteCandidateDrawerOpen(false)}
        deleteMessage={deleteMessage} // Pass message dynamically
        onConfirmDelete={handleConfirmDelete} // Pass function to confirm delete
      />
    </>
  );
};

export default ArchiveCandidateTable;
