import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { ClipLoader } from "react-spinners";

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
    <div className="h-[100%] w-[1500px] flex flex-col border border-r-2 p-4 overflow-y-scroll scroll">
      <h1 className="text-2xl font-spacegrotesksemibold mb-4">
        Upload Your Document or Image
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-md font-spacegroteskmedium mb-2">
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
          className="w-full font-spacegroteskmedium bg-gradient-to-br from-green-600 to-emerald-400 text-white py-2 px-4 rounded-lg flex items-center justify-center"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" size={25} />
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
        <h2 className="text-lg font-spacegrotesksemibold mb-2">
          Your Uploaded Files
        </h2>
        {fileFetchLoading ? (
          <div className="flex justify-center items-center">
            <ClipLoader color="#000000" size={35} />
          </div>
        ) : (
          <ul className="list-disc pl-2">
            {uploadedFiles.map((fileName, index) => (
              <li
                key={index}
                className="flex justify-between items-center font-spacegroteskregular p-2 pl-0"
              >
                <a
                  href="#"
                  onClick={() => handleFileClick(fileName)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  {fileName}
                </a>
                <button
                  onClick={() => handleDelete(fileName)}
                  className="ml-4 bg-red-500 text-white py-1 px-2 rounded-lg flex items-center justify-center"
                >
                  {deleteLoading[fileName] ? (
                    <ClipLoader color="#ffffff" size={15} />
                  ) : (
                    "Delete"
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isLoading && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Loading File...</h2>
          <p>
            Please wait while your file is being uploaded or processed. This
            might take a few seconds.
          </p>
        </div>
      )}
    </div>
  );
}