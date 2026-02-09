import { cn } from "@/lib/utils";
import type { ChartData } from "@/lib/constants";

interface MiniChartProps {
  type: "line" | "bar";
  title: string;
  data: ChartData[];
  className?: string;
}

export function MiniChart({ type, title, data, className }: MiniChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.abs(d.value)));
  const minValue = Math.min(...data.map((d) => d.value));

  return (
    <div className={cn("glass-card rounded-lg p-4", className)}>
      <h4 className="text-sm font-semibold text-slate-300 mb-3">{title}</h4>
      
      {type === "line" && (
        <LineChart data={data} maxValue={maxValue} minValue={minValue} />
      )}
      
      {type === "bar" && (
        <BarChart data={data} maxValue={maxValue} />
      )}
    </div>
  );
}

function LineChart({
  data,
  maxValue,
  minValue,
}: {
  data: ChartData[];
  maxValue: number;
  minValue: number;
}) {
  const range = maxValue - minValue;
  const height = 120;

  // Calculate points for the line path
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = ((maxValue - d.value) / range) * 100;
    return `${x},${y}`;
  });

  return (
    <div className="relative" style={{ height: `${height}px` }}>
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="border-t border-slate-800/50" />
        ))}
      </div>

      {/* SVG Chart */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Gradient */}
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Area under line */}
        <path
          d={`M 0,100 L ${points.join(" L ")} L 100,100 Z`}
          fill="url(#lineGradient)"
        />

        {/* Line */}
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke="rgb(16, 185, 129)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />

        {/* Points */}
        {points.map((point, i) => {
          const [x, y] = point.split(",").map(Number);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1"
              fill="rgb(16, 185, 129)"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Labels */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-slate-500">
        {data.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function BarChart({ data, maxValue }: { data: ChartData[]; maxValue: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-2 h-32">
        {data.map((d, i) => {
          const isNegative = d.value < 0;
          const heightPercent = (Math.abs(d.value) / maxValue) * 100;
          const color = d.color || (isNegative ? "text-red-500" : "text-success");

          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-32">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${color.replace(
                    "text-",
                    "bg-"
                  )}`}
                  style={{ height: `${heightPercent}%` }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-white/10 to-transparent" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Labels and values */}
      <div className="flex justify-between gap-2 pt-2 border-t border-slate-800/50">
        {data.map((d, i) => {
          const color = d.color || (d.value < 0 ? "text-red-500" : "text-success");
          return (
            <div key={i} className="flex-1 text-center">
              <div className="text-xs text-slate-500">{d.label}</div>
              <div className={`text-xs font-semibold ${color}`}>
                ${Math.abs(d.value).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
