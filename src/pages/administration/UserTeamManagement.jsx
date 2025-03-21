import React from "react";
import "./index.css";
import Navbar from "../../components/navbar/Navbar";
import Breadcrumb from "../../components/administration/Breadcrumb";

const UserTeamManagement = () => {
  return (
    <div className="sourcing-main-container">
      <Navbar />
      <Breadcrumb />
    </div>
  );
};

export default UserTeamManagement;
