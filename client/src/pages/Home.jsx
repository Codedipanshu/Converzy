import { useRef, useEffect, useState } from "react";
import UploadBox from "../components/UploadBox";
import TextAreaBox from "../components/TextAreaBox";
import Loader from "../components/Loader"; // Import Loader component
import { translate } from "../utils/api";

const Home = () => {
  const [englishText, setEnglishText] = useState("");
  const [hindiText, setHindiText] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null); // Tracks the last changed input
  const [isTranslating, setIsTranslating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const timeoutRef = useRef(null);

  const handleTranslate = async (text, target) => {
    if (!text.trim()) return;
    setIsTranslating(true); // Show loader

    const translatedText = await translate(text, target);

    if (target === "hi") {
      setHindiText(translatedText);
    } else {
      setEnglishText(translatedText);
    }

    setTimeout(() => setIsTranslating(false), 500); // Hide loader after short delay
  };

  useEffect(() => {
    if (isTranslating || !lastUpdated) return; // Prevent unnecessary requests

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (lastUpdated === "en") {
        handleTranslate(englishText, "hi");
      } else if (lastUpdated === "hi") {
        handleTranslate(hindiText, "en");
      }
    }, 1000);

    return () => clearTimeout(timeoutRef.current);
  }, [englishText, hindiText]); // Watches both states

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {/* Loader */}
      <Loader isLoading={isTranslating || isUploading} />

      <h1 className="text-2xl font-bold text-center">
        Converzy - OCR & Translation
      </h1>

      <UploadBox
        setEnglishText={setEnglishText}
        setLastUpdated={setLastUpdated}
        setIsUploading={setIsUploading} // Pass loader state
      />

      <TextAreaBox
        label="English"
        text={englishText}
        setText={setEnglishText}
        setLastUpdated={setLastUpdated}
      />
      <TextAreaBox
        label="Hindi"
        text={hindiText}
        setText={setHindiText}
        setLastUpdated={setLastUpdated}
      />
    </div>
  );
};

export default Home;
