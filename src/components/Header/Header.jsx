import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux"; // Import Redux selector

import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg";
import Add from "../../assets/icons/add.svg";
import MessagesIcon from "../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../assets/icons/sourcingIcons/notification.svg";
import ProfileImage from "../../assets/images/profileImage.svg";
import CollapsibleDrawer from "../Drawer/CollapsibleDrawer";
import { ReactComponent as Menubar } from "../../assets/icons/menuBar.svg";
import { ReactComponent as DownArrow } from "../../assets/icons/droparrow.svg";

import { Drawer } from "@mui/material";
import { ReactComponent as Logo } from "../../assets/images/LogoExpanded.svg";
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
import { ReactComponent as StarFilled } from "../../assets/icons/starfilledYellow.svg";
import { ReactComponent as StarOutline } from "../../assets/icons/starOutline.svg";
import { ReactComponent as InfoCircle } from "../../assets/icons/infoCircle.svg";
import { useLocation, Link } from "react-router-dom";
import { useModal } from "../common/ModalProvider";
import SavedFiltersModal from "../modals/SavedFiltersModal";

const Header = ({ title,onFilterSelect }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Candidates");
  const { modals, setModalVisibility } = useModal();
  const savedFilters = useSelector((state) => state.filters.filters); // Get saved filters from Redux
  const [showAllFilters, setShowAllFilters] = useState(false); // State to track showing all filters

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const categories = [
    { label: "Candidates without jobs", type: "favorite" },
    { label: "Duplicates", type: "favorite" },
  ];

  // const createdByMe = [
  //   { label: "Sourced", type: "created" },
  //   { label: "Owned by me", type: "created" },
  //   { label: "Referrals", type: "created" },
  // ];

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setdrawerOpen(open);
  };
    // ✅ Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setIsDropdownOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  
    // ✅ Position the dropdown correctly
    const handleDropdownOpen = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
        });
      }
      setIsDropdownOpen((prev) => !prev);
    };
    const handleDropdownSelect = (filterName) => {
      setSelectedCategory(filterName);
      setIsDropdownOpen(false);
      if (onFilterSelect) {
        onFilterSelect(filterName); // Call the function passed from Candidates component
      }
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
    <div className="w-full  overflow-hidden sticky-header ">
      {isSearchExpanded ? (
        <div className="flex items-center justify-between w-full ">
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
        <div className="flex justify-between align-center w-full">
          <button className="hamburger-button" onClick={toggleDrawer(true)}>
            <Menubar />
          </button>
        {/* ✅ Dropdown in Title */}
        {title === "Candidates" ? (
            <div className="relative inline-block">
              <button
                ref={buttonRef}
                className="text-lg font-semibold text-black flex items-center space-x-2 px-3 py-2 rounded-lg"
                onClick={handleDropdownOpen}
              >
                <span>{selectedCategory}</span>
                <DownArrow className="w-4 h-4" fill="customBlue" />
              </button>

              {isDropdownOpen &&
                ReactDOM.createPortal(
                  <div
                    ref={dropdownRef}
                    className="absolute w-64 max-h-[500px] overflow-auto scroll-width-none bg-white shadow-lg rounded-[14px] z-[9999]"
                    style={{
                      position: "absolute",
                      top: `${dropdownPosition.top}px`,
                      left: `${dropdownPosition.left}px`,
                      width: "max-content",
                      minWidth: "220px",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                      zIndex: 9999,
                    }}
                  >
                    <div>
                      <div className="candidate-dropdown-div">
                      <p className="candidate-dropdown-heading">Favourite</p>
                     <InfoCircle />
                        </div>
                      {categories.map((item) => (
                        <button
                          key={item.label}
                          className="candidate-dropdown-list"
                          onClick={() => {
                            setSelectedCategory(item.label);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <StarFilled />
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="">
                    <div className="candidate-dropdown-div">
                      <p className="candidate-dropdown-heading">Created by me</p>
                     <InfoCircle />
                        </div>
                        {savedFilters.length > 0 ? (
                      (showAllFilters ? savedFilters : savedFilters.slice(0, 3)).map((filter) => (
                        <button
                          key={filter.id}
                          className="candidate-dropdown-list"
                          // onClick={() => {
                          //   setSelectedCategory(filter.name);
                          //   setIsDropdownOpen(false);
                          // }}
                          onClick={() => handleDropdownSelect(filter.name)}
                        >
                          <StarOutline />
                          {filter.name} {/* Show filter name */}
                        </button>
                      ))
                    ) : (
                      <p className="candidate-dropdown-list text-gray-500">
                        No saved filters
                      </p>
                    )}

                    {/* ✅ Toggle Button to Show All Filters */}
                    {savedFilters.length > 3 && (
                      <button
                        className="candidate-dropdown-list text-customBlue font-medium"
                        onClick={() => setShowAllFilters((prev) => !prev)}
                      >
                        {showAllFilters ? "Show less" : "See all"}
                      </button>
                    )}
                    </div>
                    <div className="">
                    <div className="candidate-dropdown-div justify-between">
                     <div className="flex items-center gap-[10px]">
                     <p className="candidate-dropdown-heading">Shared with me</p>
                     <InfoCircle />
                      </div>
                     <DownArrow  fill="customBlue"/>
                        </div>
                      {/* {createdByMe.map((item) => (
                        <button
                          key={item.label}
                          className="candidate-dropdown-list"
                          onClick={() => {
                            setSelectedCategory(item.label);
                            setIsDropdownOpen(false);
                          }}
                        >
                          
                          {item.label}
                        </button>
                      ))} */}
                 
                    </div>
                    <div className="border-t border-gray-200 ">
                      <button className="candidate-dropdown-list"  onClick={ (event) => (setModalVisibility("savedFiltersModalVisible", true),setIsDropdownOpen(false))}>
                        Manage filters
                      </button>
                    </div>
                  </div>,
                  document.body
                )}
            </div>
          ) : (
            <h1 className="header-title">{title}</h1>
          )}
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
                  to={"#"}
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
                  to={"#"}
                  className={`common-link-text ${
                    activeLink === "/user" && "active-link"
                  }`}
                >
                  <User />
                  {"User"}
                </Link>
                <Link
                  to={"#"}
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
                  to={"#"}
                  className={`common-link-text ${
                    activeLink === "/jobs" && "active-link"
                  } `}
                >
                  <Jobs />
                  {"Jobs"}
                </Link>
                <Link
                  to={"#"}
                  className={`common-link-text ${
                    activeLink === "/candidates" && "active-link"
                  } }`}
                >
                  <Candidates />
                  {"Candidates"}
                </Link>
                <Link
                  to={"#"}
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
                  to={"#"}
                  className={`common-link-text ${
                    activeLink === "/reports" && "active-link"
                  } `}
                >
                  <Reports />
                  {"Reports"}
                </Link>
                <Link
                  to={"#"}
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
      <SavedFiltersModal
        visible={modals?.savedFiltersModalVisible}
        onClose={() =>
          setModalVisibility("savedFiltersModalVisible", false)
        }
      />
    </div>
  );
};

export default Header;
