import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // Change this if backend is deployed

const errorHandling = (error) => {
  if (error.response && error.response.status === 429) {
    // Handle rate limit error (status 429)
    alert("Limit exceeded. Please try after 15 minutes.");
  } else {
    // Handle other errors
    console.error("OCR Error:", error);
    return "Error extracting text";
  }
};

// Upload image/PDF and get OCR text
export const uploadFile = async (file, type) => {
  const formData = new FormData();
  formData.append("file", file);

  const endpoint = type === "image" ? "/ocr/image" : "/ocr/pdf";

  try {
    const response = await axios.post(`${API_BASE}${endpoint}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.text;
  } catch (error) {
    errorHandling(error);
  }
};

// Translate text
export const translate = async (text, target) => {
  try {
    const response = await axios.post(`${API_BASE}/translate`, {
      text,
      target,
    });
    return response.data.translatedText;
  } catch (error) {
    errorHandling(error);
  }
};
