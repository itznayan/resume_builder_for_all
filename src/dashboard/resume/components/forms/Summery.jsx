import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";
import PropTypes from "prop-types";

const Summery = ({ isNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const [aiGenSummery, setAiGenSummery] = useState([]); // ✅ default empty array
  const jobTitle = resumeInfo.jobTitle;
  console.log(jobTitle);
  const prompt =
    'Job Title: {jobTitle}, give me a JSON array of 3 summaries (Fresher, Mid Level, Experienced). Each object should have fields: experience_level and summary. Example: [{"experience_level":"Fresher","summary":"..."}]';

  useEffect(() => {
    if (summery) {
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
    }
  }, [summery, resumeInfo, setResumeInfo]);
  console.log(aiGenSummery);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    // console.log(PROMPT);
    const result = await AIChatSession.sendMessage(PROMPT);
    // console.log(JSON.parse(result.response.text()));
    setAiGenSummery(JSON.parse(result.response.text()));
    setLoading(false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    // Data is already saved via context auto-save
    setTimeout(() => {
      isNext(true);
      setLoading(false);
      toast("Summery added successfully.");
    }, 500);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your resume. </p>

        <form onSubmit={handleSave} className="mt-6">
          <div className="flex  items-end justify-between">
            <label htmlFor="">Add Summery</label>
            <Button
              onClick={GenerateSummeryFromAI}
              type="button"
              variant="outline"
              size="sm"
              className="border-black hover:bg-black hover:text-white duration-300 bg-gray-100 gap-2"
            >
              <Brain className="size-5" /> Generate from AI
            </Button>
          </div>
          <Textarea
            required
            onChange={(e) => setSummery(e.target.value)}
            className="mt-6"
            defaultValue={summery ? summery : resumeInfo?.summery}
          />

          <div className="mt-4 flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* ✅ Safe rendering only if array */}
      {aiGenSummery && (
        <div className=" p-2">
          <h2 className="font-semibold text-lg">Suggestions</h2>
          {aiGenSummery.map((item, index) => (
            <div key={index} className="p-2">
              <h2 className="font-semibold mb-2">
                Level: {item.experience_level}
              </h2>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Summery.propTypes = {
  isNext: PropTypes.func.isRequired,
};

export default Summery;
