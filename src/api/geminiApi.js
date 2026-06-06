import axios from "axios";

const API_URL =
  "https://taskflow-ai-backend-fh74.onrender.com";

export const generateTaskDescription =
  (title) =>
    axios.post(
      `${API_URL}/generate-task`,
      {
        title
      }
    );

