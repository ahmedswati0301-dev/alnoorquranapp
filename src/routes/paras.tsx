import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PARAS } from "@/lib/quran-data";
import { getLastRead, readParas, type LastRead } from "@/lib/settings";

export const Route = createFileRoute("/paras")({
  head: () => ({
    meta: [
      { title: "All 30 Paras — Al-Noor Quran" },
      {
        name: "description",
        content: "Browse all 30 Paras (Juz) of the Holy Quran with Arabic text and Urdu translation.",
      },
      { property: "og:title", content: "All 30 Paras — Al-Noor Quran" },
      {
        property: "og:description",
        content: "Open any Para to read the complete Arabic text with Urdu translation.",
      },
    ],
  }),
  component: ParasPage,
});

function ParasPage() {
  const [read, setRead] = useState<number[]>([]);
  const [lastRead, setLast] = useState<LastRead | null>(null);

  useEffect(() => {
    setRead(readParas());
    setLast(getLastRead());
  }, []);

  const done = read.length === PARAS.length;

  return (
    <AppShell>
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
          The 30 Paras
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {read.length} of 30 completed — choose a Para to begin reading
        </p>
        <div className="gold-rule mx-auto mt-5 h-px w-28" />
      </div>

      {lastRead && (
        <div className="card-premium mt-8 flex flex-col items-center gap-3 p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Last read — Para {lastRead.juz} · {lastRead.surahEnglishName}, Ayah{" "}
            {lastRead.numberInSurah}
          </p>
          <Link
            to="/para/$id"
            params={{ id: String(lastRead.juz) }}
            hash={`ayah-${lastRead.surahNumber}-${lastRead.numberInSurah}`}
            className="btn-primary"
          >
            Continue Reading
          </Link>
        </div>
      )}


      {done && (
        <div className="card-premium mt-8 p-5 text-center">
          <p dir="rtl" className="font-urdu text-lg">
            الحمدللہ، قرآنِ مجید مکمل ہوا
          </p>
          <Link to="/complete" className="btn-primary mt-4">
            View completion dua
          </Link>
        </div>
      )}

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PARAS.map((para) => (
          <li key={para.number}>
            <Link
              to="/para/$id"
              params={{ id: String(para.number) }}
              className="card-premium grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-4"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 font-display text-lg font-semibold text-primary">
                {para.number}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-lg font-semibold tracking-wide">
                  {para.name}
                </span>
                <span dir="rtl" className="mt-0.5 block truncate font-arabic text-sm text-muted-foreground">
                  {para.arabic}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}
