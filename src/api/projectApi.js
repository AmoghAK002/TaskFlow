import axios from "axios";

const API_URL =
  "https://taskflow-ai-backend-fh74.onrender.com";

export const getProjects = () =>
  axios.get(
    `${API_URL}/projects`
  );

export const createProject = (
  project
) =>
  axios.post(
    `${API_URL}/projects`,
    project
  );

export const deleteProject = (
  id
) =>
  axios.delete(
    `${API_URL}/projects/${id}`
  );