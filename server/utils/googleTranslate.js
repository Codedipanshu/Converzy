import { Translate } from "@google-cloud/translate/build/src/v2/index.js";

const translateClient = new Translate();

export const translateText = async (text, target) => {
  try {
    const [translation] = await translateClient.translate(text, target);
    return translation;
  } catch (error) {
    console.error("Translation Error:", error);
    return text;
  }
};
