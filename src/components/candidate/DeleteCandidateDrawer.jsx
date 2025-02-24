import React, { useState } from "react";
import "../../components/filterModal/FilterModal.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/drawerClose.svg";
import { Drawer } from "@mui/material";
import DeleteButton from "../common/DeleteButton";
import { notifySuccess } from "../../helpers/utils";

const DeleteCandidateDrawer = ({ isOpen, onClose, deleteMessage, onConfirmDelete }) => {
    const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const isDeleteEnabled = deleteConfirmation === "DELETE";

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div role="presentation" className="candidate-details-drawer w-[460px] flex flex-col h-full">
        {/* Header */}
        <div className="py-[20px] flex justify-between items-center">
          <h2 className="font-24-medium color-dark-black">Confirm Permanent Deletion</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {/* Warning Message */}
        <div className="flex-1 overflow-auto flex-col mt-4">
          <div className="flex flex-col gap-[16px]">
            <span className="font-ubuntu text-m text-red">
              Warning: This action is permanent and cannot be undone.
            </span>
            <span className="font-ubuntu text-m text-customBlue">
              {`${deleteMessage}, along with all associated jobs and application history, will be permanently removed.`}
            </span>
            <span className="font-ubuntu text-m text-customBlue">
              Once deleted, these candidates cannot be restored.
            </span>
          </div>
        </div>

        {/* Confirmation Input */}
        <div className="mt-4">
          <label className="font-ubuntu text-sm">Type "DELETE" to confirm</label>
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
            placeholder="DELETE"
          />
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="py-4 bg-white bottom-0">
          <div className="flex justify-between space-x-4">
            <button
              className="w-1/2 border-1 border-buttonBLue text-buttonBLue flex justify-center items-center py-[10px] rounded-[8px] btn-text max-h-[36px]"
            //   onClick={onReset}
            >
              Cancel
            </button>
            <div className="flex-1">
              <DeleteButton btnStyle={{ width: "207px" }} disabled={!isDeleteEnabled}  onClick={onConfirmDelete} />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default DeleteCandidateDrawer;
// onClick={onConfirmDelete}