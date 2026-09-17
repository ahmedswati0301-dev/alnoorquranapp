import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { type DuaItem } from "@/data/duasFallback";
import { fetchDuaById, getFavoriteDuaIds, toggleFavoriteDua } from "@/services/duasApi";

export const Route = createFileRoute("/masnoon-duain/$id")({
  component: MasnoonDuaDetailPage,
});

function MasnoonDuaDetailPage() {
  const { id } = Route.useParams();
  const [dua, setDua] = useState<DuaItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchDuaById(id)
      .then((data) => {
        if (!active) return;
        setDua(data);
        setFavoriteIds(getFavoriteDuaIds());
      })
      .catch(() => {
        if (!active) return;
        setError("This dua could not be loaded right now.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const isFavorite = useMemo(() => !!dua && favoriteIds.includes(dua.id), [dua, favoriteIds]);

  const shareDua = async () => {
    if (!dua) return;

    const shareText = `${dua.title}\n\n${dua.arabic}\n\n${dua.urduTranslation}\n\nReference: ${dua.reference}\n\nAl Noor Quran App`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: dua.title,
          text: shareText,
        });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
      }
    } catch {
      // safe fallback: leave UI stable
    }
  };

  if (loading) {
    return (
      <AppShell>
        <p className="text-center text-muted-foreground">Loading dua…</p>
      </AppShell>
    );
  }

  if (error || !dua) {
    return (
      <AppShell>
        <div className="card-premium mx-auto max-w-xl p-6 text-center">
          <p className="text-sm text-muted-foreground">{error ?? "This dua was not found."}</p>
          <Link to="/masnoon-duain" className="btn-primary mt-4">
            Back to Masnoon Duain
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link to="/masnoon-duain" className="btn-quiet">
            ← Back
          </Link>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const nextFavorites = toggleFavoriteDua(dua.id);
                setFavoriteIds(nextFavorites);
              }}
              className={isFavorite ? "btn-primary" : "btn-quiet"}
            >
              {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
            <button type="button" onClick={shareDua} className="btn-quiet">
              Share
            </button>
          </div>
        </div>

        <article className="card-premium p-5 sm:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {dua.category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-wide text-primary">
            {dua.title}
          </h1>

          <div className="mt-6 border-t border-border pt-6">
            <p dir="rtl" className="font-arabic text-3xl leading-[2.2] text-foreground sm:text-4xl">
              {dua.arabic}
            </p>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <p dir="rtl" className="font-urdu text-xl leading-[2] text-muted-foreground sm:text-2xl">
              {dua.urduTranslation}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">Reference</p>
            <p className="mt-2 text-sm text-muted-foreground">{dua.reference}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {dua.sourceType}
            </p>
            {dua.sourceUrl && (
              <a
                href={dua.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-primary underline"
              >
                Source link
              </a>
            )}
          </div>

          {dua.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {dua.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </AppShell>
  );
}
