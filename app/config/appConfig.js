// config/apiConfig.js

export const API_BASE_URL = 'http://127.0.0.1:8020'; // Update this URL based on your backend

export const API_ENDPOINTS = {
  CREATE_SESSION: `${API_BASE_URL}/create_session`,
  GET_PROJECT_FILES: `${API_BASE_URL}/get_all_project_files`,
  UPLOAD_FILE: `${API_BASE_URL}/create_session`,
  CREATE_SESSION: `${API_BASE_URL}/create_session`,
  GET_ALL_PROJECT_FILES: `${API_BASE_URL}/get_all_project_files`,
  PROCESS_PROJECT_FOLDER: `${API_BASE_URL}/process_project_folder`,
  GET_HASH_TO_LINENO: `${API_BASE_URL}/get_hash_to_lineno_fullproj`,
  START_PROFILING: `${API_BASE_URL}/start_profiling2`,
  KILL_PROCESS: `${API_BASE_URL}/kill_process`,
  ANALYZE_PROFILE: `${API_BASE_URL}/analyze_profile`,
  // Add more endpoints as needed
};
