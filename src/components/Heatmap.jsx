import { motion } from "framer-motion";
const Heatmap = ({ matrix }) => {
  // Flatten to find max value for normalization
  const maxVal = Math.max(...matrix.flat());

  const getColor = (value) => {
    const intensity = value / maxVal;

    // Green scale for correct, red for wrong (diagonal vs off-diagonal)
    return `rgba(${Math.floor(255 * (1 - intensity))}, ${
      Math.floor(200 * intensity)
    }, ${Math.floor(100 * intensity)}, ${0.2 + intensity})`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-white">
        Confusion Matrix Heatmap
      </h3>

      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Top Labels */}
        <div></div>
        <div className="text-sm text-gray-400 text-center">Pred Real</div>
        <div className="text-sm text-gray-400 text-center">Pred Fake</div>

        {/* Row 1 */}
        <div className="text-sm text-gray-400">Actual Real</div>
        {matrix[0].map((val, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-20 h-20 flex items-center justify-center rounded-xl font-bold text-white shadow-lg"
            style={{ backgroundColor: getColor(val) }}
          >
            {val}
          </motion.div>
        ))}

        {/* Row 2 */}
        <div className="text-sm text-gray-400">Actual Fake</div>
        {matrix[1].map((val, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="w-20 h-20 flex items-center justify-center rounded-xl font-bold text-white shadow-lg"
            style={{ backgroundColor: getColor(val) }}
          >
            {val}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;