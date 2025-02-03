import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";

const menuItemStyle = css`
  font-size: 14px;
  font-weight: 500;
  font-family: "'Ubuntu', sans-serif"; 
  color: #333;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const GlobalMenu = ({ anchorEl, open, onClose, menuItems }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "180px",
          padding: "5px 0",
          marginTop: "5px",
          fontFamily: "'Ubuntu', sans-serif",
          fontSize: "14px",
          color: "#151B23",
        },
      }}
    >
      {menuItems.map((item, index) => (
        <MenuItem key={index} onClick={item.onClick} css={menuItemStyle}>
         {item?.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <Typography sx={{ fontSize: "14px" }}>{item.label}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default GlobalMenu;
