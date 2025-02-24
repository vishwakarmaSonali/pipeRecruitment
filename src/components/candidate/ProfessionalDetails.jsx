import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { ReactComponent as RightIcon } from "../../assets/icons/right-circle.svg";
import { ReactComponent as CancleIcon } from "../../assets/icons/close-circle.svg";
import CommonTextInput from "../common/CommonTextInput";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { ReactComponent as DashIcon } from "../../assets/icons/dash.svg";
import CommonSwitch from "../common/CommonSwitch";
import AddEducationDetailsModal from "../modals/AddEducationDetailsModal";
import { icons, languagesOptions } from "../../helpers/config";
import SearchDropdown from "../common/SearchDropDown";
import AddSocialLinksModal from "../modals/AddSocialLinksModal";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import AddSkillsModal from "../modals/AddSkillsModal";

const ProfessionalDetails = ({ details, label }) => {
  const [fields, setFields] = useState(details);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [collapse, setCollapse] = useState(true);
  const [isOn, setIsOn] = useState(false);
  const [selectedMultiLanguages, setSelectedMultiLanguages] = useState([]);
  const [socialLinkModalVisible, setSocialLinkModalVisible] = useState(false);
  const [addSkillModalVisible, setAddSkillModalVisible] = useState(false);

  const handleEdit = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const handleSocialLinkEdit = (key, value) => {
    setEditField(key);
    setTempValue(value);
  };

  const handleLanguageSave = () => {
    console.log(
      ">>>>>>>>>>>>>>>>selectedMultiLanguages",
      selectedMultiLanguages
    );
  };

  const handleSave = (key) => {
    setFields({ ...fields, [key]: tempValue });
    setEditField(null);
  };

  const handleCancel = () => {
    setEditField(null);
  };

  const renderValues = (key, value) => {
    if (key === "Skills") {
      return (
        <div
          key={key}
          className="detail-row"
          style={{ alignItems: "flex-start" }}
        >
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="display-column" style={{ gap: 12 }}>
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {tempValue?.map((item) => {
                      return (
                        <div className="candidate-info-skill-item">
                          {item?.name}{" "}
                          <span style={{ color: "#1761D8" }}>
                            {item?.rating}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="add-details-btn"
                    onClick={() => setAddSkillModalVisible(true)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify ">
                {!!value ? (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <div
                      className="display-flex"
                      style={{ flexWrap: "wrap", gap: 6 }}
                    >
                      {value?.map((item) => {
                        return (
                          <div className="candidate-info-skill-item">
                            {item?.name}{" "}
                            <span style={{ color: "#1761D8" }}>
                              {item?.rating}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                      style={{ alignSelf: "flex-start" }}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <button
                      className="add-details-btn"
                      onClick={() => setAddSkillModalVisible(true)}
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else if (typeof value === "boolean") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            <CommonSwitch
              on={value}
              onToggle={() => {
                setFields({ ...fields, [key]: !value });
              }}
            />
          </div>
        </div>
      );
    } else if (key === "Social Links") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex-justify align-center"
                style={{ gap: 8 }}
              >
                <div className="display-column" style={{ gap: 12 }}>
                  <div
                    className="display-flex"
                    style={{ flexWrap: "wrap", gap: 6 }}
                  >
                    {Object.entries(tempValue)
                      .filter(([_, url]) => url)
                      .map(([key, url]) => (
                        <a
                          key={key}
                          className="social-link-item font-14-regular color-dark-black"
                        >
                          {icons[key]}
                          <span>{key}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTempValue((prev) => ({
                                ...prev,
                                [key]: null,
                              }));
                            }}
                          >
                            <CloseIcon width={8} height={8} />
                          </button>
                        </a>
                      ))}
                  </div>
                  <button
                    className="add-details-btn"
                    onClick={() => setSocialLinkModalVisible(true)}
                  >
                    + Add
                  </button>
                </div>
                <div
                  className="display-flex"
                  style={{ gap: 8, alignSelf: "flex-start" }}
                >
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : Object.values(value).some((url) => url) ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 12 }}
              >
                <div
                  className="display-flex"
                  style={{ flexWrap: "wrap", gap: 6 }}
                >
                  {Object.entries(value)
                    .filter(([_, url]) => url)
                    .map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link-item font-14-regular color-dark-black"
                      >
                        {icons[key]}
                        <span>{key}</span>
                      </a>
                    ))}
                </div>
                <button
                  className="edit-details-btn"
                  onClick={() => handleEdit(key, value)}
                >
                  <EditIcon />
                </button>
              </div>
            ) : (
              <button
                className="add-details-btn"
                onClick={() => setSocialLinkModalVisible(true)}
              >
                + Add
              </button>
            )}
          </div>
        </div>
      );
    } else if (key === "Languages") {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="flex-1">
                  <SearchDropdown
                    options={languagesOptions}
                    optionKey="name"
                    placeholder="Language"
                    multiSelect={true}
                    onSelect={(values) => setSelectedMultiLanguages(values)}
                  />
                </div>
                <div className="display-flex" style={{ gap: 8 }}>
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify ">
                {!!value ? (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <div
                      className="display-flex"
                      style={{ flexWrap: "wrap", gap: 6 }}
                    >
                      {value?.map((item) => {
                        return (
                          <div className="selected-options-item font-14-regular color-dark-black">
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      className="edit-details-btn"
                      onClick={() => handleEdit(key, value)}
                    >
                      <EditIcon />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex-1 display-flex align-center"
                    style={{ gap: 12 }}
                  >
                    <DashIcon />
                    <button
                      className="add-details-btn"
                      onClick={() => handleEdit(key, "")}
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} className="detail-row">
          <p className="font-14-medium color-dark-black flex-1">{key}</p>
          <div className="flex-2">
            {editField === key ? (
              <div
                className="flex-1 display-flex align-center"
                style={{ gap: 8 }}
              >
                <div className="flex-1">
                  <CommonTextInput
                    type="text"
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                  />
                </div>

                <div className="display-flex" style={{ gap: 8 }}>
                  <button onClick={handleCancel}>
                    <CancleIcon />
                  </button>
                  <button onClick={() => handleSave(key)}>
                    <RightIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 display-flex-justify align-center">
                <div
                  className="flex-1 display-flex align-center"
                  style={{ gap: 12 }}
                >
                  {!!value ? (
                    <span className="font-14-regular color-dark-blak ">
                      {value}
                    </span>
                  ) : (
                    <DashIcon />
                  )}
                  <button
                    className="edit-details-btn"
                    onClick={() => handleEdit(key, value)}
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="candidate-details-main-container">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
          <button
            className={`${
              collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <ArrowIcon />
          </button>
        </div>
        {collapse && (
          <>
            <div className="divider-line" />
            <div className="details-container">
              {Object.entries(fields).map(([key, value]) =>
                renderValues(key, value)
              )}
            </div>
          </>
        )}
      </div>
      <AddSocialLinksModal
        visible={socialLinkModalVisible}
        onClose={() => setSocialLinkModalVisible(false)}
      />
      <AddSkillsModal
        visible={addSkillModalVisible}
        onClose={() => setAddSkillModalVisible(false)}
      />
    </>
  );
};

export default ProfessionalDetails;
