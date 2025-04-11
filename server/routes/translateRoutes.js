import express from "express";
import { processTranslation } from "../controllers/translateController.js";

const router = express.Router();
router.post("/", processTranslation);
export default router;
