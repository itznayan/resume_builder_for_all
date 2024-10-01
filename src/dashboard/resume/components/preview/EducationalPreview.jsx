import React from "react";

const EducationalPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education?.map((edu, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {edu.universityName}
          </h2>
          <h2 className="text-xs flex justify-between">
            {edu?.degree} in {edu?.major}
            <span>
              {edu?.startDate} - {edu?.endDate}
            </span>
          </h2>
          <p className="text-xs my-2">{edu?.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EducationalPreview;
