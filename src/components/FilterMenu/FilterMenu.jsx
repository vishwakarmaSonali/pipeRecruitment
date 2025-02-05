import React, { useState } from "react";
import { Menu, MenuItem, Radio,} from "@mui/material";

const FilterMenu = ({ anchorEl, open, onClose, selectedOption, onApply }) => {
  const [selectedFilter, setSelectedFilter] = useState("is equal to");
  const [conditionValue, setConditionValue] = useState("");

  const filterOptions = ["is equal to", "contains", "starts with", "ends with"];

  const handleApply = () => {
    onApply(selectedFilter, conditionValue);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{ className: "border rounded-lg shadow-md w-64" }}
    >
      <div className="flex flex-col">
        {/* Filter Selection */}
        {filterOptions.map((option) => (
          <MenuItem
            key={option}
            className="px-[14px] "
            onClick={() => setSelectedFilter(option)}
          >
            <Radio
              checked={selectedFilter === option}
              onChange={() => setSelectedFilter(option)}
              size="small"
              className="text-black"
            />
            <span className="text-sm font-ubuntu text-customBlue">
              {option}
            </span>
          </MenuItem>
        ))}
        <input
          type="text"
          placeholder="Write condition"
          value={conditionValue}
          onChange={(e) => setConditionValue(e.target.value)}
          className="bg-transparent border border-gray-400 outline-none p-[14px] rounded-[8px] mx-[14px] w-auto text-sm text-gray-700 placeholder:text-customGray  bg-red-800"
        />

        {/* Apply Button */}
        <div className="items-center flex mt-[10px] px-[14px]  py-[10px] border-t">
          <button
            onClick={handleApply}
            className="px-[14px] py-[10px]  max-h-[36px] text-m font-ubuntu rounded-[8px] flex items-center gap-1 min-w-full justify-center  text-white  bg-buttonBLue"
          >
            Add filter
          </button>
        </div>
      </div>
    </Menu>
  );
};

export default FilterMenu;
