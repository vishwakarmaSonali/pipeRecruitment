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
import { formatCustomDate, getRandomColor } from "../../helpers/utils";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { extensions } from "../../helpers/config";

const AttachmentsListTable = ({
  header,
  data,
  onUpload,
  onDelete,
  onDownload,
}) => {
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
            {header?.map((item, index) => {
              return (
                <TableCell className="font-14-regular">
                  <div style={{ paddingLeft: index === 0 ? 40 : 0 }}>
                    {item}
                  </div>
                </TableCell>
              );
            })}
            <TableCell style={{ textAlign: "right" }}>
              <button className="add-details-btn" onClick={onUpload}>
                + Upload
              </button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => {
            const extension = row?.file?.name?.split(".").pop();

            const handleDownload = () => {
              if (!row?.file) {
                console.error("No file available.");
                return;
              }
              const blobUrl = URL.createObjectURL(row.file);
              const link = document.createElement("a");
              link.href = blobUrl;
              link.download = row.file.name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            };
            return (
              <>
                <TableRow key={index}>
                  <TableCell>
                    <div
                      className="display-flex align-center"
                      style={{ gap: 20 }}
                    >
                      <img
                        src={extensions[extension]}
                        className="extension-img"
                      />
                      <span>{row?.file?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{extension}</TableCell>
                  <TableCell>
                    {formatCustomDate(row?.file?.lastModifiedDate)}
                  </TableCell>
                  <TableCell>
                    <div
                      className="display-flex"
                      style={{ gap: 8, justifyContent: "flex-end" }}
                    >
                      <button onClick={() => onDelete(row?.id)}>
                        <DeleteIcon />
                      </button>
                      <button onClick={handleDownload}>
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
