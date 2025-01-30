import React, { useRef, useEffect } from "react";
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

// Add custom icons to Quill
const icons = Quill.import("ui/icons");
icons.header = ReactDOMServer.renderToStaticMarkup(
  <HeadingIcon stroke="#151B23" />
);
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
      const editor = quillRef.current.getEditor();
      console.log("🔹 Quill Editor Loaded:", editor);
      console.log("🔹 History Module:", editor.history);

      // Check if history is initialized
      if (!editor.history) {
        console.warn(
          "🚨 Quill History Module Not Found! Undo/Redo won't work."
        );
      }
    }
  }, []);

  const handleUndo = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor.history) {
        console.log("🟢 Undo Triggered");
        editor.history.undo();
      } else {
        console.warn("🚨 Undo Failed: Quill History Module Not Found!");
      }
    }
  };

  const handleRedo = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor.history) {
        console.log("🟢 Redo Triggered");
        editor.history.redo();
      } else {
        console.warn("🚨 Redo Failed: Quill History Module Not Found!");
      }
    }
  };

  const handleChange = (content, delta, source, editor) => {
    if (editor.history) {
      editor.history.record();
    }

    onChange(content);
  };
  return (
    <ReactQuill
      className="main-container-html-view"
      value={value}
      modules={{
        toolbar: {
          container: [
            { header: [1, 2, 3, 4, 5, 6, false] },
            "bold",
            "italic",
            "underline",
            { list: "ordered" },
            { list: "bullet" },
            "link",
            "undo",
            "redo",
          ],
          handlers: {
            undo: handleUndo,
            redo: handleRedo,
          },
        },
        history: {
          delay: 200,
          maxStack: 100,
          userOnly: true,
        },
      }}
    />
  );
};

export default HtmlViewComponent;
