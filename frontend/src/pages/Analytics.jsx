import React, { useMemo } from "react";
import Card from "../components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useTrackerStore } from "../store/useTrackerStore";
import { formatDateKey } from "../lib/utils";
import { addDays } from "date-fns";

export default function Analytics() {
  const { logs, goals } = useTrackerStore();
  const last7 = useMemo(() => getRangeData(logs, 7), [logs]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="font-medium mb-2">Calories (7 days)</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedCalories data={last7} goal={goals.calories} />
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <div className="font-medium mb-2">Water (7 days)</div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="waterMl" fill="#2E90FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

function ComposedCalories({ data }) {
  return (
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="consumed"
        stroke="#16A34A"
        name="Consumed"
      />
      <Line type="monotone" dataKey="burned" stroke="#F97316" name="Burned" />
      <Line type="monotone" dataKey="net" stroke="#3b82f6" name="Net" />
    </LineChart>
  );
}

function getRangeData(logs, days) {
  const out = [];
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  for (let i = 0; i < days; i++) {
    const d = addDays(start, i);
    const key = formatDateKey(d);
    const log = logs[key];
    const consumed = log?.foods?.reduce((s, f) => s + f.calories, 0) || 0;
    const burned = log?.workouts?.reduce((s, w) => s + w.calories, 0) || 0;
    const waterMl = log?.waterMl || 0;
    out.push({
      day: key.slice(5),
      consumed,
      burned,
      net: consumed - burned,
      waterMl,
    });
  }
  return out;
}
