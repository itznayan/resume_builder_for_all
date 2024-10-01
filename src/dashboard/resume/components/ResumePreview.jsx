import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetail from "./preview/PersonalDetail";
import SummeryPreview from "./preview/SummeryPreview";
import ProExperiencePreview from "./preview/ProExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillPreview from "./preview/SkillPreview";
import { motion } from "framer-motion";
const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <motion.div
      initial={{ opacity: 0, x: -500, rotate: 90 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{
        duration: 0.65,
        type: "spring",
      }}
      className="shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* Personal Detail */}
      <PersonalDetail resumeInfo={resumeInfo} />
      {/* Summery */}
      <SummeryPreview resumeInfo={resumeInfo} />
      {/* Professional Experience */}
      <ProExperiencePreview resumeInfo={resumeInfo} />
      {/* Educational */}
      <EducationalPreview resumeInfo={resumeInfo} />

      {/* {Skills} */}
      <SkillPreview resumeInfo={resumeInfo} />
    </motion.div>
  );
};

export default ResumePreview;
