import React from "react";

const HeaderWithActions = ({
  title = "Header Title", // Default title
  primaryButtonText = "Create",
  secondaryButtonText = "Discard",
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonDisabled = false,
  secondaryButtonDisabled = false,
}) => {
  return (
    <div className="flex flex-1 items-center justify-between p-[17px]  border-gray-200">
      {/* Title */}
      <span className="font-ubuntu font-medium text-custom-large">
        {title}
      </span>

      {/* Action Buttons */}
      <div className="flex items-center gap-[8px]">
        {/* Secondary Button */}
        <button
          className="buttons border-1 border-buttonBLue text-buttonBLue min-w-[120px]"
          onClick={onSecondaryClick}
          disabled={secondaryButtonDisabled}
        >
          {secondaryButtonText}
        </button>

        {/* Primary Button */}
        <button
          className="buttons text-white bg-buttonBLue min-w-[120px]"
          onClick={onPrimaryClick}
          disabled={primaryButtonDisabled}
        >
          {primaryButtonText}
        </button>
      </div>
    </div>
  );
};

export default HeaderWithActions;
