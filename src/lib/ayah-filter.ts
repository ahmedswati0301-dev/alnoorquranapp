export type AyahFilterable = {
  numberInSurah: number;
  arabic: string;
  urdu: string;
};

export function filterAyahs<T extends AyahFilterable>(items: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((ayah) => {
    const numericMatch = String(ayah.numberInSurah).includes(q);
    const arabicMatch = ayah.arabic.toLowerCase().includes(q);
    const urduMatch = ayah.urdu.toLowerCase().includes(q);
    return numericMatch || arabicMatch || urduMatch;
  });
}
