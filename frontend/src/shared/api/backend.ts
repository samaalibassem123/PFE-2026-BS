import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

type FastAPIValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

type FastAPIError = {
  detail: string | FastAPIValidationError[];
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<FastAPIError>(error)) {
    const data = error.response?.data;

    if (!data) return "No response from server";

    // HTTPException
    if (typeof data.detail === "string") {
      return data.detail;
    }

    // Validation error (422)
    if (Array.isArray(data.detail)) {
      return data.detail.map((e) => e.msg).join(", ");
    }
  }

  return "Something went wrong";
};
