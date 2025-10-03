import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Trash2 } from "lucide-react";

export default function EntryCard({
  icon,
  title,
  subtitle,
  calories,
  onDelete,
}) {
  return (
    <Card className="p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/10 grid place-items-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        {subtitle && (
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {subtitle}
          </div>
        )}
      </div>
      {typeof calories === "number" && (
        <div className="text-sm tabular-nums">{calories} kcal</div>
      )}
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );
}
