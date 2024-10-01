import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const { resumeId } = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  const [loading, setLoading] = useState(false);
  const AddNewSkill = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
    toast("Skills added successfully");
  };
  const removeSkill = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
    toast("Removed successfully.");
  };
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };
    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (resp) => {
        console.log(resp);
        toast("Detail updated");
        setLoading(false);
        toast("Detail updated successfully");
      },
      (error) => {
        setLoading(false);
        toast("Failed to update detail, try again!");
      }
    );
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your skills. </p>

      <div>
        {skillsList.map((skill, index) => (
          <div className="flex justify-between items-center" key={index}>
            <div>
              <label className="text-sm">Name</label>
              <Input
                defaultValue={skill.name}
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <div className="mt-4">
              <Rating
                style={{ maxWidth: 110 }}
                value={skill.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex px-4 mt-4 justify-between">
        <div className="flex gap-2 mr-1">
          <Button
            variant="outline"
            onClick={AddNewSkill}
            className="bg-gray-200 "
          >
            + Add More Skills
          </Button>
          <Button
            variant="outline"
            onClick={removeSkill}
            className="bg-gray-200 "
          >
            - Remove
          </Button>
        </div>

        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Skills;
