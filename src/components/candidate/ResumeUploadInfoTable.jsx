import React from "react";
import "./index.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
} from "@mui/material";
import { VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getRandomColor } from "../../helpers/utils";

const ResumeUploadInfoTable = ({ data }) => {
  const navigate = useNavigate();

  return (
    <TableContainer style={{ flex: 1, overflow: "auto" }}>
      <Table
        stickyHeader
        sx={{ borderSpacing: "0 10px", borderCollapse: "separate" }}
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
            <TableCell className="font-14-regular">
              <b>Candidate Name</b>
            </TableCell>
            <TableCell className="font-14-regular">
              <b>Resume</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const randomColor = getRandomColor();
            return (
              <TableRow
                key={index}
                className="hover-row"
                onClick={() => navigate("/candidate/resume-history-info")}
              >
                <TableCell>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={row.importedBy.image || ""}
                      alt={row.importedBy.name}
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: randomColor,
                      }}
                    >
                      {!row.importedBy.image && row.importedBy.name[0]}
                    </Avatar>
                    <span style={{ marginLeft: "6px" }}>
                      {row.importedBy.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <a className="learn-more-link">View resume</a>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    style={{
                      backgroundColor: "#46A13C1A",
                      color: "#46A13C",
                      padding: "6px 12px",
                      fontSize: "12px",
                      fontFamily: "Ubuntu",
                      fontWeight: 400,
                      borderRadius: "100px",
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton className="eye-icon">
                    <VisibilityOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResumeUploadInfoTable;
