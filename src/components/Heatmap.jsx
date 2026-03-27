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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-teal-500/30 transition-all"
    >
      <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text">
        Confusion Matrix Heatmap
      </h3>

      <div className="grid gap-2 items-center justify-center" style={{ gridTemplateColumns: 'auto auto auto' }}>
        {/* Top Labels */}
        <div></div>
        <div className="text-xs text-gray-400 text-center font-semibold px-2">Pred Real</div>
        <div className="text-xs text-gray-400 text-center font-semibold px-2">Pred Fake</div>

        {/* Row 1 */}
        <div className="text-xs text-gray-400 font-semibold">Actual Real</div>
        {matrix[0].map((val, i) => (
          <motion.div
            key={`row1-${i}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="w-20 h-20 flex items-center justify-center rounded-lg font-bold text-white shadow-md border border-gray-700/30 hover:border-gray-600 transition-colors"
            style={{ backgroundColor: getColor(val) }}
          >
            {val}
          </motion.div>
        ))}

        {/* Row 2 */}
        <div className="text-xs text-gray-400 font-semibold">Actual Fake</div>
        {matrix[1].map((val, i) => (
          <motion.div
            key={`row2-${i}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (i + 2) * 0.1 }}
            className="w-20 h-20 flex items-center justify-center rounded-lg font-bold text-white shadow-md border border-gray-700/30 hover:border-gray-600 transition-colors"
            style={{ backgroundColor: getColor(val) }}
          >
            {val}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Heatmap;