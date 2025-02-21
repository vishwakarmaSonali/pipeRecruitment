import React, { useState } from "react";
import { Quill } from "react-quill";
import { ReactComponent as HeadingIcon } from "../../assets/icons/smallcaps.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import "./common.css";

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Modules object for setting up the Quill editor
export const modules = (props) => ({
  toolbar: {
    container: "#" + props,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

export const formats = [
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "list",
  "bullet",
  "link",
];

const CustomSizeDropdown = ({ quill }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("extra-small");

  const handleSizeChange = (size) => {
    if (quill) {
      quill.format("size", size);
    }
    setSelectedSize(size);
    setOpen(false);
  };
  return (
    <div className="custom-dropdown-size">
      <button className="custom-dropdown-toggle" onClick={() => setOpen(!open)}>
        <HeadingIcon stroke="#151B23" />
        <div
          className={`${open ? "arrow-icon-btn-collpase" : "arrow-icon-btn"}`}
        >
          <ArrowIcon />
        </div>
      </button>

      {open && (
        <div className="custom-dropdown-menu-size">
          {[
            { label: "Normal", value: "extra-small" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ].map((item) => (
            <button
              key={item.value}
              className={`custom-dropdown-menu-size-button ${
                selectedSize === item.value && "selected-item-common-bg"
              }`}
              onClick={() => handleSizeChange(item?.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const QuillToolbar = ({ toolbarId, quill }) => {
  return (
    <>
      {toolbarId !== undefined && (
        <div id={toolbarId}>
          <span className="ql-formats">
            <CustomSizeDropdown quill={quill} />
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <select className="ql-align"></select>
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />
            <button className="ql-link" />
            <button className="ql-undo">
              <CustomUndo />
            </button>
            <button className="ql-redo">
              <CustomRedo />
            </button>
          </span>
        </div>
      )}
    </>
  );
};
export default QuillToolbar;
