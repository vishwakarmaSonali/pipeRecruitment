import React from "react";
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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRandomColor } from "../../helpers/utils";

const ResumeHistoryTable = ({ data }) => {
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
              <b>Import Name</b>
            </TableCell>
            <TableCell className="font-14-regular">
              <b>File Count</b>
            </TableCell>
            <TableCell>
              <b>Status</b>
            </TableCell>
            <TableCell>
              <b>Imported By</b>
            </TableCell>
            <TableCell>
              <b>Created on</b>
            </TableCell>
            <TableCell>
              <b>Completed on</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const randomColor = getRandomColor();
            return (
              <>
                <TableRow
                  key={index}
                  onClick={() => navigate("/candidate/resume-history-info")}
                >
                  <TableCell>{row.importName}</TableCell>
                  <TableCell>{row.fileCount}</TableCell>
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
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={row.importedBy.image}
                        alt={row.importedBy.name}
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: randomColor,
                        }}
                      />
                      <span style={{ marginLeft: "6px" }}>
                        {row.importedBy.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{row.createdOn}</TableCell>
                  <TableCell>{row.completedOn}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ResumeHistoryTable;
