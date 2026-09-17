import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SURAHS } from "@/lib/quran-data";

export const Route = createFileRoute("/surahs")({
  head: () => ({
    meta: [
      { title: "All 114 Surahs — Al-Noor Quran" },
      {
        name: "description",
        content:
          "Browse all 114 Surahs of the Holy Quran and open any one to read Arabic text with Urdu translation.",
      },
      { property: "og:title", content: "All 114 Surahs — Al-Noor Quran" },
      {
        property: "og:description",
        content: "Search and jump directly to any Surah with Arabic text and Urdu translation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SurahsPage,
});

function SurahsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SURAHS;
    return SURAHS.filter(
      (s) =>
        String(s.number) === q ||
        s.englishName.toLowerCase().includes(q) ||
        s.meaning.toLowerCase().includes(q) ||
        s.name.includes(query.trim()),
    );
  }, [query]);

  return (
    <AppShell>
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
          All 114 Surahs
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search by name or number and jump straight to any Surah
        </p>
        <div className="gold-rule mx-auto mt-5 h-px w-28" />
      </div>

      <div className="mt-8">
        <label className="sr-only" htmlFor="surah-search">
          Search Surahs
        </label>
        <input
          id="surah-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Surah — e.g. Yaseen, Rahman, 36"
          className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold/70"
        />
      </div>

      {results.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No Surah matches that search.
        </p>
      )}

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((surah) => (
          <li key={surah.number}>
            <Link
              to="/surah/$id"
              params={{ id: String(surah.number) }}
              className="card-premium grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 font-display text-lg font-semibold text-primary">
                {surah.number}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-lg font-semibold tracking-wide">
                  {surah.englishName}
                </span>
                <span
                  dir="rtl"
                  className="mt-0.5 block truncate font-arabic text-sm text-muted-foreground"
                >
                  {surah.name}
                </span>
                <span className="mt-1 block truncate text-xs tracking-wide text-muted-foreground">
                  {surah.revelation} · {surah.ayahs} Ayahs
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
