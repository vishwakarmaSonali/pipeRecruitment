import React from "react";
import "./index.css";
import { Avatar } from "@mui/material";
import { getRandomColor } from "../../helpers/utils";

const CandidateInfoHistory = ({ data }) => {
  return (
    <div className="candidate-details-main-container">
      <h3 className="font-16-medium color-dark-black text-uppercase">
        Recent History
      </h3>
      <div className="divider-line" />
      <div>
        {data?.map((item) => {
          const randomColor = getRandomColor();
          return (
            <div
              key={item?.id}
              className="display-flex align-center"
              style={{ gap: 6 }}
            >
              <Avatar
                src={item?.image || ""}
                alt={item?.name}
                style={{
                  width: 26,
                  height: 26,
                  backgroundColor: randomColor,
                  fontSize: 10,
                }}
              >
                {!item.image && item?.name?.slice(0, 2)}
              </Avatar>
              <div className="display-column" style={{ gap: 4 }}>
                <p className="font-14-regular color-dark-blak">{item?.name}</p>
                <p className="font-12-regular color-grey">{item?.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateInfoHistory;
