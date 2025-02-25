import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { commonStyle } from "../../helpers/config";

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
        sx: commonStyle.sx,
      }}
    >
      <div className="display-column">
        {menuItems.map((item, index) => (
          <button className="common-menu-item-btn" onClick={item.onClick}>
            {item.icon && item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </Menu>
  );
};

export default GlobalMenu;
