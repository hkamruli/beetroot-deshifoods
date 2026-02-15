import { useState, useEffect } from "react";

/**
 * Countdown hook that persists end time in localStorage.
 * Resets to `durationMs` if no saved end time or if expired.
 */
export const useCountdown = (durationMs: number = 24 * 60 * 60 * 1000) => {
  const STORAGE_KEY = "countdown_end";

  const getEndTime = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const end = parseInt(saved, 10);
      if (end > Date.now()) return end;
    }
    const end = Date.now() + durationMs;
    localStorage.setItem(STORAGE_KEY, String(end));
    return end;
  };

  const [endTime] = useState(getEndTime);
  const [remaining, setRemaining] = useState(Math.max(0, endTime - Date.now()));

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.max(0, endTime - Date.now());
      setRemaining(r);
      if (r <= 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    isExpired: remaining <= 0,
  };
};
