import React from "react";

const ProExperiencePreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold mb-2 "
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience?.map((experiences, index) => (
        <div key={index} className="my-10">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experiences?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experiences?.companyName}, {experiences?.city},{experiences?.state}
            <span>
              {experiences?.startDate}
              {" To "}
              {experiences?.currentlyWorking ? "Present" : experiences.endDate}
            </span>
          </h2>

          {/* <p className="text-xs my-2">{experiences.workSummery}</p> */}

          <div
            className="text-xs font-medium"
            dangerouslySetInnerHTML={{ __html: experiences?.workSummery }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProExperiencePreview;
