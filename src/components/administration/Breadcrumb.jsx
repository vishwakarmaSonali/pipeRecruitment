import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-left.svg";

const breadcrumbMap = {
  "/user-roles-permissions": "Roles & Permissions Management",
  "/user-team-management": "User & Team Management",
  "/candidate-customization": "Candidate Customization",
};

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumb = () => {
    if (breadcrumbMap[location.pathname]) {
      return (
        <>
          <Link to="/administration" className="font-12-regular color-blue">
            Administration
          </Link>
          <ArrowRight fill="#151B23" width={12} height={12} />
          <span className="font-12-regular color-grey">
            {breadcrumbMap[location.pathname]}
          </span>
        </>
      );
    }
    return <span className="font-22-medium color-black">Administration</span>;
  };

  return <div className="breadcrumb position-sticky">{getBreadcrumb()}</div>;
};

export default Breadcrumb;
