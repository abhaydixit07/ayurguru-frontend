import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt, FaFileAlt, FaFilePdf, FaImage, FaTrashAlt, FaDownload } from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import axios from "axios";
import "../index.css";

export default function MobileFileUpload({ userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [summary, setSummary] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [blobUrls, setBlobUrls] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [fileFetchLoading, setFileFetchLoading] = useState(true);
  const [fileContentId, setFileContentId] = useState("");

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

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);

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
        `${import.meta.env.VITE_BACKEND_URL
        }/api/personalizedChats/addPersonalizedFileText`,
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
          text: result.summary || result.text,
          sender: "user",
        }
      );

      const fileContentId = fileContent.data.id;

      setFileContentId(fileContentId);
      setSummary(result.summary || result.text);

      if (fileContentId) {
        const formDataForUpload = new FormData();
        formDataForUpload.append("file", selectedFile);
        formDataForUpload.append("userId", userId);
        formDataForUpload.append("mongodb_id", fileContentId);

        const uploadResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/upload`,
          {
            method: "POST",
            body: formDataForUpload,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Error uploading the file to the server.");
        }

        alert("File uploaded successfully to PostgreSQL!");
        fetchUserFiles();
      } else {
        console.error("MongoDB ID not found, skipping PostgreSQL upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setSelectedFile(null);
      setFileContentId("");
      setIsLoading(false);
    }
  };

  const fetchUserFiles = async () => {
    setFileFetchLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/userfiles/${userId}`
      );
      if (response.ok) {
        const files = await response.json();
        setUploadedFiles(files);
      } else {
        throw new Error("Error fetching files.");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setFileFetchLoading(false);
    }
  };

  const handleDelete = async (fileName, mongodb_id) => {
    setDeleteLoading((prev) => ({ ...prev, [fileName]: true }));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/delete/${userId}/${fileName}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("File deleted successfully.");
        fetchUserFiles();
      } else {
        throw new Error("Error deleting file.");
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [fileName]: false }));
    }
  };

  const handleFileClick = async (fileName) => {
    setIsLoading(true);
    try {
      let url = blobUrls[fileName];

      if (!url) {
        const blobResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/pdf/${fileName}`
        );
        const blob = await blobResponse.blob();
        url = URL.createObjectURL(blob);
        setBlobUrls((prev) => ({ ...prev, [fileName]: url }));
      }

      window.open(url);
    } catch (error) {
      console.error("Error generating blob URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFiles();
  }, [userId]);

  return (
    <div className="h-full w-full flex flex-col p-4 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <FaCloudUploadAlt className="text-white text-lg" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 font-spacegrotesksemibold">
              Upload Documents
            </h1>
            <p className="text-xs text-emerald-700 font-spacegroteskregular">
              Upload medical reports for analysis
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-all duration-300 p-4">
          <div className="text-center">
            <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-2" />
            <label className="block text-sm font-semibold text-gray-700 mb-3 font-spacegroteskmedium">
              Tap to upload files
            </label>
            <input
              type="file"
              className="w-full text-xs p-3 border-2 border-gray-300 rounded-lg font-spacegroteskregular focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700"
              onChange={handleFileUpload}
              accept=".pdf,image/*"
            />
            <p className="text-xs text-gray-500 mt-1 font-spacegroteskregular">
              PDF & Images supported
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className="w-full mt-3 font-spacegroteskmedium bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-lg shadow-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              <span className="text-sm">Processing...</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt className="text-sm" />
              <span className="text-sm">Upload Document</span>
            </>
          )}
        </button>
      </form>

      {/* Summary Section */}
      {summary && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4 border-l-4 border-blue-500">
          <div className="flex items-start gap-2">
            <MdDescription className="text-blue-600 text-lg mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-800 mb-1 font-spacegrotesksemibold">
                Document Summary
              </h3>
              <p className="text-xs text-blue-700 font-spacegroteskregular leading-relaxed">
                {summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Files List Section */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-xl shadow-lg p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <FaFileAlt className="text-gray-600 text-sm" />
            <h2 className="text-sm font-semibold text-gray-800 font-spacegrotesksemibold">
              Your Documents
            </h2>
          </div>
          
          {fileFetchLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-emerald-600 rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-gray-500 mt-2 font-spacegroteskregular">Loading files...</p>
              </div>
            </div>
          ) : uploadedFiles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FaFileAlt className="text-3xl mb-2 mx-auto opacity-30" />
                <p className="text-xs font-spacegroteskmedium">No documents yet</p>
                <p className="text-xs font-spacegroteskregular">Upload your first file</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto scroll space-y-2">
              {uploadedFiles.map((fileName, index) => {
                const isImage = /\.(png|jpg|jpeg)$/i.test(fileName);
                const isPdf = /\.pdf$/i.test(fileName);
                
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
                        {isPdf ? (
                          <FaFilePdf className="text-red-500 text-sm" />
                        ) : isImage ? (
                          <FaImage className="text-blue-500 text-sm" />
                        ) : (
                          <FaFileAlt className="text-gray-500 text-sm" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() => handleFileClick(fileName)}
                          className="text-left w-full text-xs text-gray-800 hover:text-emerald-600 font-medium transition-colors duration-200 font-spacegroteskregular truncate block"
                          title={fileName}
                        >
                          {fileName}
                        </button>
                        <p className="text-xs text-gray-500 font-spacegroteskregular">
                          {isPdf ? 'PDF' : isImage ? 'Image' : 'File'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleFileClick(fileName)}
                        className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                        title="View"
                      >
                        <FaDownload className="text-xs" />
                      </button>
                      <button
                        onClick={() => handleDelete(fileName)}
                        disabled={deleteLoading[fileName]}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="Delete"
                      >
                        {deleteLoading[fileName] ? (
                          <div className="w-3 h-3 border-2 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                        ) : (
                          <FaTrashAlt className="text-xs" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
