import { createFileRoute, useNavigate } from "@tanstack/react-router";
import logo from "@/assets/al-noor-logo.png";
import { onboarding } from "@/lib/settings";

export const Route = createFileRoute("/intro")({
  head: () => ({
    meta: [
      { title: "Welcome — Al-Noor Quran" },
      {
        name: "description",
        content:
          "Why Al-Noor Quran was created: to make reading and understanding the Quran easier for everyone.",
      },
      { property: "og:title", content: "Welcome — Al-Noor Quran" },
      {
        property: "og:description",
        content: "An introduction to Al-Noor Quran and an Isal-e-Sawab for our elders.",
      },
    ],
  }),
  component: Intro,
});

function Intro() {
  const navigate = useNavigate();

  const start = () => {
    onboarding.complete();
    navigate({ to: "/paras" });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-14">
      <div className="w-full max-w-2xl text-center">
        <img
          src={logo}
          alt="Al-Noor Quran logo"
          width={816}
          height={816}
          className="mx-auto h-28 w-28 sm:h-32 sm:w-32"
        />
        <h1 className="mt-5 font-display text-3xl font-semibold tracking-wide text-primary sm:text-4xl">
          Al-Noor Quran
        </h1>

        <div className="gold-rule mx-auto mt-7 h-px w-40" />

        <p dir="rtl" className="mt-7 font-arabic text-2xl leading-[2.4] sm:text-3xl">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground">
          This app was created to make reading and understanding the Quran easier, so we can read it
          more, understand it, and follow its teachings.
        </p>

        <div className="card-premium mx-auto mt-8 max-w-xl p-5 text-center sm:p-6">
          <p className="font-display text-lg tracking-wide text-gold-foreground dark:text-gold">
            Isal-e-Sawab
          </p>
          <p dir="rtl" className="mt-3 font-urdu text-lg leading-[2.6] sm:text-xl">
            یہ تلاوت ہمارے تمام مرحومین بزرگوں اور اہلِ ایمان کے نام۔ اللہ تعالیٰ اس کا اجر ان کو
            پہنچائے، ان کی مغفرت فرمائے اور ان کے درجات بلند فرمائے۔ آمین۔
          </p>
        </div>

        <button onClick={start} className="btn-primary mt-10">
          Continue
        </button>
      </div>
    </div>
  );
}
