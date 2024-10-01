import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
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
  const params = useParams();
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
    toast("added successfully.");
  };
  const removeEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
    toast("Removed successfully.");
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationalList,
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Detail updated");
        console.log(resumeInfo);
      },
      (error) => {
        setLoading(false);
        toast("Failed to update detail,try again !");
      }
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  const handleChange = (index, event) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  };

  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

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
                  <label htmlFor="">University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(index, e)}
                    defaultValue={item?.universityName}
                  />
                </div>

                <div>
                  <label htmlFor="">Degree </label>
                  <Input
                    defaultValue={item?.degree}
                    name="degree"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="">Major</label>
                  <Input
                    defaultValue={item?.major}
                    name="major"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>

                <div>
                  <label htmlFor="">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    defaultValue={item?.startDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    defaultValue={item?.endDate}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="">Description</label>
                  <Textarea
                    name="description"
                    defaultValue={item?.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex my-4 justify-between gap-2 mr-1">
          <div className="flex gap-3 ">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className="bg-gray-200 "
            >
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={removeEducation}
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
    </div>
  );
};

export default Education;
