import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({ onChange }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    const newFile = newFiles[0];
    setFile(newFile);
    onChange && onChange(newFile);
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
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          {file ? (
            <div className="text-center">
              <p className="font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                File Uploaded: {file.type}
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
              <p className="font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
                Upload file
              </p>
              <p className="font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
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
                className="relative group-hover:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
              >
                {isDragActive ? (
                  <p className="text-neutral-600 flex flex-col items-center">
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
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
