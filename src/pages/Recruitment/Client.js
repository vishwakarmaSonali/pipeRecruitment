import React from "react";

const Client = ({ isDrawerOpen }) => {
  const NoFiltersScreen = () => {
    return (
      <div className="flex flex-col overflow-hidden bg-white items-center justify-center min-h-screen text-center">
        <div className="max-w-[680px] text-center">
          <h2 className="font-ubuntu text-3xl text-customBlue text-center font-medium">
            Expand Your Talent Search with Our Sourcing Hub
          </h2>
          <ul className="flex justify-between items-center gap-6 p-0 mt-6">
            <li>
              <div className="flex flex-col mt-2 space-y-1">
                <span className="font-ubuntu font-medium text-m text-customBlue">
                  Find Hidden Talent
                </span>
                <span className="font-ubuntu font-normal text-m text-customGray">
                  Discover qualified professionals who may not be actively job hunting
                </span>
              </div>
            </li>
            <li>
              <div className="flex flex-col mt-2 space-y-1">
                <span className="font-ubuntu font-medium text-m text-customBlue">
                  Refine Your Search
                </span>
                <span className="font-ubuntu font-normal text-m text-customGray">
                  Use advanced filters to find the perfect candidates.
                </span>
              </div>
            </li>
            <li>
              <div className="flex flex-col mt-2 space-y-1">
                <span className="font-ubuntu font-medium text-m text-customBlue">
                  Create Robust Talent Pipelines
                </span>
                <span className="font-ubuntu font-normal text-m text-customGray">
                  Track and organize candidates to maintain a steady flow of top talent.
                </span>
              </div>
            </li>
          </ul>
          <button className="text-white text-ubuntu text-m bg-buttonBLue px-[14px] py-[10px] rounded-[8px] mt-[60px] space-x-1 shadow-md hover:bg-opacity-80">
            {" Start Searching +"}
          </button>
          <div className="flex place-items-center max-h-sm mt-[90px]">
            <span className="font-ubuntu text-xs text-customBlue">
              Our platform uses trusted third-party data to offer a separate external
              candidate database, keeping your internal data secure and private.{" "}
              <span className="buttonBLue cursor-pointer">Learn more about data usage.</span>
            </span>
          </div>
        </div>
      </div>
    );
  };
console.log("isDraawerOPennn>>>",isDrawerOpen);

  return (
    <div
      className={`w-full overflow-auto transition-all duration-300 pt-[68px] ${
        isDrawerOpen ? "ml-56" : "ml-16"
      }`}
    >
      <NoFiltersScreen />
    </div>
  );
};

export default Client;
