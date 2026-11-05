import APP_CONFIG from "./app_config";

const baseURL = APP_CONFIG.API_BASE_URL;
const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${baseURL}/auth/register`,
    LOGIN: `${baseURL}/auth/login`,
    VERIFY_EMAIL: `${baseURL}/auth/verify-email`,
    RESEND_VERIFICATION: `${baseURL}/auth/resend-verification`,
    FORGOT_PASSWORD: `${baseURL}/auth/forgot-password`,
    RESET_PASSWORD: `${baseURL}/auth/reset-password`,
    ME: `${baseURL}/me`,
    LOGOUT: `${baseURL}/auth/logout`,
  },
  OPTIONS: {
    DISTRICTS: `${baseURL}/option/districts`,
    DOCUMENT_CATEGORY: `${baseURL}/option/category_documents`,
    INDUSTRY: `${baseURL}/option/industries`,
    JOB_CATEGORY: `${baseURL}/option/job-fields`,
    JOB_POSITION: `${baseURL}/option/positions`,
    MAJOR: `${baseURL}/option/majors`,
  },
  JOB_SEEKER: {
    PROFILE: {
      GET_BY_ID: (id: string) => `${baseURL}/profiles/${id}`,
      GET_BY_AUTH: `${baseURL}/profiles/me`,
      UPDATE: `${baseURL}/profiles/me`,
      UPDATE_PICTURE: `${baseURL}/profiles/me/photo`,
      DELETE_PICTURE: `${baseURL}/profiles/me/photo`,
      COMPLETION: `${baseURL}/profiles/completeness`,
      TOGGLE_FRESH_GRADUATE: `${baseURL}/profiles/me/fresh-graduate`,
    },
    EDUCATION: {
      CREATE: `${baseURL}/educations`,
      FIND_BY_AUTH: `${baseURL}/educations`,
      UPDATE: (id: string) => `${baseURL}/educations/${id}`,
      DELETE: (id: string) => `${baseURL}/educations/${id}`,
    },
    EXPERIENCE: {
      CREATE: `${baseURL}/experiences`,
      FIND_BY_AUTH: `${baseURL}/experiences`,
      UPDATE: (id: string) => `${baseURL}/experiences/${id}`,
      DELETE: (id: string) => `${baseURL}/experiences/${id}`,
    },
    SKILL: {
      CREATE: `${baseURL}/skills`,
      FIND_BY_AUTH: `${baseURL}/skills`,
      UPDATE: (id: string) => `${baseURL}/skills/${id}`,
      DELETE: (id: string) => `${baseURL}/skills/${id}`,
    },
    CERTIFICATION: {
      CREATE: `${baseURL}/certifications`,
      FIND_BY_AUTH: `${baseURL}/certifications`,
      UPDATE: (id: string) => `${baseURL}/certifications/${id}`,
      DELETE: (id: string) => `${baseURL}/certifications/${id}`,
    },
    DOCUMENT: {
      CREATE: `${baseURL}/documents`,
      FIND_BY_AUTH: `${baseURL}/documents`,
      UPDATE: (id: string) => `${baseURL}/documents/${id}`,
      DELETE: (id: string) => `${baseURL}/documents/${id}`,
    },
    PREFERENCES: {
      FIND_BY_AUTH: `${baseURL}/job-preferences`,
      UPDATE: `${baseURL}/job-preferences`,
    },
  },
  ADMIN: {
    JOB_SEEKER: {
      INDEX: `${baseURL}/admin/job-seekers`,
      DETAIL: (id: string) => `${baseURL}/admin/job-seekers/${id}`,
      EXPORT: `${baseURL}/admin/job-seekers/export`,
      DASHBOARD: `${baseURL}/admin/dashboard/job-seekers`,
      MAP: `${baseURL}/admin/dashboard/job-seekers/map`,
    },
  },
};

export default API_ENDPOINTS;
