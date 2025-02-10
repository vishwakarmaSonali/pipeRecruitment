import React, { useEffect, useState } from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DropDown } from "../../assets/icons/arrowDown.svg";
import { profileImage } from "../../helpers/assets";
import Badge from "@mui/material/Badge";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as Add } from "../../assets/icons/addIcon.svg";
import { ReactComponent as MessagesIcon } from "../../assets/icons/messages.svg";
import { ReactComponent as MenuBar } from "../../assets/icons/nav-menu.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/sourcingIcons/notification.svg";
import { ReactComponent as ProfileIcon } from "./assets/profile.svg";
import { ReactComponent as AdminIcon } from "./assets/admin.svg";
import { ReactComponent as SettingIcon } from "./assets/setting.svg";
import { ReactComponent as GiftIcon } from "./assets/gift.svg";
import { ReactComponent as HelpIcon } from "./assets/help.svg";
import { ReactComponent as LogoutIcon } from "./assets/logout.svg";
import { Drawer, Menu } from "@mui/material";
import { commonStyle } from "../../helpers/config";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/");
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  return (
    <div className="navbar-main-container">
      <Logo />
      <div className="navbar-menu-div hidden-tab">
        <Link
          to="#"
          className={`nav-common-link-text ${
            activeLink === "/" && "nav-active-link"
          }`}
        >
          Home
        </Link>
        <Link to="#" className="nav-common-link-text">
          Users
          <DropDown />
        </Link>
        <Link to="#" className="nav-common-link-text">
          Candidates
          <DropDown />
        </Link>
        <Link
          to="/jobs"
          className={`nav-common-link-text ${
            activeLink === "/jobs" && "nav-active-link"
          }`}
        >
          Jobs
        </Link>
        <Link
          to="/sourcing"
          className={`nav-common-link-text ${
            activeLink === "/sourcing" && "nav-active-link"
          }`}
        >
          Sourcing
        </Link>
        <Link
          to="/reports"
          className={`nav-common-link-text ${
            activeLink === "/reports" && "nav-active-link"
          }`}
        >
          Reports
        </Link>
        <Link
          to="#"
          className={`nav-common-link-text ${
            activeLink === "/calendar" && "nav-active-link"
          }`}
        >
          Calendar
        </Link>
      </div>

      <div className="display-flex align-center" style={{ gap: 10 }}>
        <div className="display-flex " style={{ gap: 6 }}>
          {showSearch ? (
            <div className="search-input-div-nav">
              <SearchIcon />
              <input
                type="text"
                placeholder="Search"
                className="search-input-nav"
                autoFocus
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <button
              className="common-nav-btn"
              onClick={() => setShowSearch(true)}
            >
              <SearchIcon />
            </button>
          )}
          <button className="common-nav-btn">
            <Add />
          </button>
          <button className="common-nav-btn">
            <MessagesIcon />
          </button>
          <button className="common-nav-btn">
            <NotificationIcon />
          </button>

          <button
            className="common-nav-btn display-none tab-visible"
            onClick={toggleDrawer(true)}
          >
            <MenuBar />
          </button>
        </div>
        <btn className="nav-profile hidden-tab" onClick={handleMenuClick}>
          <img src={profileImage} className="common-img" />
        </btn>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: commonStyle.sx,
          }}
        >
          <div className="display-column">
            <button className="common-menu-item-btn">
              <ProfileIcon /> Account
            </button>
            <button className="common-menu-item-btn">
              <AdminIcon /> Administration
            </button>
            <button className="common-menu-item-btn">
              <SettingIcon /> Customization
            </button>
            <button className="common-menu-item-btn">
              <GiftIcon /> What’s New
            </button>
            <button className="common-menu-item-btn">
              <HelpIcon /> Help
            </button>
            <button className="common-menu-item-btn">
              <LogoutIcon /> Log Out
            </button>
          </div>
        </Menu>
      </div>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onKeyDown={toggleDrawer(false)}
          className="nav-main-drawer-div"
        >
          <div className="nav-sidebar-section">
            <div className="nav-sidebar-profile">
              <div className="nav-profile">
                <img src={profileImage} className="common-img" />
              </div>
              <p className="nav-username">User name</p>
            </div>
            <div className="nav-sidebar-menu-container">
              <div className={`nav-common-sidebar-menu `}>
                <p className="sidebar-menu-label">Dashboard</p>
                <div>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/" && "nav-tab-active-link"
                    }`}
                  >
                    {"Home"}
                  </Link>
                </div>
              </div>

              <div className={`nav-common-sidebar-menu `}>
                <p className="sidebar-menu-label">Users</p>
                <div>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/recruiter" && "nav-tab-active-link"
                    }`}
                  >
                    {"Recruiter"}
                  </Link>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/teams" && "nav-tab-active-link"
                    } `}
                  >
                    Teams
                  </Link>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/clients" && "nav-tab-active-link"
                    } `}
                  >
                    Clients
                  </Link>
                </div>
              </div>

              <div className={`nav-common-sidebar-menu `}>
                <p className="sidebar-menu-label">Candidate</p>
                <div>
                  <Link
                    to={"/candidates"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/candidates" && "nav-tab-active-link"
                    } `}
                  >
                    Candidates
                  </Link>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/candidate-folder" &&
                      "nav-tab-active-link"
                    } `}
                  >
                    Candidate Folder
                  </Link>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/advance-search" && "nav-tab-active-link"
                    } }`}
                  >
                    Advance Search
                  </Link>
                  <Link
                    to={"#"}
                    className={`nav-sidebar-common-link-text ${
                      activeLink === "/placements" && "nav-tab-active-link"
                    } `}
                  >
                    Placements
                  </Link>
                </div>
              </div>

              <Link
                to={"#"}
                className={`nav-sidebar-common-link-text ${
                  activeLink === "/jobs" && "nav-tab-active-link"
                } `}
              >
                Jobs
              </Link>
              <Link
                to={"/sourcing"}
                className={`nav-sidebar-common-link-text ${
                  activeLink === "/sourcing" && "nav-tab-active-link"
                } `}
              >
                Sourcing
              </Link>
              <Link
                to={"#"}
                className={`nav-sidebar-common-link-text ${
                  activeLink === "/calender" && "nav-tab-active-link"
                } `}
              >
                Calender
              </Link>
              <Link
                to={"#"}
                className={`nav-sidebar-common-link-text ${
                  activeLink === "/chats" && "nav-tab-active-link"
                } `}
              >
                Chats
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
