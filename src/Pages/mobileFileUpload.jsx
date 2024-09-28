import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import "../index.css";

export default function MobileFileUpload({ userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [blobUrls, setBlobUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [deleteLoading, setDeleteLoading] = useState({}); // Loading state for file deletion
  const [fileFetchLoading, setFileFetchLoading] = useState(true); // Loading state for file fetch
  const [fileContentId, setFileContentId] = useState("");

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

    setIsLoading(true); // Set loading state to true

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
      const fileContent = await axios.post(
        "http://localhost:5000/api/personalizedChats/addPersonalizedFileText",
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
          text: result.summary || result.text,
          sender: "user",
        }
      );

      // Store the MongoDB ID in the local variable
      const fileContentId = fileContent.data.id; 
      
      setFileContentId(fileContentId); // Update state with MongoDB ID

      setSummary(result.summary || result.text); // Display summary in UI

      // Only proceed with PostgreSQL upload if MongoDB ID is fetched
      if (fileContentId) {
        // Prepare FormData with additional fields
        const formDataForUpload = new FormData();
        formDataForUpload.append("file", selectedFile); // Append the selected file
        formDataForUpload.append("userId", userId); // Add user ID to the form data
        formDataForUpload.append("mongodb_id", fileContentId); // Use the MongoDB ID

        // Make the fetch request with FormData
        const uploadResponse = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formDataForUpload,
        });

        if (!uploadResponse.ok) {
          throw new Error("Error uploading the file to the server.");
        }

        alert("File uploaded successfully to PostgreSQL!");
        fetchUserFiles(); // Refresh the file list after upload
      } else {
        console.error("MongoDB ID not found, skipping PostgreSQL upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      // Reset states after completion
      setSelectedFile(null);
      setFileContentId("");
      setIsLoading(false); // Set loading state to false after completion
    }
  };

  // Fetch uploaded files by userId
  const fetchUserFiles = async () => {
    setFileFetchLoading(true); // Start loading
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
    } finally {
      setFileFetchLoading(false); // Stop loading after completion or error
    }
  };

  // Handle file deletion
  const handleDelete = async (fileName, mongodb_id) => {
    setDeleteLoading((prev) => ({ ...prev, [fileName]: true })); // Start loading for the specific file
    try {
      const response = await fetch(`http://localhost:5000/delete/${userId}/${fileName}`, {
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
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [fileName]: false })); // Stop loading after deletion or error
    }
  };

  // Generate blob URL and open the file
  const handleFileClick = async (fileName) => {
    setIsLoading(true); // Start loading immediately when clicked
    try {
      let url = blobUrls[fileName];

      if (!url) {
        // If the URL is not already generated, fetch the blob and create the URL
        const blobResponse = await fetch(
          `http://localhost:5000/pdf/${fileName}`
        );
        const blob = await blobResponse.blob();
        url = URL.createObjectURL(blob);
        setBlobUrls((prev) => ({ ...prev, [fileName]: url })); // Store the URL
      }

      // Automatically open the file after the URL is ready
      window.open(url);
    } catch (error) {
      console.error("Error generating blob URL:", error);
    } finally {
      setIsLoading(false); // Stop loading after the URL is ready or on error
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchUserFiles();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center text-center p-1 overflow-y-scroll scroll">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-spacegroteskmedium mb-2">
            Upload your PDF or Image
          </label>
          <input
            type="file"
            className="w-full text-sm p-2 border rounded-lg font-spacegroteskregular"
            onChange={handleFileUpload}
            accept=".pdf,image/*"
          />
        </div>

        <button
          type="submit"
          className="w-full font-spacegroteskmedium bg-gradient-to-br from-green-600 to-emerald-400 text-white py-2 px-2 rounded-lg flex justify-center"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Document Summary</h2>
          <p>{summary}</p>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-md font-spacegrotesksemibold mb-2">
          Your Uploaded Files
        </h2>
        {fileFetchLoading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
        ) : (
          <ul className="list-disc pl-2">
            {uploadedFiles.map((fileName, index) => (
              <li
                key={index}
                className="flex justify-between items-center font-spacegroteskregular p-2 pl-0"
              >
                <a
                  href="#"
                  onClick={() => handleFileClick(fileName)} // Use handleFileClick
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  {fileName}
                </a>
                <button
                  className="ml-4 text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(fileName)}
                  disabled={deleteLoading[fileName]} // Disable button while loading
                >
                  {deleteLoading[fileName] ? (
                    <div className="w-4 h-4 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                  ) : (
                    <MdDelete size={23} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
