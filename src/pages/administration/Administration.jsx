import React from "react";
import "./index.css";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/administration/Breadcrumb";
import { administrationTab } from "./config";
import { useNavigate } from "react-router-dom";

const Administration = () => {
  const navigate = useNavigate();
  return (
    <div className="sourcing-main-container">
      <Navbar />
      <Breadcrumb />
      <div className="main-administration-container">
        {administrationTab?.map((item) => {
          return (
            <div
              key={item?.id}
              className="administration-tab-item"
              onClick={() => navigate(item?.navigate)}
            >
              <p className="font-22-medium color-black">{item?.name}</p>
              <p className="font-14-regular color-grey">{item?.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Administration;
