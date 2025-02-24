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
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";

const AttachmentsListTable = ({ header, data }) => {
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
            {header?.map((item) => {
              return <TableCell className="font-14-regular">{item}</TableCell>;
            })}
            <TableCell>
              <button className="add-details-btn">+ Upload</button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <>
                <TableRow key={index}>
                  <TableCell>{row?.file_name}</TableCell>
                  <TableCell>{row?.file_type}</TableCell>
                  <TableCell>{row?.uploaded_date}</TableCell>
                  <TableCell>
                    <div className="display-flex" style={{ gap: 8 }}>
                      <button>
                        <DeleteIcon />
                      </button>
                      <button>
                        <DownloadIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttachmentsListTable;
