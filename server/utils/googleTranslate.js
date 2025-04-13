import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import dotenv from "dotenv";
dotenv.config();

const translateClient = new Translate({
  credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
});

export const translateText = async (text, target) => {
  try {
    const [translation] = await translateClient.translate(text, target);
    return translation;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};
