import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"; // Change this if backend is deployed

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
    console.error("OCR Error:", error);
    return "Error extracting text";
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
    console.error("Translation Error:", error);
    return "Translation failed";
  }
};
