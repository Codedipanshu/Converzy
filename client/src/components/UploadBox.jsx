import { useState, useEffect } from "react";
import { uploadFile } from "../utils/api";

const UploadBox = ({ setEnglishText, setLastUpdated, setIsUploading }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Generate preview when file is selected
  useEffect(() => {
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup memory
    } else {
      setPreview(null); // No preview for PDFs
    }
  }, [file]);

  // Handles file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    handleFile(selectedFile);
  };

  // Handles pasting images (screenshots)
  useEffect(() => {
    const handlePaste = (event) => {
      const items = event.clipboardData.items;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          handleFile(blob);
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  // Handles drag & drop files
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile) return;

    handleFile(droppedFile);
  };

  // Common function for setting file and preview
  const handleFile = (selectedFile) => {
    if (
      !selectedFile.type.startsWith("image/") &&
      !selectedFile.type.endsWith("pdf")
    ) {
      alert("Only images (JPG, PNG) and PDFs are supported!");
      return;
    }

    setFile(selectedFile);
  };

  // Handles file upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    let fileType = file.type.includes("pdf") ? "pdf" : "image";

    setIsUploading(true); // Show loader

    const extractedText = await uploadFile(file, fileType);
    setEnglishText(extractedText);
    setLastUpdated("en");

    setTimeout(() => setIsUploading(false), 500); // Hide loader
  };

  return (
    <div
      className="border p-4 rounded-lg text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <p className="text-gray-500 mb-2">
        Paste screenshot (Ctrl + V) or Upload Image/PDF
      </p>

      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="mb-2 cursor-pointer"
      />

      {preview && (
        <div className="mb-4">
          <p className="text-gray-600">Preview:</p>
          <img
            src={preview}
            alt="Preview"
            className="w-64 h-auto mx-auto border rounded shadow"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Upload & Extract Text
      </button>
    </div>
  );
};

export default UploadBox;
