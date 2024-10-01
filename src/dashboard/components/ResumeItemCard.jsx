import { MenuIcon, Notebook } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Tilt } from "react-tilt";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import GlobalApi from "../../../service/GlobalApi";
import { toast } from "sonner";

const ResumeItemCard = ({ resume, refreshData }) => {
  const [alert, setAlert] = useState(false);

  const handleDelete = () => {
    GlobalApi.DeleteResumeById(resume.id).then((resp) => {
      console.log(resp);
      toast("Resume deleted successfully");
      setAlert(false);
      refreshData();
    });
  };
  return (
    <>
      <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
        <Tilt options={{ max: 55, scale: 0.95, speed: 450 }}>
          <div className="mt-10 ">
            <div className="border-t-4 border-black  flex items-center rounded-2xl justify-center p-14 bg-slate-200 h-[280px] ">
              <Notebook />
            </div>
          </div>
        </Tilt>
      </Link>
      <div className="flex justify-between px-2">
        <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
          <h2 className="px-4 text-center">{resume.attributes.title}</h2>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <MenuIcon className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link to={"/my-resume/" + resume.id + "/view"}>
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Download</DropdownMenuItem>
            </Link>

            <DropdownMenuItem onClick={() => setAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={alert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default ResumeItemCard;
