/**
 * Quran data service (alquran.cloud).
 * All network access lives here so the provider can be swapped later
 * (English translation, tafsir, audio can be added as extra editions).
 */

const API = "https://api.alquran.cloud/v1";
export const ARABIC_EDITION = "quran-uthmani";
export const URDU_EDITION = "ur.jalandhry";

export type Ayah = {
  numberInSurah: number;
  arabic: string;
  urdu: string;
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
};

export type ParaContent = {
  juz: number;
  ayahs: Ayah[];
};

type ApiAyah = {
  numberInSurah: number;
  text: string;
  surah: { number: number; name: string; englishName: string };
};

const cacheKey = (juz: number) => `alnoor:juz:${juz}:v1`;

function readCache(juz: number): ParaContent | null {
  try {
    const raw = localStorage.getItem(cacheKey(juz));
    return raw ? (JSON.parse(raw) as ParaContent) : null;
  } catch {
    return null;
  }
}

function writeCache(juz: number, data: ParaContent) {
  try {
    localStorage.setItem(cacheKey(juz), JSON.stringify(data));
  } catch {
    /* quota exceeded — caching is best effort */
  }
}

async function fetchEdition(juz: number, edition: string): Promise<ApiAyah[]> {
  const res = await fetch(`${API}/juz/${juz}/${edition}`);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const json = await res.json();
  if (!json?.data?.ayahs?.length) throw new Error("No data received");
  return json.data.ayahs as ApiAyah[];
}

export async function getPara(juz: number): Promise<ParaContent> {
  const cached = readCache(juz);
  if (cached) return cached;

  const [arabic, urdu] = await Promise.all([
    fetchEdition(juz, ARABIC_EDITION),
    fetchEdition(juz, URDU_EDITION),
  ]);

  const data: ParaContent = {
    juz,
    ayahs: arabic.map((a, i) => ({
      numberInSurah: a.numberInSurah,
      arabic: a.text.replace(/^\uFEFF/, ""),
      urdu: urdu[i]?.text ?? "",
      surahNumber: a.surah.number,
      surahName: a.surah.name,
      surahEnglishName: a.surah.englishName,
    })),
  };

  writeCache(juz, data);
  return data;
}
