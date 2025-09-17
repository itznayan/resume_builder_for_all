import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};

const Experience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([{ ...formField }]);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
    toast("Experience added successfully.");
  };

  const removeExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList((prev) => prev.slice(0, -1));
      toast("Experience removed successfully.");
    }
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = [...experienceList];
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  // Load initial experience if available
  useEffect(() => {
    if (resumeInfo?.experience && Array.isArray(resumeInfo.experience)) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const onSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Experience saved successfully.");
    }, 500);
  };

  // Auto-save into context whenever list changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous experience </p>
        <div>
          {experienceList.map((item, index) => (
            <div className="p-4" key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg">
                <div>
                  <label className="text-sm font-semibold">
                    Position Title
                  </label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.title}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.companyName}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.city}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.state}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.startDate}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    className="mt-2"
                    value={item?.endDate}
                  />
                </div>

                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex px-4 mt-4 justify-between">
            <div className="flex gap-2 mr-1">
              <Button
                variant="outline"
                onClick={AddNewExperience}
                className="bg-gray-200 "
              >
                + Add More Experience
              </Button>
              <Button
                variant="outline"
                onClick={removeExperience}
                className="bg-gray-200 "
              >
                - Remove
              </Button>
            </div>

            <Button disabled={loading} onClick={onSave}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
