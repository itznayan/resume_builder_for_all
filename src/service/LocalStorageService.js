// Local Storage Service for Resume Builder
// This replaces the backend API calls with local storage

const STORAGE_KEYS = {
  RESUMES: "resume_builder_resumes",
  CURRENT_RESUME: "resume_builder_current_resume",
};

class LocalStorageService {
  // Generate a unique ID for resumes
  generateId() {
    return (
      "resume_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  }

  // Get all resumes from local storage
  getAllResumes() {
    try {
      const resumes = localStorage.getItem(STORAGE_KEYS.RESUMES);
      return resumes ? JSON.parse(resumes) : [];
    } catch (error) {
      console.error("Error getting resumes from localStorage:", error);
      return [];
    }
  }

  // Save all resumes to local storage
  saveAllResumes(resumes) {
    try {
      localStorage.setItem(STORAGE_KEYS.RESUMES, JSON.stringify(resumes));
      return true;
    } catch (error) {
      console.error("Error saving resumes to localStorage:", error);
      return false;
    }
  }

  // Create a new resume
  createResume(resumeData) {
    const resumes = this.getAllResumes();
    const newResume = {
      id: this.generateId(),
      resumeId: this.generateId(),
      title: resumeData.title || "Untitled Resume",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...resumeData,
    };

    resumes.push(newResume);
    this.saveAllResumes(resumes);
    return Promise.resolve({ data: { data: newResume } });
  }

  // Get a specific resume by ID
  getResumeById(id) {
    const resumes = this.getAllResumes();
    const resume = resumes.find((r) => r.id === id || r.resumeId === id);

    if (resume) {
      return Promise.resolve({ data: { data: { attributes: resume } } });
    } else {
      return Promise.reject(new Error("Resume not found"));
    }
  }

  // Update a resume
  updateResume(id, updateData) {
    const resumes = this.getAllResumes();
    const resumeIndex = resumes.findIndex(
      (r) => r.id === id || r.resumeId === id
    );

    if (resumeIndex !== -1) {
      resumes[resumeIndex] = {
        ...resumes[resumeIndex],
        ...updateData.data,
        updatedAt: new Date().toISOString(),
      };
      this.saveAllResumes(resumes);
      return Promise.resolve({ data: { data: resumes[resumeIndex] } });
    } else {
      return Promise.reject(new Error("Resume not found"));
    }
  }

  // Delete a resume
  deleteResume(id) {
    const resumes = this.getAllResumes();
    const filteredResumes = resumes.filter(
      (r) => r.id !== id && r.resumeId !== id
    );

    if (filteredResumes.length !== resumes.length) {
      this.saveAllResumes(filteredResumes);
      return Promise.resolve({ data: { success: true } });
    } else {
      return Promise.reject(new Error("Resume not found"));
    }
  }

  // Get current resume from session storage
  getCurrentResume() {
    try {
      const currentResume = sessionStorage.getItem(STORAGE_KEYS.CURRENT_RESUME);
      return currentResume ? JSON.parse(currentResume) : null;
    } catch (error) {
      console.error("Error getting current resume from sessionStorage:", error);
      return null;
    }
  }

  // Set current resume in session storage
  setCurrentResume(resume) {
    try {
      sessionStorage.setItem(
        STORAGE_KEYS.CURRENT_RESUME,
        JSON.stringify(resume)
      );
      return true;
    } catch (error) {
      console.error("Error setting current resume in sessionStorage:", error);
      return false;
    }
  }

  // Clear current resume from session storage
  clearCurrentResume() {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.CURRENT_RESUME);
      return true;
    } catch (error) {
      console.error(
        "Error clearing current resume from sessionStorage:",
        error
      );
      return false;
    }
  }
}

// Create and export a singleton instance
const localStorageService = new LocalStorageService();

export default localStorageService;




