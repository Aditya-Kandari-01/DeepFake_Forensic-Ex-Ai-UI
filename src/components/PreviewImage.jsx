const PreviewImage = ({ src, alt }) => {
  return (
    <motion.img 
      key={src}
      src={src} alt={alt}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-auto rounded-lg object-cover mt-4 shadow-md"
    />
  );
};

export default PreviewImage;
