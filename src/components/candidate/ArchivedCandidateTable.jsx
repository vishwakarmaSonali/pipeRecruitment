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
  IconButton,
  Menu,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getInitials, getRandomColor } from "../../helpers/utils";
import { archivedCandidateHeader, archivedColumnMapping } from "../../helpers/config";
import { ReactComponent as EyeIcon } from "../../assets/icons/eye.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/moreMenu.svg";
// import { ReactComponent as RestoreIcon } from "../../assets/icons/restore.svg";
// import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import CandidateInfoModal from "../modals/CandidateInfoModal";
import { useModal } from "../common/ModalProvider";

const ArchivedCandidateTable = ({ data, restoreCandidate, deleteCandidate }) => {
  const navigate = useNavigate();
  const { modals, setModalVisibility } = useModal();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event, candidate) => {
    setAnchorEl(event.currentTarget);
    setSelectedCandidate(candidate);
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
              {archivedCandidateHeader.map((item, index) => (
                <TableCell key={index} className="font-14-regular" style={{ minWidth: 240 }}>
                  {item}
                </TableCell>
              ))}
              <TableCell className="font-14-regular">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((candidate, index) => {
              const randomColor = getRandomColor();
              return (
                <TableRow
                  key={index}
                  className="hover-row"
                  onClick={() => {
                    setSelectedCandidate(candidate);
                    setModalVisibility("candidateInfoModalVisible", true);
                  }}
                >
                  {archivedCandidateHeader.map((columnName, index) => {
                    const key = archivedColumnMapping[columnName];
                    if (index === 0) {
                      return (
                        <TableCell key={index}>
                          <div className="display-flex align-center" style={{ gap: 6 }}>
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
                          </div>
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={index} className="font-14-regular">
                        {candidate[key] || "-"}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuClick(e, candidate)}>
                      <MoreIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
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
          sx: { boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
        }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <div className="display-column">
          <button
            className="common-menu-item-btn"
            onClick={() => {
              handleMenuClose();
              restoreCandidate(selectedCandidate);
            }}
          >
            {/* <RestoreIcon /> Restore */}
          </button>
          <button
            className="common-menu-item-btn"
            onClick={() => {
              handleMenuClose();
              deleteCandidate(selectedCandidate);
            }}
          >
            {/* <DeleteIcon /> Delete Permanently */}
          </button>
        </div>
      </Menu>
    </>
  );
};

export default ArchivedCandidateTable;
