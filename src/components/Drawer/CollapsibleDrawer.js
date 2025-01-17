import React, { useState,useRef,useEffect} from "react";
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
import "./CollapsibleDrawer.css"; // Import the CSS file

const CollapsibleDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("/"); // Track selected menu item
  const location = useLocation();
  const [manualOverride, setManualOverride] = useState(false); // Disable/Enable hover functionality
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false); // Hamburger menu toggle\
  const sidebarRef = useRef(null); // Reference for sidebar
  const [isTabletView, setIsTabletView] = useState(false); // Track if in tablet view

  // Check screen size to disable collapse in tablet view
  useEffect(() => {
    const handleResize = () => {
      setIsTabletView(window.innerWidth >= 768); // Tailwind's `md` breakpoint
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);
    // Close sidebar when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          setIsHamburgerOpen(false); // Close the sidebar
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  const toggleHamburger = () => setIsHamburgerOpen(!isHamburgerOpen);

  const toggleSidebar = () => {
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
    if (!manualOverride) setIsOpen(false);
  };
  // Update selectedItem when the route changes
  React.useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  // Helper function to determine if a menu item is selected
  const isSelected = (path) => selectedItem === path;

  return (
    <div className="flex h-screen">
      {/* Hamburger menu for smaller screen  */}
      {/* Hamburger Menu for Smaller Screens */}
      {!isHamburgerOpen && (
        <button
          className="hamburger bg-customBlue text-white p-2 rounded-md md:hidden fixed top-4 left-4 z-50"
          onClick={toggleHamburger}
        >
          ☰ {/* Hamburger icon */}
        </button>
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef} // Attach ref to the sidebar
        className={`sidebar ${
          isHamburgerOpen ? "expanded absolute z-50 top-0 left-0" : isOpen ? "expanded" : "collapsed"
        }`} // Ensure it shows fully expanded when isHamburgerOpen is true
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
     {/* Logo and Dashboard Title */}
     <div className={`logo-container ${!isOpen && !isHamburgerOpen ? "logo-container-expanded" : ""}`}>
          <img
            src={Logo}
            alt="Logo"
            className={`logo ${isHamburgerOpen ? "visible" : "hidden md:block"}`} // Show logo when hamburger is open
          />
          {(isOpen || isHamburgerOpen) && <text className="title">Pipe Recruiter</text>}
        </div>


        {/* Dashboard Section */}
        <div className={`menu-section ${isOpen || isHamburgerOpen ? "section-expanded" : "section-collapsed"}`}>
          <text className="menu-title">DASHBOARD</text>
          <ul>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/") ? "selected" : ""
              }`} /* Apply selected styles */
            >
              <Link to="/" className="menu-link">
                <img
                  src={HomeIcon}
                  alt="HomeIcon"
                  className={`menu-icon ${
                    isSelected("/") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Home</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* People Section */}
        <div className={`menu-section ${isOpen || isHamburgerOpen ? "section-expanded" : "section-collapsed"}`}>
          <text className="menu-title">PEOPLE</text>
          <ul>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/user") ? "selected" : ""
              }`}
            >
              <Link to="/user" className="menu-link">
                <img
                  src={User}
                  alt="UserIcon"
                  className={`menu-icon ${
                    isSelected("/user") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">User</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/teams") ? "selected" : ""
              }`}
            >
              <Link to="/teams" className="menu-link">
                <img
                  src={Teams}
                  alt="TeamsIcon"
                  className={`menu-icon ${
                    isSelected("/teams") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Teams</span>}
              </Link>
            </li>
          </ul>
        </div>
        {/* Recruitment Section */}
        <div className={`menu-section ${isOpen || isHamburgerOpen ? "section-expanded" : "section-collapsed"}`}>
          <text className="menu-title">RECRUITMENT</text>
          <ul>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/client") ? "selected" : ""
              }`}
            >
              <Link to="/client" className="menu-link">
                <img
                  src={ClientIcon}
                  alt="UserIcon"
                  className={`menu-icon ${
                    isSelected("/client") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Client</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/jobs") ? "selected" : ""
              }`}
            >
              <Link to="/jobs" className="menu-link">
                <img
                  src={Jobs}
                  alt="TeamsIcon"
                  className={`menu-icon ${
                    isSelected("/jobs") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Jobs</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/candidates") ? "selected" : ""
              }`}
            >
              <Link to="/candidates" className="menu-link">
                <img
                  src={Candidates}
                  alt="TeamsIcon"
                  className={`menu-icon ${
                    isSelected("/candidates") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Candidates</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/placements") ? "selected" : ""
              }`}
            >
              <Link to="/placements" className="menu-link">
                <img
                  src={Placements}
                  alt="TeamsIcon"
                  className={`menu-icon ${
                    isSelected("/placements") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Placements</span>}
              </Link>
            </li>
          </ul>
        </div>
        {/* Tools Section */}
        <div className={`menu-section ${isOpen || isHamburgerOpen ? "section-expanded" : "section-collapsed"}`}>
          <text className="menu-title">TOOLS</text>
          <ul>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/sourcing") ? "selected" : ""
              }`}
            >
              <Link to="/sourcing" className="menu-link">
                <img
                  src={SourcingIcon}
                  alt="SourcingIcon"
                  className={`menu-icon ${
                    isSelected("/sourcing") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Sourcing</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/reports") ? "selected" : ""
              }`}
            >
              <Link to="/reports" className="menu-link">
                <img
                  src={Reports}
                  alt="ReportsIcon"
                  className={`menu-icon ${
                    isSelected("/reports") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Reports</span>}
              </Link>
            </li>
            <li
              className={`menu-item ${isOpen ? "expanded" : ""} ${
                isSelected("/calendar") ? "selected" : ""
              }`}
            >
              <Link to="/calendar" className="menu-link">
                <img
                  src={Calendar}
                  alt="CalendarIcon"
                  className={`menu-icon ${
                    isSelected("/calendar") ? "icon-selected" : ""
                  }`}
                />
                {(isOpen || isHamburgerOpen) && <span className="menu-text">Calendar</span>}
              </Link>
            </li>
          </ul>
        </div>

     {isTabletView &&   <div
          className={`back-button-section ${
            isOpen ? "section-expanded" : "section-collapsed"
          }`}
        >
          <button
            className="back-button"
            onClick={toggleSidebar} // Collapse the menu
          >
            <div className="flex items-center">
              <img src={arrow} alt="arrow" className={"arrow-style"} />
              {(isOpen || isHamburgerOpen) && <span className="collapse-text">Collapse Menu</span>}
            </div>
          </button>
        </div>}
      </div>
      {/* collapse menu div */}

      {/* Main Content */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sourcing" element={<Sourcing />} />
          <Route path="/client" element={<Client />} />
        </Routes>
      </div>
    </div>
  );
};

export default CollapsibleDrawer;
