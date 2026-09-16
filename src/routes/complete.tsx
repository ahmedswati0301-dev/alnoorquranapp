import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/complete")({
  head: () => ({
    meta: [
      { title: "Quran Completed — Al-Noor Quran" },
      {
        name: "description",
        content: "Alhamdulillah — a dua of acceptance on completing the recitation of the Holy Quran.",
      },
      { property: "og:title", content: "Quran Completed — Al-Noor Quran" },
      {
        property: "og:description",
        content: "A dua of acceptance on completing all 30 Paras of the Holy Quran.",
      },
    ],
  }),
  component: CompletePage,
});

function CompletePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl text-center">
        <div className="gold-rule mx-auto h-px w-28" />
        <h1 dir="rtl" className="mt-8 font-urdu text-2xl leading-[2.4] text-primary sm:text-3xl">
          الحمدللہ، قرآنِ مجید مکمل ہوا
        </h1>
        <p dir="rtl" className="mt-8 font-urdu text-lg leading-[2.8] sm:text-xl">
          اللہ تعالیٰ آپ کی تلاوت اور اس نیک کوشش کو قبول فرمائے۔ یا اللہ! اس تلاوت کا اجر ہمارے
          بزرگوں اور تمام اہلِ ایمان کو پہنچا، ان کی مغفرت فرما، ان کے درجات بلند فرما، اور ہمیں
          قرآنِ مجید کو سمجھنے اور اس پر عمل کرنے کی توفیق عطا فرما۔ آمین یا رب العالمین۔
        </p>
        <div className="gold-rule mx-auto mt-8 h-px w-28" />
        <Link to="/paras" className="btn-primary mt-8">
          Back to Paras
        </Link>
      </div>
    </AppShell>
  );
}
