import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { limiter } from "./middlewares/limiter.js";
import ocrRoutes from "./routes/ocrRoutes.js";
import translateRoutes from "./routes/translateRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", limiter);
app.use("/ocr", ocrRoutes);
app.use("/translate", translateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
