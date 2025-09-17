// Frontend-only API service using LocalStorage
import localStorageService from "@/service/LocalStorageService";

const CreateNewResume = (data) => localStorageService.createResume(data);
const GetUserResumes = (userEmail) => {
  // Return all resumes since we're not using user authentication
  const resumes = localStorageService.getAllResumes();
  return Promise.resolve({ data: { data: resumes } });
};
const UpdateResumeDetail = (id, data) =>
  localStorageService.updateResume(id, data);
const GetResumeById = (id) => localStorageService.getResumeById(id);
const DeleteResumeById = (id) => localStorageService.deleteResume(id);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};
