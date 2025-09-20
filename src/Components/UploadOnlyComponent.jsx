import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaCloudUploadAlt } from "react-icons/fa";
// import { MdDescription } from "react-icons/md";

export default function UploadOnlyComponent({ userId, onSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        `${import.meta.env.VITE_BACKEND_URL}/api/personalizedChats/addPersonalizedFileText`,
        {
          userId: userId,
          authMessage: import.meta.env.VITE_AUTH_MESSAGE,
          text: result.summary || result.text,
          sender: "user",
        }
      );

      const fileContentId = fileContent.data.id;

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

        alert("File uploaded successfully!");
        
        setSelectedFile(null);
        setFileType("");
        setSummary("");
        
        setTimeout(() => {
          onSuccess && onSuccess();
        }, 1500);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:h-[400px] h-[300px] md:w-[50vw] w-full flex flex-col">
      <form onSubmit={handleSubmit} className="mb-4 md:mb-6">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-all duration-300 p-4 md:p-8">
          <div className="text-center">
            <FaCloudUploadAlt className="mx-auto text-4xl md:text-6xl text-gray-400 mb-3 md:mb-4" />
            <label className="block text-base md:text-lg font-semibold text-gray-700 mb-3 md:mb-4 font-spacegroteskmedium">
              Drop your files here or click to browse
            </label>
            <input
              type="file"
              className="w-full text-xs md:text-sm p-3 md:p-4 border-2 border-gray-300 rounded-lg md:rounded-xl font-spacegroteskregular focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4 file:rounded-full file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              onChange={handleFileUpload}
              accept=".pdf,image/*"
            />
            <p className="text-xs md:text-sm text-gray-500 mt-2 font-spacegroteskregular">
              Supports PDF files and images (PNG, JPG, JPEG)
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedFile || isLoading}
          className="w-full mt-3 md:mt-4 font-spacegroteskmedium bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 md:py-4 px-4 md:px-6 rounded-lg md:rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
        >
          {isLoading ? (
            <>
              <ClipLoader color="#ffffff" size={16} />
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

      {/* Summary Section
      {summary && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl md:rounded-2xl p-4 md:p-6 border-l-4 border-blue-500">
          <div className="flex items-start gap-2 md:gap-3">
            <MdDescription className="text-blue-600 text-xl md:text-2xl mt-1 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-semibold text-blue-800 mb-2 font-spacegrotesksemibold">
                Document Summary
              </h3>
              <p className="text-sm md:text-base text-blue-700 font-spacegroteskregular leading-relaxed break-words">
                {summary}
              </p>
              <p className="text-xs md:text-sm text-blue-600 mt-2 md:mt-3 font-spacegroteskregular">
                ✅ Your document has been successfully processed and added to your medical profile!
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}