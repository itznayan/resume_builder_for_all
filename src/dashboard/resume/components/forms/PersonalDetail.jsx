import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "../../../../components/ui/button";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const PersonalDetail = ({ isNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params.resumeId);
  }, []);
  console.log();
  const handleInputChange = (e) => {
    isNext(false);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        // console.log(resp);
        isNext(true);
        setLoading(false);
        toast("Personal detail added successfully.");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Get Started with Basic</p>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 gap-3">
          <div className="pt-4 px-4 ">
            <label className="font-medium" htmlFor="">
              First Name
            </label>
            <Input
              className="mt-1"
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-4 px-4">
            <label className="font-medium" htmlFor="">
              Last Name
            </label>
            <Input
              defaultValue={resumeInfo?.lastName}
              className="mt-1"
              name="lastName"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="py-1 px-4  col-span-2">
            <label className="font-medium" htmlFor="">
              Job Title
            </label>
            <Input
              defaultValue={resumeInfo?.jobTitle}
              className="mt-1"
              name="jobTitle"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="py-1 px-4  col-span-2">
            <label className="font-medium" htmlFor="">
              Address
            </label>
            <Input
              defaultValue={resumeInfo?.address}
              className="mt-1"
              name="address"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="py-1 px-4  ">
            <label className="font-medium" htmlFor="">
              Phone
            </label>
            <Input
              defaultValue={resumeInfo?.phone}
              className="mt-1"
              name="phone"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="py-1 px-4  ">
            <label className="font-medium" htmlFor="">
              Email
            </label>
            <Input
              defaultValue={resumeInfo?.email}
              className="mt-1"
              name="email"
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-3 flex justify-end px-4">
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
