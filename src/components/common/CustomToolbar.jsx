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
import "./common.css";

const CustomToolbar = () => (
  <div id="custom-toolbar">
    <span className="ql-formats">
      <select className="ql-header">
        <option value="1">H1</option>
        <option value="2">H2</option>
        <option value="3">H3</option>
        <option value="4">H4</option>
        <option value="5">H5</option>
        <option value="6">H6</option>
        <option selected>Normal</option>
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold">
        <BoldIcon />
      </button>
      <button className="ql-italic">
        <ItalicIcon />
      </button>
      <button className="ql-underline">
        <UnderlineIcon />
      </button>
      <button className="ql-list" value="ordered">
        <OrderListIcon />
      </button>
      <button className="ql-list" value="bullet">
        <UnorderListIcon />
      </button>
      <button className="ql-link">
        <LinkIcon />
      </button>
      <button className="ql-list" id="undo">
        <UndoIcon />
      </button>
      <button className="ql-list" id="redo">
        <RedoIcon />
      </button>
    </span>
  </div>
);

export default CustomToolbar;
