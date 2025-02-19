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

const fieldFormatList = [
  { id: 1, type: "Short Text", icon: <ShortTextIcon /> },
  { id: 2, type: "Detailed Text", icon: <DetailedTextIcon /> },
  { id: 3, type: "Numeric Input", icon: <NumericIcon /> },
  { id: 4, type: "Percentage Value", icon: <PercentageIcon /> },
  { id: 5, type: "Date Picker", icon: <CalendarIcon /> },
  { id: 6, type: "Yes/No Toggle", icon: <ToggleIcon /> },
  { id: 7, type: "Single-Select Dropdown", icon: <DropdownIcon /> },
];

const AddFieldDrawer = ({ visible, onClose }) => {
  const { modals, setModalVisibility } = useModal();
  const [fieldFormat, setFieldFormat] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [saveBtnDisable, setSaveBtnDisable] = useState(true);

  const resetData = () => {
    setName("");
    setFieldFormat("");
  };

  const onCloseDrawer = () => {
    resetData();
    onClose();
  };

  const handleBackdropClick = () => {
    setModalVisibility("animatedModal", true);
    setTimeout(() => {
      setModalVisibility("animatedModal", false);
    }, 600);
  };

  useEffect(() => {
    if (name?.length > 2 && !!fieldFormat?.type) {
      setSaveBtnDisable(false);
    } else {
      setSaveBtnDisable(true);
    }
  }, [name, fieldFormat]);
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
              onChange={(e) => setName(e.target.value)}
              placeholder={"Name"}
              error={nameError}
            />
            <CommonDropdown
              options={fieldFormatList}
              placeholder="Field Format"
              selectedValue={fieldFormat}
              onChange={setFieldFormat}
              optionKey="type"
              type={"fieldFormat"}
            />
            <CommonTextArea
              type={"text"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Description"}
            />
          </div>
          <div className="display-flex" style={{ gap: 8 }}>
            <CancelButton btnStyle={{ flex: 1 }} onClick={onCloseDrawer} />
            <CommonButton
              disabled={saveBtnDisable}
              isLoading={false}
              title={"Save"}
              btnStyle={{ flex: 1 }}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddFieldDrawer;
