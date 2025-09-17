import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, name, value) => {
    setSkillsList((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  const AddNewSkill = () => {
    setSkillsList((prev) => [
      ...prev,
      {
        name: "",
        rating: 0,
      },
    ]);
    toast("Skill added successfully");
  };

  const removeSkill = () => {
    if (skillsList.length > 1) {
      setSkillsList((prev) => prev.slice(0, -1));
      toast("Removed successfully.");
    }
  };

  const onSave = () => {
    setLoading(true);

    // Data is already synced with context
    setTimeout(() => {
      setLoading(false);
      toast("Details updated successfully");
    }, 500);
  };

  // ✅ Sync local -> context
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  // ✅ Sync context -> local (with fallback to [])
  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
      setSkillsList(resumeInfo.skills);
    }
  }, [resumeInfo]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your skills. </p>

      <div className="flex flex-col gap-4">
        {skillsList.map((skill, index) => (
          <div
            className="flex justify-between items-center gap-4 border p-3 rounded-lg"
            key={index}
          >
            <div className="flex-1">
              <label className="text-sm">Name</label>
              <Input
                value={skill.name}
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <div className="mt-6">
              <Rating
                style={{ maxWidth: 120 }}
                value={skill.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex px-4 mt-6 justify-between">
        <div className="flex gap-2 mr-1">
          <Button
            variant="outline"
            onClick={AddNewSkill}
            className="bg-gray-200"
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={removeSkill}
            className="bg-gray-200"
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
