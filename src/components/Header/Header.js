import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import SearchIcon from "../../assets/icons/sourcingIcons/search-normal.svg";
import Add from "../../assets/icons/add.svg";
import MessagesIcon from "../../assets/icons/sourcingIcons/messages.svg";
import NotificationIcon from "../../assets/icons/sourcingIcons/notification.svg";
import ProfileImage from "../../assets/images/profileImage.svg";
import CollapsibleDrawer from "../Drawer/CollapsibleDrawer";

const Header = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);
  const [isTabletView, setIsTabletView] = useState(
    window.innerWidth >= 768 && window.innerWidth <= 1024
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(
    !isMobileView && !isTabletView
  );
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 768);
      setIsTabletView(width >= 768 && width <= 1024);
      setIsDrawerOpen(!(width < 1024)); // Auto open drawer for desktops
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleSearchExpand = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchCancel = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };

  return (
    <div className="w-full h-full bg-gray-100 overflow-hidden">
      <div
        className={`fixed top-0 left-0 right-0 h-[68px]  bg-white flex items-center transition-all duration-300 z-50 `}
      >
        {" "}
        {isMobileView || isTabletView ? (
          <button
            className="hamburger-button fixed  z-50"
            onClick={toggleDrawer}
          ></button>
        ) : null}
        <CollapsibleDrawer
          isSearchExpanded={isSearchExpanded}
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
          sidebarRef={sidebarRef}
        />
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
          <div className="flex justify-between  bg-white w-full">
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
    </div>
  );
};

export default Header;
