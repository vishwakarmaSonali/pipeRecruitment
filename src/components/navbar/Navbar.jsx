import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [activeLink, setActiveLink] = useState("/");
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const open = Boolean(anchorEl);
  const openCandidates = Boolean(anchorE2);
  const openUsers = Boolean(anchorE3);

  const handleCandidateMenuClick = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleCandidateMenuClose = () => {
    setAnchorE2(null);
  };

  const handleUserMenuClick = (event) => {
    setAnchorE3(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorE3(null);
  };

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
        <Link
          aria-controls={openUsers ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openUsers ? "true" : undefined}
          onClick={handleUserMenuClick}
          className="nav-common-link-text"
        >
          Users
          <DropDown />
        </Link>
        <Link
          aria-controls={openCandidates ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCandidates ? "true" : undefined}
          onClick={handleCandidateMenuClick}
          className="nav-common-link-text"
        >
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
        <div className="display-flex" style={{ gap: 6 }}>
          <button
            className="search-input-div-nav"
            disabled={showSearch}
            onClick={() => {
              setShowSearch(true);
              setTimeout(() => inputRef.current?.focus(), 10);
            }}
          >
            <SearchIcon width={16} height={16} />
            <input
              type="text"
              ref={inputRef}
              placeholder="Search"
              className={`search-input-nav ${
                showSearch ? "nav-search-visible" : ""
              }`}
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => setShowSearch(false)}
            />
          </button>

          <button className="common-nav-btn">
            <Add width={16} height={16} />
          </button>
          <button className="common-nav-btn">
            <MessagesIcon width={16} height={16} />
          </button>
          <button className="common-nav-btn">
            <NotificationIcon width={16} height={16} />
          </button>
          <button
            className="common-nav-btn display-none tab-visible"
            onClick={toggleDrawer(true)}
          >
            <MenuBar width={16} height={16} />
          </button>
        </div>
        <button
          className="nav-profile hidden-tab"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        >
          <img src={profileImage} className="common-img" />
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: commonStyle.sx,
          }}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <div className="display-column">
            <button className="common-menu-item-btn">
              <ProfileIcon /> Account
            </button>
            <button
              className="common-menu-item-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/administration");
                handleMenuClose();
              }}
            >
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
        <Menu
          anchorEl={anchorE2}
          open={openCandidates}
          onClose={handleCandidateMenuClose}
          PaperProps={{
            sx: commonStyle.sx120,
          }}
          aria-controls={openCandidates ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openCandidates ? "true" : undefined}
        >
          <div className="display-column">
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleCandidateMenuClose();
                navigate("/candidates");
              }}
            >
              Candidates
            </button>
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleCandidateMenuClose();
              }}
            >
              Folders
            </button>
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleCandidateMenuClose();
              }}
            >
              Placements
            </button>
          </div>
        </Menu>
        <Menu
          anchorEl={anchorE3}
          open={openUsers}
          onClose={handleUserMenuClose}
          PaperProps={{
            sx: commonStyle.sx120,
          }}
          aria-controls={openUsers ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openUsers ? "true" : undefined}
        >
          <div className="display-column">
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleUserMenuClose();
              }}
            >
              Recruiters
            </button>
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleUserMenuClose();
              }}
            >
              Teams
            </button>
            <button
              className="common-menu-item-btn"
              onClick={() => {
                handleUserMenuClose();
              }}
            >
              Clients
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
