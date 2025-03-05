import React, { useState,useEffect} from "react";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { ReactComponent as FolderIcon } from "../../assets/icons/sourcingIcons/folder-add.svg";
import { ReactComponent as Folder } from "../../assets/icons/folderIcon.svg";
import { Drawer } from "@mui/material";
import CommonSearchBox from "../common/CommonSearchBox";
import CommonButton from "../common/CommonButton";
import { ReactComponent as TickCircle } from "../../assets/icons/tick-circle.svg";
import { ReactComponent as LabelIcon } from "../../assets/icons/labelIcon.svg";
import { useNavigate } from "react-router-dom";
import { fetchLabels } from "../../actions/dropdownAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AddLabelDrawer = ({ isOpen, onClose, onApply, onReset }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState("");
  const [labelData, setLabelData] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  
  const { data, loading, error } = useSelector((state) => state.labels);
  // Ensure `data` is available and formatted properly
  const labelOptions =
  data?.map((item) => ({
    id: item.id,
    name: item.name, // Adjust the key based on API response
    color:item.color
  })) || [];
  const [folderData, setFolderData] = useState(labelOptions);
  // ✅ Generate Unique "New Folder" Name
  const generateUniqueFolderName = () => {
    let baseName = "New Folder";
    let count = 1;

    // Check if "New Folder" exists, and append a number if needed
    let newName = baseName;
    while (folderData.some((folder) => folder.name === newName)) {
      newName = `${baseName} ${count}`;
      count++;
    }
    return newName;
  };

  // ✅ Create a New Folder
  const handleCreateFolder = () => {
    const newFolderName = generateUniqueFolderName();

    const newFolder = {
      id: Date.now(),
      name: newFolderName,
      isEditable: true, // ✅ Only newly created folders are editable
    };

    setFolderData((prev) => [...prev, newFolder]);
  };

  // ✅ Allow Editing for NEW FOLDERS Only
  const handleEditFolder = (id, value) => {
    setFolderData((prev) =>
      prev.map((folder) =>
        folder.id === id && folder.isEditable
          ? { ...folder, name: value }
          : folder
      )
    );
  };

  // ✅ Stop Editing (Once edited, it becomes non-editable)
  const handleBlur = (id) => {
    setFolderData((prev) =>
      prev.map((folder) =>
        folder.id === id && folder.isEditable
          ? { ...folder, isEditable: false }
          : folder
      )
    );
  };

  useEffect(() => {
    console.log("called");

    dispatch(fetchLabels());
  }, [dispatch]);
  useEffect(() => {
    if (data && data.length > 0) {
      const formattedData = data.map((item) => ({
        _id: item._id,
        name: item.name,
        color: item.color,
        selected: false, // Ensures labels start unselected
      }));
  
      setLabelData(formattedData);
    }
  }, [data]);
  const handleSelectLabel = (id) => {
    setLabelData((prevLabelData) =>
      prevLabelData.map((item) =>
        item._id === id ? { ...item, selected: !item.selected } : item
      )
    );
  
    setSelectedLabels((prevSelectedLabels) => {
      const isSelected = prevSelectedLabels.some((item) => item._id === id);
  
      if (isSelected) {
        return prevSelectedLabels.filter((item) => item._id !== id); // Remove if already selected
      } else {
        const selectedItem = labelData.find((item) => item._id === id);
        return selectedItem ? [...prevSelectedLabels, selectedItem] : prevSelectedLabels;
      }
    });
  };
  
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div
        role="presentation"
        className="candidate-details-drawer w-[460px] flex flex-col h-full"
      >
        {/* Header */}
        <div className="py-[20px]  flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">Add Label</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Search & Create Folder */}
        <div className="">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <CommonSearchBox
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Folder List (Scrollable) */}
        <div className="flex-1 overflow-auto  mt-4">
          {labelData?.length > 0 && (
            <div className="display-column space-y-2 ">
              {labelData?.map((item) => (
                 <div
                 key={item._id}
                 className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition ${
                   selectedLabels.some((label) => label._id === item._id) ? "bg-blueBg" : ""
                 }`}
                  onClick={() => handleSelectLabel(item._id)}
                >
                  <div className="items-center flex">
                    <LabelIcon className="mr-2" fill={item.color} />
                      <span className="font-14-regular color-dark-black">
                        {item.name}
                      </span>
                  
                  </div>
                  {/* Tick Icon (when selected) */}
                  {selectedLabels.some((label) => label._id === item._id) && (

                    <div className="flex items-end">
                      <TickCircle />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Fixed Bottom Buttons */}
        <div className=" py-4 bg-white bottom-0">
          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2  text-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              onClick={onReset}
              style = {{border:"1px solid #1761D8"}}
            >
              Cancel
            </button>
            <button
              className="w-1/2 text-white bg-buttonBLue flex justify-center items-center py-[12px] rounded-[8px] btn-text h-[40px]"
              onClick={onReset}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddLabelDrawer;
