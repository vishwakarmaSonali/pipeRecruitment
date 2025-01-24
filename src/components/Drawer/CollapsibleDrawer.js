import React, { useState, useRef, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Client from "../../pages/Recruitment/Client";
import Sourcing from "../../pages/Tools/Sourcing/Sourcing";
import Logo from "../../assets/images/Logo.svg";
import HomeIcon from "../../assets/icons/homeIcon.svg";
import User from "../../assets/icons/user.svg";
import Teams from "../../assets/icons/teams.svg";
import ClientIcon from "../../assets/icons/client.svg";
import Jobs from "../../assets/icons/jobs.svg";
import Candidates from "../../assets/icons/candidates.svg";
import Placements from "../../assets/icons/placements.svg";
import SourcingIcon from "../../assets/icons/sourcing.svg";
import Reports from "../../assets/icons/reports.svg";
import Calendar from "../../assets/icons/calendar.svg";
import arrow from "../../assets/icons/expandablearrow.svg";
import MenuIcon from "../../assets/icons/hamburgerIcon.svg";
import { ThemeProvider, createTheme } from '@mui/material/styles';

// import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import "./CollapsibleDrawer.css"; // Import the CSS file

const CollapsibleDrawer = () => {
  const theme = createTheme();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("/"); // Track selected menu item
  const location = useLocation();
  const [manualOverride, setManualOverride] = useState(true); // Disable/Enable hover functionality
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isTabletView, setIsTabletView] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );
  const sidebarRef = useRef(null);

  // Handle screen resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobileView(true);
        setIsTabletView(false);
        setIsOpen(false); // Ensure sidebar is closed by default on mobile
      } else if (width >= 768 && width <= 1024) {
        setIsMobileView(false);
        setIsTabletView(true);
        setIsOpen(false); // Ensure sidebar is closed by default on tablets
      } else {
        setIsMobileView(false);
        setIsTabletView(false);
        setIsOpen(true); // Sidebar should be open on desktops
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when clicking outside (for mobile & tablet views)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (isMobileView || isTabletView) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileView, isTabletView]);

  const toggleDrawer = () => {
    setIsOpen(true);
  };
  const toggleSidebar = (e) => {
    setManualOverride(!manualOverride); // Toggle manual override
    
    if (manualOverride) {
      
      setIsOpen(false); // Allow hover functionality and reset to collapsed
    } else {
      
      setIsOpen(true); // Keep sidebar open when manually overridden
    }
  };

  const handleMouseEnter = () => {
    if (!manualOverride) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!manualOverride) setIsOpen(!isOpen);
  };
  // Update selectedItem when the route changes
  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  // Helper function to determine if a menu item is selected
  const isSelected = (path) => selectedItem === path;

  return (
    <div className="flex h-full w-full">
      {/* Hamburger menu for smaller screen  */}
      {/* Hamburger Menu for Smaller Screens */}
      {(isMobileView || isTabletView) && !isOpen && (
        <button
          className="hamburger-button fixed top-4 left-4 z-50"
          onClick={toggleDrawer}
        >
          <img src={MenuIcon} alt="Menu" className="w-8 h-8" />
        </button>
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`sidebar 
        ${
          isMobileView || isTabletView
            ? isOpen
              ? "mobile-expanded"
              : "hidden"
            : isOpen
            ? "expanded"
            : "collapsed"
        }
      `}
        {...(!isMobileView &&
          !isTabletView && {
            onMouseEnter: () => handleMouseEnter(),
            onMouseLeave: () => handleMouseLeave(),
          })}
      >
        {/* Logo and Dashboard Title */}
        <div
          className={`logo-container ${
            !isOpen ? "justify-center" : ""
          } items-center`}
        >
          <img
            src={Logo}
            alt="Logo"
            className={`logo ${isOpen ? "visible" : "hidden md:block"}`}
          />
          {isOpen && <text className="title">Pipe Recruiter</text>}
        </div>

        <div className="overflow-auto scroll-width-none">
          {/* Dashboard Section */}
          <div
            className={`menu-section ${
              isOpen ? "section-expanded" : "section-collapsed"
            }`}
          >
            <text className="menu-title">DASHBOARD</text>
            <ul className={`${isOpen ? "menu-ul" : ""}`}>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/") ? "selected" : ""
                }`} /* Apply selected styles */
              >
                <Link
                  to="/"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={HomeIcon}
                    alt="HomeIcon"
                    className={`menu-icon ${
                      isSelected("/") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Home</span>}
                </Link>
              </li>
            </ul>
          </div>

          {/* People Section */}
          <div
            className={`menu-section ${
              isOpen ? "section-expanded" : "section-collapsed"
            }`}
          >
            <text className="menu-title">PEOPLE</text>
            <ul className={`${isOpen ? "menu-ul" : ""}`}>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/user") ? "selected" : ""
                }`}
              >
                <Link
                  to="/user"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={User}
                    alt="UserIcon"
                    className={`menu-icon ${
                      isSelected("/user") ? "icon-selected" : ""
                    }`}
                  />

                  {isOpen && <span className="menu-text">User</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/teams") ? "selected" : ""
                }`}
              >
                <Link
                  to="/teams"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Teams}
                    alt="TeamsIcon"
                    className={`menu-icon ${
                      isSelected("/teams") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Teams</span>}
                </Link>
              </li>
            </ul>
          </div>
          {/* Recruitment Section */}
          <div
            className={`menu-section ${
              isOpen ? "section-expanded" : "section-collapsed"
            }`}
          >
            <text className="menu-title">RECRUITMENT</text>
            <ul className={`${isOpen ? "menu-ul" : ""}`}>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/client") ? "selected" : ""
                }`}
              >
                <Link
                  to="/client"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={ClientIcon}
                    alt="UserIcon"
                    className={`menu-icon ${
                      isSelected("/client") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Client</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/jobs") ? "selected" : ""
                }`}
              >
                <Link
                  to="/jobs"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Jobs}
                    alt="TeamsIcon"
                    className={`menu-icon ${
                      isSelected("/jobs") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Jobs</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/candidates") ? "selected" : ""
                }`}
              >
                <Link
                  to="/candidates"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Candidates}
                    alt="TeamsIcon"
                    className={`menu-icon ${
                      isSelected("/candidates") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Candidates</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/placements") ? "selected" : ""
                }`}
              >
                <Link
                  to="/placements"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Placements}
                    alt="TeamsIcon"
                    className={`menu-icon ${
                      isSelected("/placements") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Placements</span>}
                </Link>
              </li>
            </ul>
          </div>
          {/* Tools Section */}
          <div
            className={`menu-section ${
              isOpen ? "section-expanded" : "section-collapsed"
            }`}
          >
            <text className="menu-title">TOOLS</text>
            <ul className={`${isOpen ? "menu-ul" : ""}`}>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/sourcing") ? "selected" : ""
                }`}
              >
                <Link
                  to="/sourcing"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={SourcingIcon}
                    alt="SourcingIcon"
                    className={`menu-icon ${
                      isSelected("/sourcing") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Sourcing</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/reports") ? "selected" : ""
                }`}
              >
                <Link
                  to="/reports"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Reports}
                    alt="ReportsIcon"
                    className={`menu-icon ${
                      isSelected("/reports") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Reports</span>}
                </Link>
              </li>
              <li
                className={`menu-item ${isOpen ? "expanded" : ""} ${
                  isSelected("/calendar") ? "selected" : ""
                }`}
              >
                <Link
                  to="/calendar"
                  className="menu-link"
                  onClick={() => {
                    if (isTabletView) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <img
                    src={Calendar}
                    alt="CalendarIcon"
                    className={`menu-icon ${
                      isSelected("/calendar") ? "icon-selected" : ""
                    }`}
                  />
                  {isOpen && <span className="menu-text">Calendar</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* collapse menu div */}
        {!isTabletView && (
          <div
            className={`back-button-section ${
              isOpen ? "section-expanded" : "section-collapsed"
            }`}
          >
            <button
              className="back-button"
              onClick={  toggleSidebar}// Collapse the menu
            >
             { manualOverride?<div className="flex items-center" >
                <img src={arrow} alt="arrow" className={"arrow-style rotate-180 mr-2"} />
                {isOpen && <span className="collapse-text">Collapse menu</span>}
              </div> : <div className="flex items-center">
                {isOpen && <span className="collapse-text">Expand menu</span>}
                <img src={arrow} alt="arrow" className={"arrow-style"} />
              </div>}
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className={`main-content flex-1 ${
          isTabletView && isOpen ? "blurred" : ""
        }`}
      >
            <ThemeProvider theme={theme}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/client" element={<Client />} />
        </Routes>
        </ThemeProvider>

      </div>
    </div>
  );
};

export default CollapsibleDrawer;
