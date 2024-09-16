import React, { useState } from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [customFileType, setCustomFileType] = useState("");

  const handleFileChange = (e) => {
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <h1 className="text-2xl font-semibold mb-4">
          AyurGuru: Upload Your Report
        </h1>
        <form onSubmit={handleSubmit}>
          <div
            className="w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 m-10"
            id="dropzone"
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 z-50"
            />
            <div className="text-center">
              <img
                className="mx-auto h-12 w-12"
                src="https://www.svgrepo.com/show/357902/image-upload.svg"
                alt=""
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer"
                >
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse</span>
                  <span>to upload</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                  />
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
            <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" />
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
