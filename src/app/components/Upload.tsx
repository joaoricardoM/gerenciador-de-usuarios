import React from 'react';

interface UploadProps {
  onChange: (files: File[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onChange }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onChange(droppedFiles);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="w-32 h-32 bg-gray-200 border-2 border-dashed border-gray-400 rounded flex items-center justify-center"
    >
      Drop files here
    </div>
  );
};

export default Upload;
