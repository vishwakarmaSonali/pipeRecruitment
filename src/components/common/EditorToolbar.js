import React, { useState, useEffect, useRef } from "react";
import { Quill } from "react-quill";
import { ReactComponent as TextSizeIcon } from "../../assets/icons/text-size-icon.svg";
import { ReactComponent as UndoIcon } from "../../assets/icons/undo.svg";
import { ReactComponent as RedoIcon } from "../../assets/icons/redo.svg";
import { ReactComponent as AlignIcon } from "../../assets/icons/align-icon.svg"; // Add your align icon
import { ReactComponent as DropArrow } from "../../assets/icons/dropdown.svg"; // Add dropdown arrow icon

// ✅ Register font sizes properly
const Size = Quill.import("formats/size");
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register(Size, true);

// ✅ Undo / Redo Handlers
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// ✅ Define & Export Quill Modules
export const modules = (toolbarId) => ({
  toolbar: {
    container: `#${toolbarId}`,
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

// ✅ Define & Export Quill Formats
export const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "link",
  "size",
  "indent",
  "undo",
  "redo",
];

export const QuillToolbar = ({ toolbarId, quillRef }) => {
  const [selectedSize, setSelectedSize] = useState("normal");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const sizeOptions = [
    { value: "small", label: "Small" },
    { value: "normal", label: "Normal" },
    { value: "large", label: "Large" },
    { value: "huge", label: "Huge" },
  ];

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Apply text size change using Quill API
  const handleSizeChange = (size) => {
    setSelectedSize(size);

    if (quillRef?.current) {
      const editor = quillRef.current.getEditor(); // ✅ Get Quill editor instance
      if (editor) {
        editor.format("size", size);
      }
    }

    setShowDropdown(false);
  };

  return (
    <>
      {toolbarId && (
        <div id={toolbarId} className="quill-toolbar">
          <span className="ql-formats">
            {/* 🔹 Text Size Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-size-button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <TextSizeIcon />
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  {sizeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`dropdown-item ${
                        selectedSize === option.value ? "active" : ""
                      }`}
                      onClick={() => handleSizeChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 🔹 Text Formatting */}
            <button className="ql-bold">B</button>
            <button className="ql-italic">I</button>
            <button className="ql-underline">U</button>

            {/* 🔹 List Formatting */}
            <button className="ql-list" value="ordered">1.</button>
            <button className="ql-list" value="bullet">•</button>

            {/* 🔹 Text Alignment Dropdown (With Arrow) */}
            <div className="flex items-center">
              
              <select className="ql-align">
                <option value="">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
              <DropArrow />
            </div>

            {/* 🔹 Insert Link */}
            <button className="ql-link">🔗</button>

            {/* 🔹 Undo & Redo */}
            <button className="ql-undo">
              <UndoIcon />
            </button>
            <button className="ql-redo">
              <RedoIcon />
            </button>
          </span>
        </div>
      )}
    </>
  );
};

export default QuillToolbar;
