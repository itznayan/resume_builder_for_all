import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Education = () => {
  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    toast("Added successfully.");
  };

  const removeEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList((prev) => prev.slice(0, -1));
      toast("Removed successfully.");
    }
  };

  const onSave = () => {
    setLoading(true);

    // Data is already synced to context
    setTimeout(() => {
      setLoading(false);
      toast("Detail updated");
    }, 500);
  };

  // ✅ Sync local state -> context
  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationalList,
    }));
  }, [educationalList, setResumeInfo]);

  // ✅ Sync context -> local state (with fallback to array)
  useEffect(() => {
    if (resumeInfo?.education && Array.isArray(resumeInfo.education)) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setEducationalList((prev) => {
      const updated = [...prev];
      updated[index][name] = value;
      return updated;
    });
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education Detail</h2>
        <p>Add your education detail. </p>

        <div>
          {educationalList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 rounded-lg">
                <div className="col-span-2">
                  <label>University Name</label>
                  <Input
                    name="universityName"
                    value={item.universityName}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label>Degree</label>
                  <Input
                    name="degree"
                    value={item.degree}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label>Major</label>
                  <Input
                    name="major"
                    value={item.major}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label>Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    value={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label>End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    value={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div className="col-span-2">
                  <label>Description</label>
                  <Textarea
                    name="description"
                    value={item.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex my-4 justify-between gap-2 mr-1">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className="bg-gray-200"
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={removeEducation}
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
    </div>
  );
};

export default Education;
