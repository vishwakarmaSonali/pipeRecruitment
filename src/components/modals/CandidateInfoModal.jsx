import React, { useEffect, useState } from "react";
import { useModal } from "../common/ModalProvider";
import Modal from "react-bootstrap/Modal";
import { getRandomColor } from "../../helpers/utils";
import { Avatar, Menu } from "@mui/material";
import { ReactComponent as LabelIcon } from "../../pages/Recruitment/Candidates/assets/label.svg";
import { ReactComponent as AddIcon } from "../../pages/Recruitment/Candidates/assets/add.svg";
import { ReactComponent as MoreIcon } from "../../pages/Recruitment/Candidates/assets/more.svg";
import { ReactComponent as SettingIcon } from "../../pages/Recruitment/Candidates/assets/setting.svg";
import { ReactComponent as AddJobIcon } from "../../pages/Recruitment/Candidates/assets/addJob.svg";
import { ReactComponent as AddFolderIcon } from "../../pages/Recruitment/Candidates/assets/addFolder.svg";
import { ReactComponent as MarkProfileIcon } from "../../pages/Recruitment/Candidates/assets/profile-tick.svg";
import { ReactComponent as DownloadIcon } from "../../pages/Recruitment/Candidates/assets/download.svg";
import { ReactComponent as ArchiveIcon } from "../../pages/Recruitment/Candidates/assets/archive.svg";
import { ReactComponent as ModalClose } from "../../pages/Recruitment/Candidates/assets/modalClose.svg";
import { ReactComponent as ModalPrevious } from "../../pages/Recruitment/Candidates/assets/modalPrevious.svg";
import { ReactComponent as ModalNext } from "../../pages/Recruitment/Candidates/assets/modalNext.svg";
import { commonStyle } from "../../helpers/config";

const candidateInfoTabs = [
  {
    id: 1,
    name: "Summary",
    // icon: <ResumeIcon />,
    selected: true,
  },
  {
    id: 2,
    name: "Resume",
    // icon: <ResumeIcon />,
    selected: false,
  },
  {
    id: 3,
    name: "Jobs",
    // icon: <JobIcon />,
    count: "04",
    selected: false,
  },
  {
    id: 4,
    name: "Inbox",
    // icon: <InboxIcon />,
    selected: false,
  },
  {
    id: 5,
    name: "Calendar",
    // icon: <CalendarIcon />,
    selected: false,
  },
  {
    id: 6,
    name: "Enrich User Profile",
    // icon: <PenIcon />,
    selected: false,
  },
  {
    id: 7,
    name: "Attachments",
    // icon: <AttachmentIcon />,
    count: "06",
    selected: false,
  },
];

const labelData = [
  {
    id: 1,
    name: "High Priority",
  },
  {
    id: 2,
    name: "Important",
  },
];

const CandidateInfoModal = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [candidateTabs, setCandidateTabs] = useState(candidateInfoTabs);
  const [selectedCandidateTab, setSelectedCandidateTab] = useState("Summary");
  const [anchorEl, setAnchorEl] = useState(null);
  const [randomColor, setRandomColor] = useState([]);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const selectedTabHandler = (id) => {
    const updatedData = candidateTabs?.map((item) => {
      if (item?.id === id) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    const filterTab = updatedData?.filter((item) => item?.selected);
    setSelectedCandidateTab(filterTab[0]?.name);
    setCandidateTabs(updatedData);
  };

  useEffect(() => {
    const random = getRandomColor();
    setRandomColor(random);
  }, []);

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };
  return (
    <Modal
      show={visible}
      onHide={handleBackdropClick}
      dialogClassName={`candidate-info-common-modal`}
      contentClassName="modal-content"
      backdropClassName="custom-backdrop"
      centered
    >
      <div
        className={`candidate-info-modal-container ${
          modals?.animatedModal && "shake"
        }`}
      >
        <div className="candidate-info-header">
          <div className="display-flex-justify align-center">
            <div className="display-flex" style={{ gap: 10 }}>
              <Avatar
                src={""}
                alt={"Priya Sharma"}
                style={{ width: 60, height: 60, backgroundColor: randomColor }}
              />
              <div className="display-column" style={{ gap: 8 }}>
                <p className="font-16-medium color-dark-black">Priya Sharma</p>
                <div
                  className="display-flex align-center"
                  style={{ gap: 8, flexWrap: "wrap" }}
                >
                  {labelData?.map((item) => {
                    const color = getRandomColor();
                    return (
                      <div key={item?.id} className="candidate-info-label">
                        <LabelIcon fill={color} /> {item?.name}
                      </div>
                    );
                  })}
                  <button className="add-label-btn-candidate-info">
                    <AddIcon /> Label
                  </button>
                </div>
              </div>
            </div>
            <div className="display-flex" style={{ gap: 10 }}>
              <div className="profile-progress-div-1">56%</div>
              <div className="profile-progress-div-2">62</div>
            </div>
          </div>
          <div className="display-flex-justify align-center">
            <div className="candidate-info-tab-main">
              {candidateTabs?.map((item) => {
                return (
                  <button
                    key={item?.id}
                    className={`candidate-info-tab-btn ${
                      item?.selected && "active-info-tab"
                    }`}
                    onClick={() => selectedTabHandler(item?.id)}
                  >
                    {item?.name}{" "}
                    {item?.count && (
                      <span className="candidate-info-tab-count">
                        {item?.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="display-flex align-center" style={{ gap: 18 }}>
              <button className="customize-btn">
                Customize
                <SettingIcon />
              </button>
              <button
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
              >
                <MoreIcon />
              </button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: commonStyle.sx,
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <div className="display-column">
                  <button className="common-menu-item-btn">
                    <AddJobIcon /> Add to Jobs
                  </button>
                  <button className="common-menu-item-btn">
                    <AddFolderIcon /> Add to Folder
                  </button>
                  <button className="common-menu-item-btn">
                    <MarkProfileIcon /> Mark as Employee
                  </button>
                  <button className="common-menu-item-btn">
                    <DownloadIcon /> Download Resume
                  </button>
                  <button className="common-menu-item-btn">
                    <ArchiveIcon /> Archive
                  </button>
                </div>
              </Menu>
            </div>
          </div>
        </div>
        <div className="candidate-info-inner-container"></div>
      </div>
      <div className="close-previous-next-btn-wrapper">
        <button className="modal-close-btn" onClick={onClose}>
          <ModalClose />
        </button>
        <button className="modal-next-btn">
          <ModalNext />
        </button>
        <button className="modal-previous-btn">
          <ModalPrevious />
        </button>
      </div>
    </Modal>
  );
};

export default CandidateInfoModal;
