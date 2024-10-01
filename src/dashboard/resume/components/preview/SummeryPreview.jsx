import React from "react";

const SummeryPreview = ({ resumeInfo }) => {
  return (
    <div>
      <p className="text-sm">{resumeInfo?.summery}</p>
    </div>
  );
};

export default SummeryPreview;
