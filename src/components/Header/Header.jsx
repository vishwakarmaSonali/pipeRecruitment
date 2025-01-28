import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg";
import Add from "../../assets/icons/add.svg";
import MessagesIcon from "../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../assets/icons/sourcingIcons/notification.svg";
import ProfileImage from "../../assets/images/profileImage.svg";
import CollapsibleDrawer from "../Drawer/CollapsibleDrawer";
import { ReactComponent as Menubar } from "../../assets/icons/menuBar.svg";
import { Drawer } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
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
import { useLocation, Link } from "react-router-dom";

const Header = ({ title }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setdrawerOpen(open);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {};

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCancel = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };

  return (
    <div className="w-full  bg-gray-100 overflow-hidden sticky-header ">
      <div
        className={`h-[68px]  bg-white flex items-center transition-all duration-300 z-50  `}
      >
        {isSearchExpanded ? (
          <div className="flex items-center justify-between w-full px-6">
            <div className="relative w-full md:flex font-ubuntu font-normal px-10 h-[40px] text-sm text-gray-700 bg-gray-100 rounded-[8px] focus:outline-none focus:ring-1 transition-all duration-300 ease-in-out flex items-center">
              <img
                src={SearchIcon}
                alt="Search"
                className="search-icon"
                onClick={handleSearchExpand}
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearchCancel}
              className="ml-4 text-buttonBLue font-ubuntu font-medium cursor-pointer md:flex"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            className="flex justify-between align-center  bg-white w-full"
            style={{ padding: "10px 16px" }}
          >
            <button className="hamburger-button" onClick={toggleDrawer(true)}>
              <Menubar />
            </button>
            <h1 className="header-title">{title}</h1>
            <div className="flex items-center header-icons-container space-x-2">
              <div className="relative hidden md:hidden lg:flex ">
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="search-icon"
                  onClick={handleSearchExpand}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input focus:outline-none focus:ring-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="header-icons search xl:hidden"
                onClick={handleSearchExpand}
              >
                <img src={SearchIcon} alt="Search" />
              </button>
              <div className="header-icons">
                <img src={Add} alt="AddIcon" />
              </div>
              <div className="header-icons">
                <img src={MessagesIcon} alt="MessagesIcon" />
              </div>
              <div className="header-icons">
                <img src={NotificationIcon} alt="NotificationIcon" />
              </div>
              <div className="profile-div">
                <img src={ProfileImage} alt="ProfileImage" />
              </div>
            </div>
          </div>
        )}
      </div>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onKeyDown={toggleDrawer(false)}
          className="main-drawer-div"
        >
          <div className="sidebar-section-1">
            <Logo />
            <div className="sidebar-menu-container">
              <div className={`common-sidebar-menu `}>
                <p className="sidebar-menu-label">Dashboard</p>
                <Link
                  to={"/"}
                  className={`common-link-text ${
                    activeLink === "/" && "active-link"
                  }`}
                >
                  <HomeIcon />
                  {"Home"}
                </Link>
              </div>

              <div className={`common-sidebar-menu `}>
                <p className="sidebar-menu-label">People</p>
                <Link
                  to={"/user"}
                  className={`common-link-text ${
                    activeLink === "/user" && "active-link"
                  }`}
                >
                  <User />
                  {"User"}
                </Link>
                <Link
                  to={"/teams"}
                  className={`common-link-text ${
                    activeLink === "/temas" && "active-link"
                  } `}
                >
                  <Teams />
                  Teams
                </Link>
              </div>

              <div className={`common-sidebar-menu `}>
                <p className="sidebar-menu-label">Recruitment</p>
                <Link
                  to={"/client"}
                  className={`common-link-text ${
                    activeLink === "/client" && "active-link"
                  } `}
                >
                  <ClientIcon />
                  {"Client"}
                </Link>
                <Link
                  to={"/jobs"}
                  className={`common-link-text ${
                    activeLink === "/jobs" && "active-link"
                  } `}
                >
                  <Jobs />
                  {"Jobs"}
                </Link>
                <Link
                  to={"/candidates"}
                  className={`common-link-text ${
                    activeLink === "/candidates" && "active-link"
                  } }`}
                >
                  <Candidates />
                  {"Candidates"}
                </Link>
                <Link
                  to={"/placements"}
                  className={`common-link-text ${
                    activeLink === "/placements" && "active-link"
                  } `}
                >
                  <Placements />
                  {"Placements"}
                </Link>
              </div>

              <div className={`common-sidebar-menu `}>
                <p className="sidebar-menu-label">Tools</p>
                <Link
                  to={"/sourcing"}
                  className={`common-link-text ${
                    activeLink === "/sourcing" && "active-link"
                  } `}
                >
                  <SourcingIcon />
                  {"Sourcing"}
                </Link>
                <Link
                  to={"/reports"}
                  className={`common-link-text ${
                    activeLink === "/reports" && "active-link"
                  } `}
                >
                  <Reports />
                  {"Reports"}
                </Link>
                <Link
                  to={"/calender"}
                  className={`common-link-text ${
                    activeLink === "/calender" && "active-link"
                  } `}
                >
                  <Calendar />
                  {"Calender"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
