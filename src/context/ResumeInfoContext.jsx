import { createContext, useState, useEffect } from "react";
import localStorageService from "../service/LocalStorageService";

export const ResumeInfoContext = createContext(null);

export const ResumeInfoProvider = ({ children, resumeId }) => {
  const [resumeInfo, setResumeInfo] = useState({});

  useEffect(() => {
    if (resumeId) {
      // Load resume data from local storage
      localStorageService.getResumeById(resumeId).then(
        (resp) => {
          setResumeInfo(resp.data.data.attributes);
        },
        (error) => {
          console.error("Error loading resume:", error);
          // Initialize with empty data if resume not found
          setResumeInfo({
            firstName: "",
            lastName: "",
            jobTitle: "",
            address: "",
            phone: "",
            email: "",
            summery: "",
            experience: [],
            education: [],
            skills: [],
          });
        }
      );
    }
  }, [resumeId]);

  // Auto-save to local storage when resumeInfo changes
  useEffect(() => {
    if (resumeId && resumeInfo && Object.keys(resumeInfo).length > 0) {
      const updateData = {
        data: resumeInfo,
      };
      localStorageService
        .updateResume(resumeId, updateData)
        .catch((error) => console.error("Error auto-saving resume:", error));
    }
  }, [resumeInfo, resumeId]);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      {children}
    </ResumeInfoContext.Provider>
  );
};
