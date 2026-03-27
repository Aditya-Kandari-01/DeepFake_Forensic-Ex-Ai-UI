import { motion } from "framer-motion";

const GradCAMHeatmap = ({ gradHeatmap }) => {
  if (!gradHeatmap) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 max-w-xl"
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text mb-4">Grad-CAM Heatmap</h2>
        <p className="text-gray-400 text-sm mb-4">Visualization of the regions the model focused on for its prediction</p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-teal-500/20 hover:border-teal-500/50 transition-all duration-300 group"
      >
        <img
          src={`data:image/png;base64,${gradHeatmap}`}
          alt="Grad-CAM Heatmap"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </motion.div>
      <div className="text-xs text-gray-500 mt-2 text-center">
        <p>Red/Yellow regions: High importance • Blue regions: Low importance</p>
      </div>
    </motion.div>
  );
};

export default GradCAMHeatmap;
