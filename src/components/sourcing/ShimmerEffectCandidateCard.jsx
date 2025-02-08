import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ShimmerEffectCandidateCard = () => {
  return (
    <div className={`sourcing-candidate-card `}>
      <div className="display-column" style={{ gap: 12 }}>
        <div className="display-flex align-center" style={{ gap: 8 }}>
          <div className="candidate-card-profile-img">
            <Skeleton circle width={"100%"} height={"100%"} />
          </div>
          <div className="display-column" style={{ gap: 4 }}>
            <Skeleton width={100} height={16} />
            <Skeleton width={300} height={14} />
          </div>
        </div>
        <div className="candidate-card-divider-line"></div>
        <Skeleton width={"100%"} height={16} />
        <Skeleton width={"100%"} height={16} />
        <Skeleton width={"100%"} height={50} />
        <Skeleton width={"100%"} height={14} />
      </div>
    </div>
  );
};

export default ShimmerEffectCandidateCard;
