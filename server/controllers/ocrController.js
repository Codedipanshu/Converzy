import { extractTextFromImage } from "../utils/googleVision.js";
import { extractTextFromPDF } from "../utils/googleDocumentAI.js";

// Process OCR for images (JPG, PNG)
export const processImageOCR = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const text = await extractTextFromImage(req.file.buffer);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: "Image OCR failed", details: error.message });
    }
};

// Process OCR for PDFs
export const processPdfOCR = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    try {
        const text = await extractTextFromPDF(req.file.buffer);
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: "PDF OCR failed", details: error.message });
    }
};
