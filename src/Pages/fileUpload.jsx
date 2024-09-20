import React, { useState } from "react";

export default function Fileupload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [summary, setSummary] = useState(""); 

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file); 
      
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension === "pdf") {
        setFileType("pdf");
      } else if (["png", "jpg", "jpeg"].includes(fileExtension)) {
        setFileType("image");
      } else {
        alert("Unsupported file type. Please upload a PDF or an image.");
        setSelectedFile(null);
        setFileType("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !fileType) {
      alert("Please upload a valid file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const apiUrl = fileType === "pdf"
        ? import.meta.env.VITE_API_URL_PDF
        : import.meta.env.VITE_API_URL_IMAGE;
        
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      console.log("Summary:", result.summary || result.text);
      setSummary(result.summary || result.text); // Update the summary state to display it in the UI
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a8ff78] via-[#78ffd6] to-[#e0f7c5] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">
          AyurGuru: Upload Your Document or Image
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Upload your PDF or Image
            </label>
            <input
              type="file"
              className="w-full text-sm p-2 border rounded-lg"
              onChange={handleFileUpload}
              accept=".pdf,image/*" // Allow both PDFs and images
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-600 to-emerald-400 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>

        {/* Display the summary */}
        {summary && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Document Summary</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}