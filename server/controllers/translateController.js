import { translateText } from "../utils/googleTranslate.js";

export const processTranslation = async (req, res) => {
    const { text, target } = req.body;
    if (!text) return res.status(400).json({ error: "Text required" });

    try {
        const translatedText = await translateText(text, target);
        res.json({ translatedText });
    } catch (error) {
        res.status(500).json({ error: "Translation failed", details: error.message });
    }
};
