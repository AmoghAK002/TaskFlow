import axios from "axios";

const API_URL =
  "http://127.0.0.1:8000";

export const generateTaskDescription =
  (title) =>
    axios.post(
      `${API_URL}/generate-task`,
      {
        title
      }
    );

