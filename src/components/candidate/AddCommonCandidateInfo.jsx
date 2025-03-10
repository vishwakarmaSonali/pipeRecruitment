import React, { useState } from "react";
import "./index.css";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrowDown.svg";
import { grown } from "../../helpers/assets";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddCommonCandidateInfo = ({ label, onAdd, data, isLoading }) => {
  const [collapse, setCollapse] = useState(true);

  if (isLoading) {
    return (
      <div className="candidate-details-main-container">
        <div className="display-flex-justify align-center">
          <div className="display-flex align-center" style={{ gap: 12 }}>
            <Skeleton width={200} height={20} />
          </div>
        </div>
        <div className="divider-line" />
        <div
          className="display-flex candidate-experince-item"
          style={{ gap: 8 }}
        >
          <Skeleton containerClassName="flex-1" height={16} count={2} />
        </div>
      </div>
    );
  }
  return (
    <div className="candidate-details-main-container">
      <div className="display-flex-justify align-center">
        <div className="display-flex align-center" style={{ gap: 12 }}>
          <h3 className="font-16-medium color-dark-black text-uppercase">
            {label}
          </h3>
          <button
            className={`${
              collapse ? "arrow-icon-btn-collpase" : "arrow-icon-btn"
            }`}
            onClick={() => setCollapse(!collapse)}
          >
            <ArrowIcon />
          </button>
        </div>
        {data?.length > 0 && (
          <button className="add-details-btn" onClick={onAdd}>
            + Add
          </button>
        )}
      </div>
      {collapse && (
        <>
          <div className="divider-line" />
          <div className="details-container">
            {data?.length > 0 ? (
              data?.map((item) => {
                return (
                  <div
                    className="display-flex-justify align-center"
                    style={{ padding: "6px 0", gap: 6 }}
                  >
                    <p className="font-14-medium color-dark-black">
                      {item?.name}
                    </p>
                    <div className="w-h-26">
                      <img src={grown} className="common-img" />
                    </div>
                  </div>
                );
              })
            ) : (
              <button className="add-details-btn" onClick={onAdd}>
                + Add
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddCommonCandidateInfo;
