import { DocumentProcessorServiceClient } from "@google-cloud/documentai";
import dotenv from "dotenv";

dotenv.config();

const documentClient = new DocumentProcessorServiceClient();
const projectId = process.env.GOOGLE_PROJECTID;
const location = process.env.GOOGLE_LOCATION;
const processorId = process.env.GOOGLE_PROCESSID;

export const extractTextFromPDF = async (pdfBuffer) => {
  const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

  const request = {
    name,
    rawDocument: {
      content: pdfBuffer.toString("base64"),
      mimeType: "application/pdf",
    },
  };

  const [result] = await documentClient.processDocument(request);
  return result.document.text || "No text found";
};
