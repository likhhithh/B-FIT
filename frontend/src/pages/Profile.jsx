import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTrackerStore } from "../store/useTrackerStore";
import { useTheme } from "../hooks/useTheme";

export default function Profile() {
  const { units, setUnits, profile, setProfile } = useTrackerStore();
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="p-4">
        <div className="font-medium mb-3">Preferences</div>
        <div className="grid gap-3">
          <Row label="Theme">
            <select
              className="h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </Row>

          <Row label="Body weight (kg)">
            <input
              type="number"
              min={20}
              max={300}
              className="h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
              value={profile.weightKg}
              onChange={(e) => setProfile({ weightKg: Number(e.target.value) })}
            />
          </Row>

          <Row label="Water Units">
            <select
              className="h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
              value={units.water}
              onChange={(e) => setUnits({ water: e.target.value })}
            >
              <option value="ml">ml</option>
              <option value="oz">oz</option>
            </select>
          </Row>

          <Row label="Weight Units">
            <select
              className="h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent"
              value={units.weight}
              onChange={(e) => setUnits({ weight: e.target.value })}
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </Row>
        </div>
      </Card>

      <Card className="p-4">
        <div className="font-medium mb-2">Data</div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          Local-only demo. Connect your backend to sync across devices.
        </div>
        <Button
          className="mt-3"
          variant="destructive"
          onClick={() => {
            localStorage.removeItem("fittrack-store");
            window.location.reload();
          }}
        >
          Clear Local Data
        </Button>
      </Card>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="grid grid-cols-3 items-center gap-3">
      <div className="text-sm">{label}</div>
      <div className="col-span-2">{children}</div>
    </div>
  );
}
