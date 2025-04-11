import express from "express";
import multer from "multer";
import { processImageOCR, processPdfOCR } from "../controllers/ocrController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Route for Image OCR
router.post("/image", upload.single("file"), processImageOCR);

// Route for PDF OCR
router.post("/pdf", upload.single("file"), processPdfOCR);

export default router;
