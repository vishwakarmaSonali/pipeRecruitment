import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import {ReactComponent as SearchIcon} from "../../assets/icons/sourcingIcons/search-normal.svg"; // MUI Search Icon

const SearchableMenu = ({ anchorEl, open, onClose, menuItems }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search input
  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          boxShadow: "-1px 4px 18px rgba(0,0,0,0.18)",
          width: "240px",
          fontFamily: "'Ubuntu', sans-serif",
          fontSize: "14px",
          color: "customBlue",
        },
      }}
    >
      {/* 🔍 Search Bar */}
      <div className="flex items-center border-b border-gray-300 bg-white px-[14px] pb-[16px] pt-[10px]  gap-[8px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-customGray"
        />
      </div>

      {/* 📌 Menu Items */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.onClick}
            className="p-[14px] text-gray-800 text-sm hover:bg-gray-100 rounded-md"
          >
            <Typography className="text-sm text-customBlue font-ubuntu font-normal">{item.label}</Typography>
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled className="p-[14px] text-gray-400 text-sm text-customBlue font-ubuntu font-medium">
          No results found
        </MenuItem>
      )}
    </Menu>
  );
};

export default SearchableMenu;
