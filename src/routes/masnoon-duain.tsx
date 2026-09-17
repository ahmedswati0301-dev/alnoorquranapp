import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { DUA_CATEGORIES, type DuaItem } from "@/data/duasFallback";
import { fetchDuas, filterDuasByQuery, getFavoriteDuaIds } from "@/services/duasApi";

export const Route = createFileRoute("/masnoon-duain")({
  head: () => ({
    meta: [
      { title: "Masnoon Duain — Al-Noor Quran" },
      {
        name: "description",
        content: "Rozmarrah zindagi ki masnoon duain with categories, favorites and search.",
      },
    ],
  }),
  component: MasnoonDuainPage,
});

function MasnoonDuainPage() {
  const [duas, setDuas] = useState<DuaItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  useEffect(() => {
    let active = true;

    fetchDuas()
      .then((data) => {
        if (!active) return;
        setDuas(data);
        setFavorites(getFavoriteDuaIds());
      })
      .catch(() => {
        if (!active) return;
        setError("Masnoon Duain could not be loaded right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const allCategories = ["All", ...DUA_CATEGORIES];

  const visibleDuas = useMemo(() => {
    const normalizedDuas = duas.map((dua) => ({
      ...dua,
      isFavorite: favorites.includes(dua.id),
    }));

    const byCategory = category === "All" ? normalizedDuas : normalizedDuas.filter((dua) => dua.category === category);
    const byFavorite = category === "Favorite Duain" ? byCategory.filter((dua) => favorites.includes(dua.id)) : byCategory;
    return filterDuasByQuery(byFavorite, query);
  }, [category, duas, favorites, query]);

  return (
    <AppShell>
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
          Masnoon Duain
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Rozmarrah zindagi ki masnoon duain</p>
        <div className="gold-rule mx-auto mt-5 h-px w-28" />
      </div>

      <section className="card-premium mt-8 p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <label className="sr-only" htmlFor="dua-search">
            Search Masnoon Duain
          </label>
          <input
            id="dua-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, category, Urdu text, or tags"
            className="w-full rounded-md border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold/70"
          />

          <div className="flex flex-wrap gap-2">
            {allCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={
                  item === category ? "btn-primary" : "btn-quiet"
                }
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading && (
        <div className="mt-10 text-center text-sm text-muted-foreground">Loading Masnoon Duain…</div>
      )}

      {!loading && error && (
        <div className="card-premium mt-10 p-6 text-center">
          <p className="text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchDuas()
                .then((data) => {
                  setDuas(data);
                  setFavorites(getFavoriteDuaIds());
                })
                .catch(() => setError("Masnoon Duain could not be loaded right now."))
                .finally(() => setLoading(false));
            }}
            className="btn-primary mt-4"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && visibleDuas.length === 0 && (
        <div className="card-premium mt-10 p-6 text-center">
          <p className="text-sm text-muted-foreground">No duain match your search or category.</p>
        </div>
      )}

      {!loading && !error && visibleDuas.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleDuas.map((dua) => (
            <li key={dua.id}>
              <Link
                to="/masnoon-duain/$id"
                params={{ id: dua.id }}
                className="card-premium block h-full p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {dua.category}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-primary">{dua.title}</h2>
                  </div>
                  <span className="rounded-full border border-gold/60 px-2 py-1 text-xs text-muted-foreground">
                    {favorites.includes(dua.id) ? "★" : "☆"}
                  </span>
                </div>

                <p dir="rtl" className="mt-4 font-arabic text-xl leading-[2.1] text-foreground">
                  {dua.arabic}
                </p>

                <p dir="rtl" className="mt-3 font-urdu text-base leading-[2] text-muted-foreground">
                  {dua.urduTranslation}
                </p>

                <p className="mt-4 text-xs text-muted-foreground">Reference: {dua.reference}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
