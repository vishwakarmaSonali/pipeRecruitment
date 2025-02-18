import React, { useRef, useEffect,useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ReactComponent as BoldIcon } from "../../assets/icons/text-bold.svg";
import { ReactComponent as ItalicIcon } from "../../assets/icons/text-italic.svg";
import { ReactComponent as UnderlineIcon } from "../../assets/icons/text-underline.svg";
import { ReactComponent as UnorderListIcon } from "../../assets/icons/unorder-list.svg";
import { ReactComponent as OrderListIcon } from "../../assets/icons/order-list.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/hyper-link.svg";
import { ReactComponent as UndoIcon } from "../../assets/icons/undo.svg";
import { ReactComponent as RedoIcon } from "../../assets/icons/redo.svg";
import { ReactComponent as HeadingIcon } from "../../assets/icons/heading.svg";
import ReactDOMServer from "react-dom/server";
import "./common.css";
import QuillToolbar, { modules, formats } from "./EditorToolbar";

// Add custom icons to Quill
const icons = Quill.import("ui/icons");

icons.bold = ReactDOMServer.renderToStaticMarkup(<BoldIcon stroke="#151B23" />);
icons.italic = ReactDOMServer.renderToStaticMarkup(
  <ItalicIcon stroke="#151B23" />
);
icons.underline = ReactDOMServer.renderToStaticMarkup(
  <UnderlineIcon stroke="#151B23" />
);
icons.link = ReactDOMServer.renderToStaticMarkup(<LinkIcon stroke="#151B23" />);
icons.undo = ReactDOMServer.renderToStaticMarkup(<UndoIcon stroke="#151B23" />);
icons.redo = ReactDOMServer.renderToStaticMarkup(<RedoIcon stroke="#151B23" />);
icons["list"]["ordered"] = ReactDOMServer.renderToStaticMarkup(
  <OrderListIcon stroke="#151B23" />
);
icons["list"]["bullet"] = ReactDOMServer.renderToStaticMarkup(
  <UnorderListIcon stroke="#151B23" />
);
const HtmlViewComponent = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      console.log("Quill Editor instance assigned:", quillRef.current);
    }
  }, []);

  return (
    <div className="editor-main-div">
      <QuillToolbar toolbarId="t1" quillRef={quillRef} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder="Add Description"
        modules={modules("t1")}
        formats={formats}
      />
    </div>
  );
};

export default HtmlViewComponent;
