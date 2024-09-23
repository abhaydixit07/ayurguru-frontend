import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Fileupload({ userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [blobUrls, setBlobUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle file selection
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

  // Handle file submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !fileType) {
      alert("Please upload a valid file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

    // API call for Google Gemini Docs
    try {
      const apiUrl =
        fileType === "pdf"
          ? import.meta.env.VITE_API_URL_PDF
          : import.meta.env.VITE_API_URL_IMAGE;

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SECRET_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      // console.log("Summary:", result.summary || result.text);
      await axios.post(
        "http://localhost:5000/api/personalizedChats/addPersonalizedFileText",
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
          text: result.summary || result.text,
          sender: "user",
        }
      );
      setSummary(result.summary || result.text); // Display summary in UI
    } catch (error) {
      console.error("Error uploading file to Google Gemini:", error);
    }

    // Upload the file to your server to store in PostgreSQL
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading the file to the server.");
      }

      alert("File uploaded successfully to PostgreSQL!");
      fetchUserFiles(); // Refresh the file list after upload
    } catch (error) {
      console.error("Error uploading file to server:", error);
    }

    setSelectedFile(null);
  };

  // Fetch uploaded files by userId
  const fetchUserFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5000/userfiles/${userId}`);
      if (response.ok) {
        const files = await response.json();
        setUploadedFiles(files); // Only store file names
      } else {
        throw new Error("Error fetching files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Handle file deletion
  const handleDelete = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:5000/delete/${fileName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("File deleted successfully.");
        fetchUserFiles(); // Refresh the file list after deletion
      } else {
        throw new Error("Error deleting file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Generate blob URL and open the file
  const handleFileClick = async (fileName) => {
    if (blobUrls[fileName]) {
      // If the URL is already generated, just open it
      window.open(blobUrls[fileName]);
    } else {
      setIsLoading(true); // Start loading
      try {
        const blobResponse = await fetch(
          `http://localhost:5000/pdf/${fileName}`
        );
        const blob = await blobResponse.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrls((prev) => ({ ...prev, [fileName]: url })); // Store the URL
        window.open(url); // Open the file
      } catch (error) {
        console.error("Error generating blob URL:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchUserFiles();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#a8ff78] via-[#78ffd6] to-[#e0f7c5] flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
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
              accept=".pdf,image/*"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-600 to-emerald-400 text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>

        {summary && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Document Summary</h2>
            <p>{summary}</p>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Your Uploaded Files</h2>
          <ul className="list-disc pl-5">
            {uploadedFiles.map((fileName, index) => (
              <li key={index} className="flex justify-between items-center">
                <a
                  href="#"
                  onClick={() => handleFileClick(fileName)} // Use handleFileClick
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  {fileName}
                </a>
                <button
                  onClick={() => handleDelete(fileName)}
                  className="ml-4 bg-red-500 text-white py-1 px-2 rounded-lg"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {isLoading && (
          <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-lg">
            Loading... Please wait.
          </div>
        )}
      </div>
    </div>
  );
}
