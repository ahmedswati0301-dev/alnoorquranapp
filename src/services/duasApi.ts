import { DUA_FALLBACK_DATA, type DuaItem } from "@/data/duasFallback";

export const DUAS_STORAGE_KEY = "alnoor:duas-cache:v1";
export const DUAS_FAVORITES_KEY = "alnoor:duas-favorites:v1";
export const DUAS_API_BASE_URL = "";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // best effort cache only
  }
}

export async function fetchDuas(): Promise<DuaItem[]> {
  const cached = readStorage<DuaItem[]>(DUAS_STORAGE_KEY, null);
  if (cached && cached.length) {
    return cached;
  }

  const fallback = DUA_FALLBACK_DATA.map((dua) => ({ ...dua }));
  writeStorage(DUAS_STORAGE_KEY, fallback);
  return fallback;
}

export async function fetchDuaById(id: string): Promise<DuaItem | null> {
  const duas = await fetchDuas();
  return duas.find((dua) => dua.id === id) ?? null;
}

export function getFavoriteDuaIds(): string[] {
  return readStorage<string[]>(DUAS_FAVORITES_KEY, []);
}

export function setFavoriteDuaIds(ids: string[]) {
  writeStorage(DUAS_FAVORITES_KEY, ids);
}

export function toggleFavoriteDua(id: string): string[] {
  const current = getFavoriteDuaIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  setFavoriteDuaIds(next);
  return next;
}

export function filterDuasByQuery(items: DuaItem[], query: string): DuaItem[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return items;

  return items.filter((dua) => {
    const haystack = [
      dua.title,
      dua.category,
      dua.urduTranslation,
      dua.arabic,
      dua.reference,
      ...(dua.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}

export function getDuaCategoryList(): string[] {
  return [
    "Subah ki Duain",
    "Shaam ki Duain",
    "Sone aur Jaagne ki Duain",
    "Khane Peene ki Duain",
    "Ghar mein Dakhil Hone ki Dua",
    "Ghar se Nikalne ki Dua",
    "Safar ki Dua",
    "Masjid ki Duain",
    "Namaz se Mutalliq Duain",
    "Hifazat ki Duain",
    "Pareshani aur Mushkil Waqt ki Duain",
    "Maghfirat ki Duain",
    "Qurani Duain",
    "Rozmarrah ki Duain",
    "Favorite Duain",
  ];
}
