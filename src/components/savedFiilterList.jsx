import React from "react";
import { useSelector } from "react-redux";

const SavedFiltersList = () => {
  const savedFilters = useSelector((state) => state.filters.savedFilters);

  return (
    <div>
      <h3>Saved Filters</h3>
      <ul>
        {savedFilters.map((filter, index) => (
          <li key={index}>
            <strong>{filter.name}</strong> - {filter.conditions.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedFiltersList;
