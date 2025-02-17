import React from "react";
import { Quill } from "react-quill";

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

// Register font sizes
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Quill Editor Modules
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

// Quill Editor Formats
export const formats = [
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "link",
  "undo",
  "redo",
];

export const QuillToolbar = (props) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          <span className="ql-formats">
            {/* Text Formatting */}
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />

            {/* List Formatting */}
            <button className="ql-list" value="ordered" />
            <button className="ql-list" value="bullet" />

            {/* Text Alignment */}
            <button className="ql-align" value="justify" />
            <button className="ql-align" value="center" />
            <button className="ql-align" value="right" />

            {/* Insert Link */}
            <button className="ql-link" />

            {/* Undo & Redo */}
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
