import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { ReactComponent as PreviousIcon } from "../../assets/icons/previous.svg";
import { ReactComponent as NextIcon } from "../../assets/icons/next.svg";

const PaginationComponent = ({ totalPages, currentPage, onPageChange }) => {
  const paginationStyles = {
    "& .MuiPaginationItem-root": {
      color: "#151B23",
      fontSize: "12px",
      lineHeight: "13.79px",
      fontFamily: "Ubuntu",
      fontWeight: "500",
      padding: "8px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "none",
    },
    "& .Mui-selected": {
      color: "#1761D8",
      border: "none",
      borderRadius: "none",
      backgroundColor: "transparent !important",
    },
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(event, page) => onPageChange(page)}
      sx={paginationStyles}
      renderItem={(item) => {
        if (item.type === "previous") {
          return (
            <PaginationItem
              {...item}
              slots={{ previous: PreviousIcon }}
              sx={{
                border: "none",
                backgroundColor: "transparent",
                color: "#151B23 !important",
                marginRight: "20px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            />
          );
        }
        if (item.type === "next") {
          return (
            <PaginationItem
              {...item}
              slots={{ next: NextIcon }}
              sx={{
                border: "none",
                backgroundColor: "transparent",
                color: "#222121 !important",
                marginLeft: "20px",
                "&:hover": { backgroundColor: "transparent" },
              }}
            />
          );
        }
        return (
          <PaginationItem
            {...item}
            sx={{
              backgroundColor: "transparent",
              margin: "0px",
              "&:hover": { backgroundColor: "transparent" },
            }}
          />
        );
      }}
    />
  );
};

export default PaginationComponent;
