import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { FaFileAlt, FaFilePdf, FaImage, FaTrashAlt, FaDownload, FaSearch } from "react-icons/fa";

export default function FilesViewOnlyComponent({ userId, showHeading = true, showSubheadingCount = true, summaryPosition = 'bottom' }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [blobUrls, setBlobUrls] = useState({});
  const [deleteLoading, setDeleteLoading] = useState({});
  const [fileFetchLoading, setFileFetchLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = async (fileName) => {
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
      alert("Failed to delete file. Please try again.");
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [fileName]: false }));
    }
  };

  const handleFileClick = async (fileName) => {
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
      alert("Failed to open file. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserFiles();
  }, [userId]);

  const filteredFiles = uploadedFiles.filter(fileName =>
    fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pdfCount = uploadedFiles.filter(f => f.endsWith('.pdf')).length;
  const imageCount = uploadedFiles.filter(f => /(png|jpg|jpeg)$/i.test(f)).length;

  return (
    <div className="md:h-[400px] h-[400px] md:w-[50vw] w-full flex flex-col">
      <div className="mb-4 md:mb-6">
        {showHeading && (
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <FaFileAlt className="text-blue-600 text-xl md:text-2xl" />
            <div>
              <h2 className="text-lg md:text-2xl font-semibold text-gray-800 font-spacegrotesksemibold">
                Your Medical Documents
              </h2>
              {showSubheadingCount && (
                <p className="text-sm md:text-base text-gray-600 font-spacegroteskregular">
                  {uploadedFiles.length} document{uploadedFiles.length !== 1 ? 's' : ''} in your collection
                </p>
              )}
            </div>
          </div>
        )}

        <div className="relative">
          <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search your documents..."
            className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg md:rounded-xl font-spacegroteskregular focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-sm md:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {summaryPosition === 'top' && (
        <div className="mb-3 md:mb-4 pt-2 md:pt-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs md:text-sm text-gray-500 font-spacegroteskregular">
            <div className="flex items-center gap-2 md:gap-4">
              <span>{pdfCount} PDF files</span>
              <span>{imageCount} Images</span>
            </div>
            <span>Total: {uploadedFiles.length} documents</span>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {fileFetchLoading ? (
          <div className="flex-1 flex items-center justify-center h-64">
            <div className="text-center">
              <ClipLoader color="#2563eb" size={40} />
              <p className="text-gray-500 mt-4 font-spacegroteskregular">Loading your documents...</p>
            </div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex-1 flex items-center justify-center h-48 md:h-64">
            <div className="text-center text-gray-500 px-4">
              <FaFileAlt className="text-4xl md:text-6xl mb-3 md:mb-4 mx-auto opacity-30" />
              <p className="text-base md:text-lg font-spacegroteskmedium">
                {searchTerm ? 'No documents match your search' : 'No documents uploaded yet'}
              </p>
              <p className="text-sm md:text-base font-spacegroteskregular">
                {searchTerm ? 'Try a different search term' : 'Upload your first document to get started'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:gap-4 h-full overflow-y-auto">
            {filteredFiles.map((fileName, index) => {
              const isImage = /\.(png|jpg|jpeg)$/i.test(fileName);
              const isPdf = /\.pdf$/i.test(fileName);

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-lg md:rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 p-3 md:p-5 group"
                >
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="bg-white p-2 md:p-3 rounded-md md:rounded-lg shadow-sm border">
                        {isPdf ? (
                          <FaFilePdf className="text-red-500 text-lg md:text-2xl" />
                        ) : isImage ? (
                          <FaImage className="text-blue-500 text-lg md:text-2xl" />
                        ) : (
                          <FaFileAlt className="text-gray-500 text-lg md:text-2xl" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate font-spacegroteskmedium text-sm md:text-base" title={fileName}>
                          {fileName}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 font-spacegroteskregular">
                          {isPdf ? 'PDF Document' : isImage ? 'Image File' : 'Document'}
                        </p>
                        <p className="text-xs text-gray-400 font-spacegroteskregular hidden md:block">
                          Click to view or download
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 md:pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleFileClick(fileName)}
                      className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md md:rounded-lg transition-all duration-200 font-spacegroteskmedium"
                      title="View document"
                    >
                      <FaDownload className="text-xs md:text-sm" />
                      <span className="text-xs md:text-sm">View</span>
                    </button>
                    <button
                      onClick={() => handleDelete(fileName)}
                      disabled={deleteLoading[fileName]}
                      className="flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-red-600 hover:bg-red-50 rounded-md md:rounded-lg transition-all duration-200 disabled:opacity-50 font-spacegroteskmedium"
                      title="Delete document"
                    >
                      {deleteLoading[fileName] ? (
                        <ClipLoader color="#dc2626" size={12} />
                      ) : (
                        <>
                          <FaTrashAlt className="text-xs md:text-sm" />
                          <span className="text-xs md:text-sm">Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {summaryPosition === 'bottom' && (
        <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs md:text-sm text-gray-500 font-spacegroteskregular">
            <div className="flex items-center gap-2 md:gap-4">
              <span>{pdfCount} PDF files</span>
              <span>{imageCount} Images</span>
            </div>
            <span>Total: {uploadedFiles.length} documents</span>
          </div>
        </div>
      )}
    </div>
  );
}