import React, { useState } from 'react';
import { FileUpload } from "../Components/ui/file-upload";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [customFileType, setCustomFileType] = useState("");

  const handleFileUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleCustomTypeChange = (e) => {
    setCustomFileType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please upload a file!");
      return;
    }
    if (fileType === "other" && !customFileType) {
      alert("Please describe the file type!");
      return;
    }
    // Submit logic can go here.
    console.log("File:", selectedFile);
    console.log("File Type:", fileType === "other" ? customFileType : fileType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a8ff78] via-[#78ffd6] to-[#e0f7c5] flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">
          AyurGuru: Upload Your Report
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            <FileUpload onChange={handleFileUpload} />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Select File Type
            </label>
            <select
              className="w-full text-sm p-2 border rounded-lg cursor-pointer"
              value={fileType}
              onChange={handleFileTypeChange}
            >
              <option value="" disabled>
                Select file type
              </option>
              <option value="prescription">Prescription</option>
              <option value="medical_record">Medical Record</option>
              <option value="test_report">Test Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          {fileType === "other" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Describe the file
              </label>
              <input
                type="text"
                className="w-full text-sm p-2 border rounded-lg focus:outline-none"
                value={customFileType}
                onChange={handleCustomTypeChange}
                placeholder="Describe the file type"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-600 to-emerald-400 text-white py-2 px-4 rounded-lg "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
