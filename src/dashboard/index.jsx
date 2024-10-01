import { useUser } from "@clerk/clerk-react";
import AddResume from "./components/AddResume";
import { motion } from "framer-motion";
import GlobalApi from "../../service/GlobalApi";
import { useEffect, useState } from "react";
import ResumeItemCard from "./components/ResumeItemCard";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        setResumeList(resp.data.data);
      }
    );
  };

  const Animate = {
    initial: {
      opacity: 0,
      x: -200,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <motion.h2
        variants={Animate}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
        className="font-semibold text-3xl font-bold"
      >
        My Resume
      </motion.h2>
      <motion.p
        variants={Animate}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6 }}
      >
        Start Creating your resume .
      </motion.p>
      <motion.div
        variants={Animate}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
      >
        <AddResume />

        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <motion.div
              variants={Animate}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 * index }}
              key={index}
            >
              <ResumeItemCard resume={resume} refreshData={GetResumesList} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
