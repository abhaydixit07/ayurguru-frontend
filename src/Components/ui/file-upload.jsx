import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import pdfSvg from "../../assets/pdf.svg";
import docxSvg from "../../assets/docx.svg";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 12,
    y: -7,
    opacity: 0.9,
  },
};

export const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const allowedFileTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
  ];

  const handleFileChange = (newFiles) => {
    if (!newFiles || newFiles.length === 0) {
      return;
    }

    const newFile = newFiles[0];

    if (newFile && allowedFileTypes.includes(newFile.type)) {
      setFile(newFile);
      onChange && onChange(newFile);
    } else {
      alert(
        "Invalid file type. Only PDF, DOCX, PNG, and JPG/JPEG are allowed."
      );
      setFile(null);
      onChange && onChange(null);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    onChange && onChange(null);
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  const renderThumbnail = () => {
    if (!file) return null;

    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={URL.createObjectURL(file)}
            alt="File Thumbnail"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      );
    } else if (fileType === "application/pdf") {
      return (
        <div className="flex flex-col items-center">
          <img src={pdfSvg} alt="PDF File" className="w-16 h-16" />
          <p className="text-sm text-neutral-600">
            PDF File
          </p>
        </div>
      );
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div className="flex flex-col items-center">
          <img src={docxSvg} alt="DOCX File" className="w-16 h-16" />
          <p className="text-sm text-neutral-600">
            DOCX File
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".pdf, .docx, .png, .jpg, .jpeg"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          {file ? (
            <div className="text-center">
              <div className="mb-4">{renderThumbnail()}</div>
              <p className="font-sans font-bold text-neutral-700 text-base">
                {file.name}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={removeFile}
              >
                Remove File
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="font-sans font-bold text-neutral-700">
                Upload file
              </p>
              <p className="font-sans font-normal text-neutral-400 text-base mt-2">
                Drag or drop your file here or click to upload
              </p>
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative group-hover:shadow-2xl z-40 bg-white flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
              >
                {isDragActive ? (
                  <p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600" />
                  </p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600" />
                )}
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FileUpload;
