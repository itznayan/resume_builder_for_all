import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import dummy from "@/data/dummy";
import { motion } from "framer-motion";
import GlobalApi from "../../../../../service/GlobalApi";

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState(3);

  const { resumeId } = useParams();
  useEffect(() => {
    // console.log(params.resumeId);

    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((resp) => {
      // console.log(resp.data.data.attributes);
      setResumeInfo(resp.data.data.attributes);
    });
  };
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        {/* form section */}

        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
