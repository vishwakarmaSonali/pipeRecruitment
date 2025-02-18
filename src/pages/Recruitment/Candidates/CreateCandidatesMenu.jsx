import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography, Box } from "@mui/material";
import { ReactComponent as ClipboardIcon } from "../../../assets/icons/clipboard-text.svg";
import { ReactComponent as ExportIcon } from "../../../assets/icons/exportIcon.svg";
import { ReactComponent as BulkUploadIcon } from "../../../assets/icons/document-upload.svg";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
const menuItemStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CreateCandidateMenu = ({ anchorEl, open, onClose }) => {
    const navigate = useNavigate()
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "300px",
          fontFamily: "'Ubuntu', sans-serif",
          fontSize: "14px",
          color: "#151B23",
          marginTop:"10px"
        },
      }}
    >
      {/* Manually Add Candidate */}
      <MenuItem onClick={() => {navigate("/candidate/create-candidate-form")}} css={menuItemStyle}>
       <Box display="flex" alignItems="flex-start" width="100%">
        <ListItemIcon sx={{ maxWidth: "20px", marginTop:"2px" }}>
            <ClipboardIcon />
          </ListItemIcon>
          <Box display="flex" flexDirection="column">
          <span className="font-ubuntu text-m text-customBlue ">

              Manually Add Candidate
          </span>
            
           <span className="flex text-sm font-ubuntu text-customGray text-wrap" >
              Fill out a form to create a candidate profile.
          </span>
          </Box>
        </Box>
      </MenuItem>

      {/* Upload Resumes */}
      <MenuItem onClick={() => { }} css={menuItemStyle}>
       <Box display="flex" alignItems="flex-start" width="100%">
        <ListItemIcon sx={{ minWidth: "20px", marginTop:"2px" }}>
            <ExportIcon />
          </ListItemIcon>
          <Box display="flex" flexDirection="column">
          <span className="font-ubuntu text-m text-customBlue ">
              Upload Resumes
          </span>
            
           <span className="flex text-sm font-ubuntu text-customGray text-wrap" >
              Import resumes to auto-generate candidates.
          </span>
          </Box>
        </Box>
      </MenuItem>

      {/* Bulk Upload */}
      <MenuItem onClick={() => {}} css={menuItemStyle}>
        <Box display="flex" alignItems="flex-start" width="100%">
          <ListItemIcon sx={{ minWidth: "20px", marginTop:"2px" }}>
            <BulkUploadIcon />
          </ListItemIcon>
          <Box display="flex" flexDirection="column">
          <span className="font-ubuntu text-m text-customBlue ">
              Bulk Upload
          </span>
            <span className="flex text-sm text-customGray font-ubuntu text-wrap" >
              Upload a CSV or JSON file to add multiple candidates.
            </span>
          </Box>
        </Box>
      </MenuItem>
    </Menu>
  );
};

export default CreateCandidateMenu;
