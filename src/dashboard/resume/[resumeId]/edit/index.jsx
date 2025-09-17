import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoProvider } from "@/context/ResumeInfoContext";
import { motion } from "framer-motion";

const EditResume = () => {
  const { resumeId } = useParams();

  return (
    <ResumeInfoProvider resumeId={resumeId}>
      <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2">
        {/* form section */}
        <FormSection />

        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoProvider>
  );
};

export default EditResume;
