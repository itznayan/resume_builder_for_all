import { Textarea } from "@/components/ui/textarea";
import { Button } from "../../../../components/ui/button";
import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AIChatSession } from "../../../../../service/AIModal";

const Summery = ({ isNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // console.log(resumeInfo);
  const [aiGenSummery, setAiGenSummery] = useState();
  const prompt =
    "Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Fresher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

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
    // console.log("preventDefault active")
    setLoading(true);
    const data = {
      data: {
        summery: summery,
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        // console.log(resp);
        isNext(true);
        setLoading(false);
        toast("Summery added successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
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
              onClick={() => GenerateSummeryFromAI()}
              type="button"
              variant="outline"
              size="sm"
              className="border-black hover:bg-black hover:text-white duration-300 bg-gray-100 gap-2"
            >
              <Brain className="size-5" /> Generate form AI
            </Button>
          </div>
          <Textarea
            required
            onChange={(e) => setSummery(e.target.value)}
            className="mt-6"
            defaultValue={summery ? summery : resumeInfo?.summery}
          />

          <div className="mt-4 flex  justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
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

export default Summery;
