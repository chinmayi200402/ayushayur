import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface PrakritiChartProps {
  scores: {
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export function PrakritiChart({ scores }: PrakritiChartProps) {
  const data = [
    { dosha: "Vata", value: scores.vata, fullMark: 100 },
    { dosha: "Pitta", value: scores.pitta, fullMark: 100 },
    { dosha: "Kapha", value: scores.kapha, fullMark: 100 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-6 shadow-sm"
    >
      <h3 className="font-display text-lg font-semibold text-center mb-4">
        Dosha Distribution
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid 
              stroke="hsl(var(--border))" 
              strokeDasharray="3 3"
            />
            <PolarAngleAxis
              dataKey="dosha"
              tick={{ 
                fill: "hsl(var(--foreground))", 
                fontSize: 14,
                fontWeight: 600 
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <Radar
              name="Prakriti"
              dataKey="value"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
