import { ImageAnnotatorClient } from "@google-cloud/vision";
import dotenv from "dotenv";
dotenv.config();

const visionClient = new ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

export const extractTextFromImage = async (imageBuffer) => {
  // Convert image to Base64
  const imageBase64 = imageBuffer.toString("base64");

  // Call Google Vision API
  const [result] = await visionClient.textDetection({
    image: { content: imageBase64 },
  });

  return result.fullTextAnnotation
    ? result.fullTextAnnotation.text
    : "No text found";
};
