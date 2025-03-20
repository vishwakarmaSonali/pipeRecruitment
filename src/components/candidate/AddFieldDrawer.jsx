import React, { useState, useEffect } from "react";
import "./index.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { Drawer } from "@mui/material";
import CommonDropdown from "../common/CommonDropdown";
import { useModal } from "../common/ModalProvider";
import CancelButton from "../common/CancelButton";
import CommonButton from "../common/CommonButton";
import { ReactComponent as ShortTextIcon } from "../../assets/icons/short-text.svg";
import { ReactComponent as DetailedTextIcon } from "../../assets/icons/detailed-text.svg";
import { ReactComponent as NumericIcon } from "../../assets/icons/numeric.svg";
import { ReactComponent as PercentageIcon } from "../../assets/icons/percentage.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/date-picker.svg";
import { ReactComponent as ToggleIcon } from "../../assets/icons/toggle.svg";
import { ReactComponent as DropdownIcon } from "../../assets/icons/dropdown.svg";
import CommonTextInput from "../common/CommonTextInput";
import CommonTextArea from "../common/CommonTextArea";
import CommonLoader from "../common/CommonLoader";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const fieldFormatList = [
  {
    id: 1,
    format: "Short Text",
    type: "text",
    fe_input_type: "text",
    icon: <ShortTextIcon />,
  },
  {
    id: 2,
    format: "Detailed Text",
    type: "text",
    fe_input_type: "quill",
    icon: <DetailedTextIcon />,
  },
  {
    id: 3,
    format: "Numeric Input",
    type: "text",
    fe_input_type: "number_input",
    icon: <NumericIcon />,
  },
  {
    id: 4,
    format: "Percentage Value",
    type: "text",
    fe_input_type: "percentage_input",
    icon: <PercentageIcon />,
  },
  {
    id: 5,
    format: "Date Picker",
    type: "date",
    fe_input_type: "date",
    icon: <CalendarIcon />,
  },
  {
    id: 6,
    format: "Yes/No Toggle",
    type: "bolean",
    fe_input_type: "toggle",
    icon: <ToggleIcon />,
  },
  {
    id: 7,
    format: "Dropdown",
    type: "select",
    fe_input_type: "select",
    icon: <DropdownIcon />,
  },
];

const singleDropdownOprions = [
  { id: 1, type: "Custom" },
  { id: 2, type: "Candidates" },
  { id: 3, type: "Jobs" },
  { id: 4, type: "Clients" },
  { id: 5, type: "Matches" },
  { id: 6, type: "Contact" },
  { id: 7, type: "Users" },
];

const AddFieldDrawer = ({
  visible,
  onClose,
  isLoading,
  onSave,
  selectedData,
}) => {
  const { modals, setModalVisibility } = useModal();
  const [fieldFormat, setFieldFormat] = useState("");
  const [name, setName] = useState(selectedData?.name || "");
  const [description, setDescription] = useState(
    selectedData?.description || ""
  );
  const [nameError, setNameError] = useState("");
  const [saveBtnDisable, setSaveBtnDisable] = useState(true);
  const [dropdownType, setDropdownType] = useState("single-select");
  const [singleDropdownSelect, setSingleDropdownSelect] = useState("");
  const [options, setOptions] = useState([
    { id: Date.now(), value: "Option 1" },
  ]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: Date.now(), value: `Option ${options.length + 1}` },
    ]);
  };

  const handleChange = (id, newValue) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };

  const handleBlur = (id) => {
    console.log(
      "Saved option:",
      options.find((option) => option.id === id)
    );
  };

  const handleRemove = (id) => {
    if (options.length > 1) {
      setOptions(options.filter((option) => option.id !== id));
    }
  };

  const resetData = () => {
    setName("");
    setFieldFormat("");
    setDescription("");
    setDropdownType("single-select");
    setOptions([{ id: Date.now(), value: "Option 1" }]);
    setSingleDropdownSelect("");
  };

  const onCloseDrawer = () => {
    resetData();
    onClose();
  };

  const handleRadioChange = (event) => {
    setDropdownType(event.target.value);
  };

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };

  useEffect(() => {
    if (name?.length > 2 && !!fieldFormat?.format) {
      setSaveBtnDisable(false);
    } else {
      setSaveBtnDisable(true);
    }
  }, [name, fieldFormat]);

  useEffect(() => {
    if (visible) {
      setDescription(selectedData?.description || "");
      setName(selectedData?.name || "");
    }
  }, [selectedData, visible]);
  return (
    <Drawer anchor="right" open={visible} onClose={onCloseDrawer}>
      <div
        role="presentation"
        className="category-add-fields-drawer scroll-width-none"
      >
        <div
          className={`add-field-drawer-container ${
            modals?.animatedModal && "shake-rotate"
          }`}
        >
          <div className="display-flex-justify align-center">
            <p className="font-24-medium color-dark-black">Add Field</p>
            <button onClick={onCloseDrawer}>
              <CloseIcon />
            </button>
          </div>
          <div className="add-field-drawer-container flex-1">
            <CommonTextInput
              type={"text"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (
                  e.target?.value?.length > 2 &&
                  e.target?.value?.length < 300
                ) {
                  setNameError("");
                } else {
                  setNameError("Name length must be 2-300 characters.");
                }
              }}
              placeholder={"Name"}
              error={nameError}
            />
            <CommonDropdown
              options={fieldFormatList}
              placeholder="Field Format"
              selectedValue={fieldFormat}
              onChange={setFieldFormat}
              optionKey="format"
              type={"fieldFormat"}
            />
            {fieldFormat?.fe_input_type === "select" && (
              <div className="display-column" style={{ gap: 10 }}>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={dropdownType}
                  onChange={handleRadioChange}
                  sx={{ display: "flex", gap: "10px", margin: "0px 20px" }}
                >
                  <FormControlLabel
                    value="single-select"
                    control={
                      <Radio
                        sx={{
                          color: "#151B23",
                          "&.Mui-checked": {
                            color: "#151B23",
                          },
                          transform: "scale(0.8)",
                          width: "18px",
                          height: "18px",
                        }}
                      />
                    }
                    label="Single Select"
                    sx={styles?.label}
                  />
                  <FormControlLabel
                    value="multi-select"
                    control={
                      <Radio
                        sx={{
                          transform: "scale(0.8)",
                          width: "18px",
                          height: "18px",
                          color: "#151B23",
                          "&.Mui-checked": {
                            color: "#151B23",
                          },
                        }}
                      />
                    }
                    label="Multi Select"
                    sx={styles?.label}
                  />
                </RadioGroup>
                {dropdownType === "single-select" && (
                  <>
                    <CommonDropdown
                      options={singleDropdownOprions}
                      placeholder="Type of Dropdown"
                      selectedValue={singleDropdownSelect}
                      onChange={setSingleDropdownSelect}
                      optionKey="type"
                      type={"fieldFormat"}
                    />
                    {singleDropdownSelect?.type === "Custom" && (
                      <div className="display-column" style={{ gap: 10 }}>
                        <p className="font-12-regular color-dark-black">
                          Custom Options
                        </p>
                        <div className="custom-options-container">
                          {options.map((option, index) => (
                            <div key={option.id} className="custom-option-div">
                              <span className="font-12-regular color-dark-black">
                                {index + 1}.
                              </span>
                              <input
                                type="text"
                                value={option.value}
                                onChange={(e) =>
                                  handleChange(option.id, e.target.value)
                                }
                                maxLength={300}
                                onBlur={() => handleBlur(option.id)}
                                className="option-input font-12-regular color-dark-black"
                              />
                              {options.length > 1 && (
                                <button onClick={() => handleRemove(option.id)}>
                                  <CloseIcon width={14} height={14} />
                                </button>
                              )}
                            </div>
                          ))}

                          <div
                            className="add-option-btn font-12-regular color-dark-black"
                            onClick={handleAddOption}
                          >
                            Add Option
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
            <CommonTextArea
              type={"text"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Description"}
            />
          </div>
          <div className="display-flex" style={{ gap: 8 }}>
            <CancelButton
              title={"Cancel"}
              btnStyle={{ flex: 1 }}
              onClick={() => {
                onCloseDrawer();
                resetData();
              }}
            />
            <CommonButton
              disabled={saveBtnDisable || isLoading}
              isLoading={isLoading}
              title={"Save"}
              btnStyle={{ flex: 1 }}
              onClick={() =>
                onSave({
                  name: name,
                  description: description,
                  type: fieldFormat,
                })
              }
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddFieldDrawer;

const styles = {
  label: {
    Padding: "10px 12px !important",
    flex: 1,
    "& .MuiTypography-root": {
      fontSize: "12px",
      lineHeight: "14px",
      fontFamily: "Ubuntu",
      fontWeight: 400,
      color: "#151B23",
      marginLeft: "10px",
    },
  },
};
