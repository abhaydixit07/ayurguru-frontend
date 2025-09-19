import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { ClipLoader } from "react-spinners";
import { FaCloudUploadAlt, FaFileAlt, FaFilePdf, FaImage, FaTrashAlt, FaDownload } from "react-icons/fa";
import { MdDescription } from "react-icons/md";

export default function Fileupload({ userId }) {
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
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <FaCloudUploadAlt className="text-white text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 font-spacegrotesksemibold">
              Upload Documents
            </h1>
            <p className="text-emerald-700 font-spacegroteskregular">
              Share your medical reports for personalized Ayurvedic analysis
            </p>
          </div>
        </div>
      </div>

      {/* Upload Section */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-all duration-300 p-8">
          <div className="text-center">
            <FaCloudUploadAlt className="mx-auto text-6xl text-gray-400 mb-4" />
            <label className="block text-lg font-semibold text-gray-700 mb-4 font-spacegroteskmedium">
              Drop your files here or click to browse
            </label>
            <input
              type="file"
              className="w-full text-sm p-4 border-2 border-gray-300 rounded-xl font-spacegroteskregular focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              onChange={handleFileUpload}
              accept=".pdf,image/*"
            />
            <p className="text-sm text-gray-500 mt-2 font-spacegroteskregular">
              Supports PDF files and images (PNG, JPG, JPEG)
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className="w-full mt-4 font-spacegroteskmedium bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <ClipLoader color="#ffffff" size={20} />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <FaCloudUploadAlt />
              <span>Upload Document</span>
            </>
          )}
        </button>
      </form>

      {/* Summary Section */}
      {summary && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-3">
            <MdDescription className="text-blue-600 text-2xl mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2 font-spacegrotesksemibold">
                Document Summary
              </h3>
              <p className="text-blue-700 font-spacegroteskregular leading-relaxed">
                {summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Files List Section */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <FaFileAlt className="text-gray-600 text-xl" />
            <h2 className="text-xl font-semibold text-gray-800 font-spacegrotesksemibold">
              Your Medical Documents
            </h2>
          </div>
          
          {fileFetchLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ClipLoader color="#059669" size={40} />
                <p className="text-gray-500 mt-4 font-spacegroteskregular">Loading your files...</p>
              </div>
            </div>
          ) : uploadedFiles.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FaFileAlt className="text-6xl mb-4 mx-auto opacity-30" />
                <p className="text-lg font-spacegroteskmedium">No documents uploaded yet</p>
                <p className="font-spacegroteskregular">Upload your first document to get started</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto scroll space-y-3">
              {uploadedFiles.map((fileName, index) => {
                const isImage = /\.(png|jpg|jpeg)$/i.test(fileName);
                const isPdf = /\.pdf$/i.test(fileName);
                
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        {isPdf ? (
                          <FaFilePdf className="text-red-500 text-xl" />
                        ) : isImage ? (
                          <FaImage className="text-blue-500 text-xl" />
                        ) : (
                          <FaFileAlt className="text-gray-500 text-xl" />
                        )}
                      </div>
                      <div className="flex-1">
                        <button
                          onClick={() => handleFileClick(fileName)}
                          className="text-left w-full text-gray-800 hover:text-emerald-600 font-medium transition-colors duration-200 font-spacegroteskregular truncate"
                          title={fileName}
                        >
                          {fileName}
                        </button>
                        <p className="text-sm text-gray-500 font-spacegroteskregular">
                          {isPdf ? 'PDF Document' : isImage ? 'Image File' : 'Document'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleFileClick(fileName)}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="View document"
                      >
                        <FaDownload className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(fileName)}
                        disabled={deleteLoading[fileName]}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 disabled:opacity-50"
                        title="Delete document"
                      >
                        {deleteLoading[fileName] ? (
                          <ClipLoader color="#dc2626" size={16} />
                        ) : (
                          <FaTrashAlt className="text-sm" />
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

      {/* Processing Indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4">
            <div className="text-center">
              <ClipLoader color="#059669" size={50} />
              <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2 font-spacegrotesksemibold">
                Processing Your Document
              </h3>
              <p className="text-gray-600 font-spacegroteskregular">
                Please wait while we analyze your file. This may take a few moments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}