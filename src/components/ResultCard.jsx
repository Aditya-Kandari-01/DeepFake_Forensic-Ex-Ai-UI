import { motion } from "framer-motion";

const ResultCard = ({ result }) => {
  console.log(result)
  const label = result?.label;
  const confidence = result?.confidence;
  const prediction = label === 'DEEPFAKE' ? 'Fake' : 'Real';
  const percent = Math.round(confidence * 100);
  const colorClass = prediction === 'Real' ? 'from-green-500 to-emerald-400' : 'from-red-500 to-pink-400';
  const textClass = prediction === 'Real' ? 'text-green-400' : 'text-red-400';
  const borderClass = prediction === 'Real' ? 'border-green-500/30' : 'border-red-500/30';
  const bgClass = prediction === 'Real' ? 'bg-green-500/10' : 'bg-red-500/10';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`mt-8 p-6 bg-gradient-to-br ${bgClass} backdrop-blur-sm rounded-xl border ${borderClass} ${textClass} shadow-xl`}
    >
      <div className="flex items-center justify-between mb-4">
        <p className={`font-bold text-2xl ${textClass}`}>{prediction}</p>
        {prediction === 'Real' ? (
          <span className="text-2xl">✓</span>
        ) : (
          <span className="text-2xl">⚠</span>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">Confidence</span>
          <span className={`text-lg font-bold ${textClass}`}>{percent}%</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${colorClass}`}
          ></motion.div>
        </div>
      </div>
      <p className="mt-4 text-xs text-gray-400">Confidence Score: {confidence?.toFixed(3)}</p>
    </motion.div>
  );
};

export default ResultCard;
