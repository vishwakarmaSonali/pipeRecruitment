import React, { useState, useEffect } from "react";
import "./index.css";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as Arrow } from "../../assets/icons/expandablearrow.svg";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { ReactComponent as LogoExpanded } from "../../assets/images/LogoExpanded.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as User } from "../../assets/icons/user.svg";
import { ReactComponent as Teams } from "../../assets/icons/teams.svg";
import { ReactComponent as ClientIcon } from "../../assets/icons/client.svg";
import { ReactComponent as Jobs } from "../../assets/icons/jobs.svg";
import { ReactComponent as Candidates } from "../../assets/icons/candidates.svg";
import { ReactComponent as Placements } from "../../assets/icons/placements.svg";
import { ReactComponent as SourcingIcon } from "../../assets/icons/sourcing.svg";
import { ReactComponent as Reports } from "../../assets/icons/reports.svg";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { usePersistentState } from "../../helpers/config";

const Sidebar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = usePersistentState("isExpanded", true);
  const [hoverEffectEnabled, setHoverEffectEnabled] = usePersistentState(
    "hoverEffectEnabled",
    false
  );

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  const handleCollapseClick = () => {
    if (!hoverEffectEnabled || !isExpanded) {
      setHoverEffectEnabled(true);
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      setHoverEffectEnabled(false);
    }
  };

  return (
    <div
      className={`sidebar-main ${isExpanded ? "sidebar-expanded" : ""} `}
      onMouseEnter={() => hoverEffectEnabled && setIsExpanded(true)}
      onMouseLeave={() => hoverEffectEnabled && setIsExpanded(false)}
    >
      <div className={`sidebar-section-1  ${isExpanded ? "pl-[20px]" : ""}`}>
        {isExpanded ? <LogoExpanded /> : <Logo />}
        <div className="sidebar-menu-container">
          <div
            className={`common-sidebar-menu ${!isExpanded && "align-center"}`}
          >
            <p className="sidebar-menu-label">Dashboard</p>
            <Link
              to={"#"}
              className={`common-link-text ${
                activeLink === "/" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <HomeIcon />
              {isExpanded && "Home"}
            </Link>
          </div>

          <div
            className={`common-sidebar-menu ${!isExpanded && "align-center"}`}
          >
            <p className="sidebar-menu-label">People</p>
            <Link
              to={"/#"}
              className={`common-link-text ${
                activeLink === "/user" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <User />
              {isExpanded && "User"}
            </Link>
            <Link
              to={"/#"}
              className={`common-link-text ${
                activeLink === "/temas" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Teams />
              {isExpanded && "Teams"}
            </Link>
          </div>

          <div
            className={`common-sidebar-menu ${!isExpanded && "align-center"}`}
          >
            <p className="sidebar-menu-label">Recruitment</p>
            <Link
              to={"/client"}
              className={`common-link-text ${
                activeLink === "/client" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <ClientIcon />
              {isExpanded && "Client"}
            </Link>
            <Link
              to={"#"}
              className={`common-link-text ${
                activeLink === "/jobs" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Jobs />
              {isExpanded && "Jobs"}
            </Link>
            <Link
              to={"/candidates"}
              className={`common-link-text ${
                activeLink === "/candidates" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Candidates />
              {isExpanded && "Candidates"}
            </Link>
            <Link
              to={"#"}
              className={`common-link-text ${
                activeLink === "/placements" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Placements />
              {isExpanded && "Placements"}
            </Link>
          </div>

          <div
            className={`common-sidebar-menu ${!isExpanded && "align-center"}`}
          >
            <p className="sidebar-menu-label">Tools</p>
            <Link
              to={"/sourcing"}
              className={`common-link-text ${
                activeLink === "/sourcing" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <SourcingIcon />
              {isExpanded && "Sourcing"}
            </Link>
            <Link
              to={"#"}
              className={`common-link-text ${
                activeLink === "/reports" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Reports />
              {isExpanded && "Reports"}
            </Link>
            <Link
              to={"#"}
              className={`common-link-text ${
                activeLink === "/calender" && "active-link"
              } ${!isExpanded && "justify-center"}`}
            >
              <Calendar />
              {isExpanded && "Calender"}
            </Link>
          </div>
        </div>
      </div>
      <div className="collapse-menu-div" onClick={handleCollapseClick}>
        <div
          className={`${isExpanded ? "collapse-arrow-div" : ""} collapse-arrow`}
        >
          <Arrow />
        </div>
        {isExpanded && hoverEffectEnabled
          ? "Expand menu"
          : isExpanded
          ? "Collapse menu"
          : ""}
      </div>
    </div>
  );
};

export default Sidebar;
