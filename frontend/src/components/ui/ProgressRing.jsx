import React from "react";
import { clamp } from "../../lib/utils";

export default function ProgressRing({
  size = 160,
  stroke = 10,
  gap = 8,
  rings = [],
  centerLabel,
}) {
  const center = size / 2;
  const maxRadius = center - stroke;

  return (
    <svg width={size} height={size} className="block">
      {rings.map((r, i) => {
        const radius = maxRadius - i * (stroke + gap);
        const c = 2 * Math.PI * radius;
        const p = clamp(r.progress);
        const dash = c * p;
        const offset = c - dash;
        return (
          <g key={i}>
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="currentColor"
              strokeWidth={stroke}
              className="text-slate-200/70 dark:text-white/10"
              fill="none"
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={r.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={c}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 600ms ease" }}
            />
          </g>
        );
      })}
      {centerLabel && (
        <foreignObject
          x={size * 0.2}
          y={size * 0.2}
          width={size * 0.6}
          height={size * 0.6}
        >
          <div className="w-full h-full grid place-items-center text-center">
            {centerLabel}
          </div>
        </foreignObject>
      )}
    </svg>
  );
}
