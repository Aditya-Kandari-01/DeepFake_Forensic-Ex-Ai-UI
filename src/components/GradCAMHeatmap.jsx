import { motion } from "framer-motion";

const GradCAMHeatmap = ({ gradHeatmap }) => {
  if (!gradHeatmap) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-bold text-white">Grad-CAM Heatmap</h2>
      <img
        src={`data:image/png;base64,${gradHeatmap}`}
        alt="Grad-CAM Heatmap"
        className="w-full max-w-2xl h-96 object-cover rounded-xl shadow-2xl border border-gray-700"
      />
    </motion.div>
  );
};

export default GradCAMHeatmap;
