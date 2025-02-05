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
     sx={{padding:0,margin:0}}
      PaperProps={{
        sx: {
          borderRadius: "10px",
          boxShadow: "-1px 4px 18px rgba(0,0,0,0.8)",
          width: "240px",
          fontFamily: "'Ubuntu', sans-serif",
          fontSize: "14px",
          color: "customBlue",
         
        },
      }}
    >
      {/* 🔍 Search Bar */}
      <div className="flex items-center border-b border-gray-300 p-[12px] gap-[8px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-customGray"
        />
      </div>

      {/* 📌 Menu Items */}
      {filteredItems.length > 0 ? (
        filteredItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={item.onClick}
            className="p-[10px] rounded-md"
            sx={{
              padding: "14px !important",
              borderRadius: "8px !important", // Adjust if necessary
           
            }}
          >
 <span className="text-sm text-customBlue font-ubuntu">{item.label}</span>
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled className="p-[14px] text-sm text-customBlue font-ubuntu font-medium">
          No results found
        </MenuItem>
      )}
    </Menu>
  );
};

export default SearchableMenu;
