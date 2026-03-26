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
      className="block text-center cursor-pointer border-2 border-dashed border-gray-500 rounded-lg p-6 hover:border-teal-400 transition"
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
        <svg className="w-12 h-12 mb-3 text-gray-400 group-hover:text-teal-400">/* upload icon */</svg>
        <p>Drag & drop an image, or click to select</p>
      </div>
    </label>
  );
};

export default UploadZone;
