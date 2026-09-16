import { useCallback, useEffect, useState } from "react";

const KEYS = {
  arabicSize: "alnoor:arabicSize",
  urduSize: "alnoor:urduSize",
  theme: "alnoor:theme",
  onboarded: "alnoor:onboarded",
  read: "alnoor:readParas",
  lastRead: "alnoor:lastRead",
};

export type LastRead = {
  juz: number;
  surahNumber: number;
  numberInSurah: number;
  surahEnglishName: string;
};

export function getLastRead(): LastRead | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.lastRead);
    const v = raw ? (JSON.parse(raw) as LastRead) : null;
    return v && v.juz ? v : null;
  } catch {
    return null;
  }
}

export function setLastRead(value: LastRead | null) {
  if (value) localStorage.setItem(KEYS.lastRead, JSON.stringify(value));
  else localStorage.removeItem(KEYS.lastRead);
}

function readNumber(key: string, fallback: number) {
  if (typeof window === "undefined") return fallback;
  const v = Number(localStorage.getItem(key));
  return Number.isFinite(v) && v > 0 ? v : fallback;
}

export function useNumberSetting(key: keyof typeof KEYS, fallback: number) {
  const storageKey = KEYS[key];
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    setValue(readNumber(storageKey, fallback));
  }, [storageKey, fallback]);

  const update = useCallback(
    (next: number) => {
      setValue(next);
      localStorage.setItem(storageKey, String(next));
    },
    [storageKey],
  );

  return [value, update] as const;
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem(KEYS.theme);
    const next = stored === "dark" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  const update = useCallback((next: "light" | "dark") => {
    setTheme(next);
    localStorage.setItem(KEYS.theme, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }, []);

  return [theme, update] as const;
}

export const onboarding = {
  isDone: () => typeof window !== "undefined" && localStorage.getItem(KEYS.onboarded) === "1",
  complete: () => localStorage.setItem(KEYS.onboarded, "1"),
};

export function readParas(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.read);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function toggleParaRead(juz: number): number[] {
  const current = readParas();
  const next = current.includes(juz) ? current.filter((n) => n !== juz) : [...current, juz];
  localStorage.setItem(KEYS.read, JSON.stringify(next));
  return next;
}
