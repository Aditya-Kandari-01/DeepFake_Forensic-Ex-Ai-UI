const UploadZone = ({ onFileSelect }) => {
  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  };

  const onDragOver = (e) => {
    e.preventDefault(); // allow drop
  };

  return (
    <label 
      htmlFor="fileUpload"
      className="block text-center cursor-pointer border-2 border-dashed border-gray-600 rounded-xl p-8 hover:border-teal-400 hover:bg-teal-400/5 transition-all duration-300"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={e => e.target.files[0] && onFileSelect(e.target.files[0])}
        className="hidden"
        aria-label="File Upload"
      />
      <div className="flex flex-col items-center justify-center">
        <svg className="w-14 h-14 mb-4 text-teal-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
        </svg>
        <p className="text-gray-300 font-medium">Drag & drop an image here</p>
        <p className="text-gray-500 text-sm mt-2">or click to select from your device</p>
      </div>
    </label>
  );
};

export default UploadZone;
