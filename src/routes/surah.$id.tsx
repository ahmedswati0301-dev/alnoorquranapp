import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AyahTafsir } from "@/components/AyahTafsir";
import { filterAyahs } from "@/lib/ayah-filter";
import { SURAHS } from "@/lib/quran-data";
import { getSurah, type Ayah } from "@/services/quran";
import { useNumberSetting, useTheme } from "@/lib/settings";

export const Route = createFileRoute("/surah/$id")({
  head: ({ params }) => {
    const surah = SURAHS.find((s) => String(s.number) === params.id);
    const title = surah
      ? `Surah ${surah.englishName} (${surah.number}) | Al-Noor Quran`
      : "Surah — Al-Noor Quran";
    const description = surah
      ? `Read Surah ${surah.englishName} — ${surah.meaning} — in Arabic with Urdu translation, ${surah.ayahs} Ayahs.`
      : "Read the Holy Quran in Arabic with Urdu translation.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: SurahReaderPage,
});

function SurahReaderPage() {
  const { id } = Route.useParams();
  const number = Number(id);
  const surah = SURAHS.find((s) => s.number === number);

  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [arabicSize, setArabicSize] = useNumberSetting("arabicSize", 30);
  const [urduSize, setUrduSize] = useNumberSetting("urduSize", 18);
  const [theme, setTheme] = useTheme();
  const [query, setQuery] = useState("");

  const filteredAyahs = useMemo(() => {
    if (!ayahs) return [];
    return filterAyahs(ayahs, query);
  }, [ayahs, query]);

  useEffect(() => {
    if (!surah) return;
    let active = true;
    setAyahs(null);
    setError(null);
    getSurah(number)
      .then((data) => active && setAyahs(data.ayahs))
      .catch((e: Error) => active && setError(e.message || "Could not load this Surah."));
    return () => {
      active = false;
    };
  }, [number, surah, attempt]);

  if (!surah) {
    return (
      <AppShell>
        <p className="text-center text-muted-foreground">This Surah does not exist.</p>
        <div className="mt-6 text-center">
          <Link to="/surahs" className="btn-primary">
            Back to Surahs
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="text-center">
        <p className="text-sm tracking-widest text-muted-foreground uppercase">
          Surah {surah.number} · {surah.revelation} · {surah.ayahs} Ayahs
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-wide text-primary">
          {surah.englishName}
        </h1>
        <p dir="rtl" className="mt-2 font-arabic text-xl">
          {surah.name}
        </p>
        <div className="gold-rule mx-auto mt-4 h-px w-24" />
      </div>

      <div className="card-premium mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 p-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Arabic</span>
          <input
            type="range"
            min={20}
            max={52}
            step={2}
            value={arabicSize}
            onChange={(e) => setArabicSize(Number(e.target.value))}
            className="w-24 accent-primary"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Urdu</span>
          <input
            type="range"
            min={14}
            max={32}
            value={urduSize}
            onChange={(e) => setUrduSize(Number(e.target.value))}
            className="w-24 accent-primary"
          />
        </label>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="btn-quiet">
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      {ayahs && (
        <div className="mt-6">
          <label className="sr-only" htmlFor="ayah-filter">
            Filter Ayahs
          </label>
          <input
            id="ayah-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by Ayah number, Arabic or Urdu text"
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold/70"
          />
        </div>
      )}

      {!ayahs && !error && (
        <p className="mt-16 text-center text-muted-foreground">
          Loading Surah {surah.englishName}…
        </p>
      )}

      {error && (
        <div className="card-premium mt-10 p-6 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
          <button onClick={() => setAttempt((a) => a + 1)} className="btn-primary mt-4">
            Retry
          </button>
        </div>
      )}

      {ayahs && (
        <ol className="mt-8 divide-y divide-border">
          {filteredAyahs.length === 0 ? (
            <li className="py-10 text-center text-sm text-muted-foreground">
              No ayah matches that filter.
            </li>
          ) : (
            filteredAyahs.map((ayah) => (
              <li
                key={ayah.numberInSurah}
                id={`ayah-${surah.number}-${ayah.numberInSurah}`}
                className="scroll-mt-24 py-6"
              >
                <div className="flex items-start justify-end gap-3">
                  <p
                    dir="rtl"
                    className="min-w-0 flex-1 font-arabic leading-[2.3] text-foreground"
                    style={{ fontSize: arabicSize }}
                  >
                    {ayah.arabic}
                  </p>
                  <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/60 text-xs text-muted-foreground">
                    {ayah.numberInSurah}
                  </span>
                </div>
                <p
                  dir="rtl"
                  className="mt-4 font-urdu leading-[2.7] text-muted-foreground"
                  style={{ fontSize: urduSize }}
                >
                  {ayah.urdu}
                </p>
                <AyahTafsir surah={surah.number} ayah={ayah.numberInSurah} />
              </li>
            ))
          )}
        </ol>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {number > 1 && (
          <Link to="/surah/$id" params={{ id: String(number - 1) }} className="btn-quiet">
            ← Surah {number - 1}
          </Link>
        )}
        <Link to="/surahs" className="btn-quiet">
          All Surahs
        </Link>
        {number < 114 && (
          <Link to="/surah/$id" params={{ id: String(number + 1) }} className="btn-quiet">
            Surah {number + 1} →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
