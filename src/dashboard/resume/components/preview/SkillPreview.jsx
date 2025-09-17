import React from "react";

const SkillPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center text-sm font-bold mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="grid grid-cols-2 gap-3 my-4">
        {resumeInfo?.skills?.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between"
            style={{ pageBreakInside: "avoid" }} // prevent cutting in PDF
          >
            <h2 className="px-2 text-sm">{skill?.name}</h2>

            {/* Progress bar wrapper with % width for print safety */}
            <div
              style={{
                height: "8px",
                width: "100%", // responsive in grid
                maxWidth: "120px", // same as before but safer
                backgroundColor: "#e5e7eb", // gray-200 fallback
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${(skill?.rating || 0) * 20}%`,
                  backgroundColor: resumeInfo?.themeColor || "black",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillPreview;
