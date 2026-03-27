import { motion } from "framer-motion";

const PreviewImage = ({ src, alt }) => {
  return (
    <motion.div
      key={src}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mt-6 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 group"
    >
      <img 
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default PreviewImage;
