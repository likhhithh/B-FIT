import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { searchExercises } from "../../lib/workout";
import { ChevronDown } from "lucide-react";

export default function ExerciseSearch({
  onSelect,
  placeholder = "Search exercises...",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const debounced = useDebounce(query, 200);
  const ref = useRef(null);

  useEffect(() => {
    setResults(searchExercises(debounced));
  }, [debounced]);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center">
        <input
          className="w-full h-10 px-3 rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-transparent outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <ChevronDown className="w-4 h-4 -ml-7 text-slate-500 pointer-events-none" />
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-20 mt-2 w-full bg-white dark:bg-[#0F172A] border border-slate-200/70 dark:border-white/10 rounded-lg shadow-lg max-h-64 overflow-auto">
          {results.map((e) => (
            <button
              type="button"
              key={e.id}
              className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5"
              onClick={() => {
                onSelect?.(e);
                setQuery(e.name);
                setOpen(false);
              }}
            >
              <div className="font-medium">{e.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                MET {e.met}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
