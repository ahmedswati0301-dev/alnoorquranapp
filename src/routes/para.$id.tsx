import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { AyahTafsir } from "@/components/AyahTafsir";
import { PARAS } from "@/lib/quran-data";
import { getPara, type Ayah } from "@/services/quran";
import {
  getLastRead,
  readParas,
  setLastRead,
  toggleParaRead,
  useNumberSetting,
  useTheme,
  type LastRead,
} from "@/lib/settings";

export const Route = createFileRoute("/para/$id")({
  head: ({ params }) => {
    const para = PARAS.find((p) => String(p.number) === params.id);
    const title = para ? `Para ${para.number} — ${para.name} | Al-Noor Quran` : "Para — Al-Noor Quran";
    const description = para
      ? `Read Para ${para.number} (${para.name}) of the Holy Quran in Arabic with Urdu translation.`
      : "Read the Holy Quran in Arabic with Urdu translation.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ReaderPage,
});

function ReaderPage() {
  const { id } = Route.useParams();
  const juz = Number(id);
  const navigate = useNavigate();
  const para = PARAS.find((p) => p.number === juz);

  const [ayahs, setAyahs] = useState<Ayah[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [arabicSize, setArabicSize] = useNumberSetting("arabicSize", 30);
  const [urduSize, setUrduSize] = useNumberSetting("urduSize", 18);
  const [theme, setTheme] = useTheme();
  const [read, setRead] = useState<number[]>([]);
  const [lastRead, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    setRead(readParas());
    setLast(getLastRead());
  }, []);

  const markPosition = (
    group: { surahNumber: number; englishName: string },
    ayah: { numberInSurah: number },
  ) => {
    const same =
      lastRead?.juz === juz &&
      lastRead.surahNumber === group.surahNumber &&
      lastRead.numberInSurah === ayah.numberInSurah;
    const next: LastRead | null = same
      ? null
      : {
          juz,
          surahNumber: group.surahNumber,
          numberInSurah: ayah.numberInSurah,
          surahEnglishName: group.englishName,
        };
    setLastRead(next);
    setLast(next);
  };


  useEffect(() => {
    if (!para) return;
    let active = true;
    setAyahs(null);
    setError(null);
    getPara(juz)
      .then((data) => active && setAyahs(data.ayahs))
      .catch((e: Error) => active && setError(e.message || "Could not load this Para."));
    return () => {
      active = false;
    };
  }, [juz, para, attempt]);

  // Content loads asynchronously, so jump to the linked Ayah once it is rendered.
  useEffect(() => {
    if (!ayahs) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ block: "center" });
  }, [ayahs]);

  const groups = useMemo(() => {
    if (!ayahs) return [];
    const out: { surahNumber: number; surahName: string; englishName: string; ayahs: Ayah[] }[] = [];
    for (const a of ayahs) {
      const last = out[out.length - 1];
      if (!last || last.surahNumber !== a.surahNumber) {
        out.push({
          surahNumber: a.surahNumber,
          surahName: a.surahName,
          englishName: a.surahEnglishName,
          ayahs: [a],
        });
      } else {
        last.ayahs.push(a);
      }
    }
    return out;
  }, [ayahs]);

  if (!para) {
    return (
      <AppShell>
        <p className="text-center text-muted-foreground">This Para does not exist.</p>
        <div className="mt-6 text-center">
          <Link to="/paras" className="btn-primary">
            Back to Paras
          </Link>
        </div>
      </AppShell>
    );
  }

  const isRead = read.includes(juz);

  const markRead = () => {
    const next = toggleParaRead(juz);
    setRead(next);
    if (next.length === PARAS.length) navigate({ to: "/complete" });
  };

  return (
    <AppShell>
      <div className="text-center">
        <p className="text-sm tracking-widest text-muted-foreground uppercase">Para {para.number}</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-wide text-primary">
          {para.name}
        </h1>
        <div className="gold-rule mx-auto mt-4 h-px w-24" />
      </div>

      {/* Reading controls */}
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

      {!ayahs && !error && (
        <p className="mt-16 text-center text-muted-foreground">Loading Para {para.number}…</p>
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
        <div className="mt-8 space-y-10">
          {groups.map((group) => (
            <section key={group.surahNumber}>
              <div className="card-premium px-4 py-3 text-center">
                <p dir="rtl" className="font-arabic text-xl">
                  {group.surahName}
                </p>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                  Surah {group.surahNumber} · {group.englishName}
                </p>
              </div>

              <ol className="mt-4 divide-y divide-border">
                {group.ayahs.map((ayah) => {
                  const bookmarked =
                    lastRead?.juz === juz &&
                    lastRead.surahNumber === group.surahNumber &&
                    lastRead.numberInSurah === ayah.numberInSurah;
                  return (
                  <li
                    key={`${group.surahNumber}:${ayah.numberInSurah}`}
                    id={`ayah-${group.surahNumber}-${ayah.numberInSurah}`}
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
                      <span className="flex shrink-0 flex-col items-center gap-2">
                        <span className="mt-1 grid h-7 w-7 place-items-center rounded-full border border-gold/60 text-xs text-muted-foreground">
                          {ayah.numberInSurah}
                        </span>
                        <button
                          onClick={() => markPosition(group, ayah)}
                          aria-label={
                            bookmarked ? "Remove last read position" : "Mark as last read"
                          }
                          title={bookmarked ? "Last read position" : "Mark as last read"}
                          className={
                            bookmarked
                              ? "text-base leading-none text-gold"
                              : "text-base leading-none text-muted-foreground/50 hover:text-gold"
                          }
                        >
                          {bookmarked ? "🔖" : "☆"}
                        </button>
                      </span>
                    </div>
                    <p
                      dir="rtl"
                      className="mt-4 font-urdu leading-[2.7] text-muted-foreground"
                      style={{ fontSize: urduSize }}
                    >
                      {ayah.urdu}
                    </p>
                    <AyahTafsir surah={group.surahNumber} ayah={ayah.numberInSurah} />
                  </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {juz > 1 && (
          <Link to="/para/$id" params={{ id: String(juz - 1) }} className="btn-quiet">
            ← Para {juz - 1}
          </Link>
        )}
        <button onClick={markRead} className={isRead ? "btn-quiet" : "btn-primary"}>
          {isRead ? "Marked as read" : "Mark Para as read"}
        </button>
        {juz < 30 && (
          <Link to="/para/$id" params={{ id: String(juz + 1) }} className="btn-quiet">
            Para {juz + 1} →
          </Link>
        )}
      </div>
    </AppShell>
  );
}
