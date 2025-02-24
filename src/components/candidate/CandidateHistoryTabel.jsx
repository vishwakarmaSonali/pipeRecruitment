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

const CandidateHistoryTabel = ({ header, data }) => {
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
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            const randomColor = getRandomColor();
            return (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={row?.user?.image}
                        alt={row?.user?.name}
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: randomColor,
                        }}
                      />
                      <span style={{ marginLeft: "6px" }}>
                        {row?.user?.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{row?.action}</TableCell>
                  <TableCell>{row?.date}</TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidateHistoryTabel;
