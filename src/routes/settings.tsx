import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useNumberSetting, useTheme } from "@/lib/settings";

export const APP_VERSION = "1.0.0";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Al-Noor Quran" },
      {
        name: "description",
        content: "Adjust Arabic and Urdu text size, switch between light and dark reading modes.",
      },
      { property: "og:title", content: "Settings — Al-Noor Quran" },
      {
        property: "og:description",
        content: "Reading preferences for Al-Noor Quran.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [arabicSize, setArabicSize] = useNumberSetting("arabicSize", 30);
  const [urduSize, setUrduSize] = useNumberSetting("urduSize", 18);
  const [theme, setTheme] = useTheme();

  return (
    <AppShell>
      <h1 className="font-display text-3xl font-semibold tracking-wide text-primary">Settings</h1>
      <div className="gold-rule mt-4 h-px w-24" />

      <section className="card-premium mt-8 space-y-6 p-5 sm:p-6">
        <div>
          <label className="flex items-center justify-between gap-4 text-sm font-medium">
            <span>Arabic text size</span>
            <span className="text-muted-foreground">{arabicSize}px</span>
          </label>
          <input
            type="range"
            min={20}
            max={52}
            step={2}
            value={arabicSize}
            onChange={(e) => setArabicSize(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
          <p dir="rtl" className="mt-3 font-arabic leading-[2.2]" style={{ fontSize: arabicSize }}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
        </div>

        <div className="border-t border-border pt-6">
          <label className="flex items-center justify-between gap-4 text-sm font-medium">
            <span>Urdu text size</span>
            <span className="text-muted-foreground">{urduSize}px</span>
          </label>
          <input
            type="range"
            min={14}
            max={32}
            step={1}
            value={urduSize}
            onChange={(e) => setUrduSize(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
          <p dir="rtl" className="mt-3 font-urdu leading-[2.6]" style={{ fontSize: urduSize }}>
            شروع الله کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <span className="text-sm font-medium">Appearance</span>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("light")}
              className={theme === "light" ? "btn-primary" : "btn-quiet"}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "btn-primary" : "btn-quiet"}
            >
              Dark
            </button>
          </div>
        </div>
      </section>

      <section className="card-premium mt-6 p-5 sm:p-6">
        <h2 className="font-display text-xl font-semibold tracking-wide">About</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Al-Noor Quran was created to make reading and understanding the Quran easier. It presents
          the complete Arabic text of the Holy Quran with Urdu translation, arranged by the 30 Paras.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Version {APP_VERSION}</p>
      </section>
    </AppShell>
  );
}
