const ResultCard = ({ probability, prediction }) => {
  const percent = Math.round(probability * 100);
  const colorClass = prediction === 'Real' ? 'from-green-500 to-green-400' : 'from-red-500 to-red-400';
  const textClass = prediction === 'Real' ? 'text-green-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border ${textClass} border-gray-700 shadow-lg`}
    >
      <p className={`font-bold text-lg ${textClass}`}>{prediction}</p>
      <div className="mt-2 w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm">Confidence: {percent}%</p>
    </motion.div>
  );
};

export default ResultCard;
