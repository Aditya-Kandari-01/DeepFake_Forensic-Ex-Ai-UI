import Heatmap from "./Heatmap";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const stats = {
  accuracy: 0.77,
  precision: 0.74,
  recall: 0.81,
  f1: 0.78,
  confusionMatrix: [
    [79, 29],
    [19, 83],
  ],
};

// 📈 Training Data (dummy for now)
const trainingData = [
  { epoch: 1, loss: 0.65, val_loss: 0.68 },
  { epoch: 2, loss: 0.55, val_loss: 0.60 },
  { epoch: 3, loss: 0.48, val_loss: 0.57 },
  { epoch: 4, loss: 0.42, val_loss: 0.59 },
  { epoch: 5, loss: 0.38, val_loss: 0.61 },
];

// 📊 ROC Curve Data (dummy)
const rocData = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.1, tpr: 0.5 },
  { fpr: 0.2, tpr: 0.65 },
  { fpr: 0.3, tpr: 0.75 },
  { fpr: 0.4, tpr: 0.82 },
  { fpr: 0.6, tpr: 0.90 },
  { fpr: 0.8, tpr: 0.95 },
  { fpr: 1.0, tpr: 1.0 },
];

const StatCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center shadow-lg hover:scale-105 transition"
  >
    <p className="text-sm text-gray-400 uppercase">{label}</p>
    <p className="text-2xl font-bold text-white">
      {(value * 100).toFixed(1)}%
    </p>
  </motion.div>
);

const ModelStats = () => {
  return (
    <div className="mt-12 w-full max-w-5xl mx-auto space-y-10">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white text-center"
      >
        Model Insights
      </motion.h2>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Accuracy" value={stats.accuracy} delay={0.1} />
        <StatCard label="Precision" value={stats.precision} delay={0.2} />
        <StatCard label="Recall" value={stats.recall} delay={0.3} />
        <StatCard label="F1 Score" value={stats.f1} delay={0.4} />
      </div>

      {/* Heatmap */}
      <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <Heatmap matrix={stats.confusionMatrix} />
      </div>
    </div>
  );
};

export default ModelStats;