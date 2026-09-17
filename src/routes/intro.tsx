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

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Al-Noor Quran was created with one simple hope — to bring the words of the Quran closer
          to your heart. Read the full Quran in Arabic with clear Urdu translation, Para by Para or
          Surah by Surah, at your own pace and comfort. Whether you are starting your day, seeking
          peace after a long one, or continuing a lifelong habit, let every page you open be a
          source of light, guidance, and tranquility in your life.
        </p>

        <div className="card-premium mx-auto mt-8 max-w-xl p-5 text-center sm:p-6">
          <p className="font-display text-lg tracking-wide text-gold-foreground dark:text-gold">
            Isal-e-Sawab
          </p>
          <p dir="rtl" className="mt-3 font-urdu text-lg leading-[2.6] sm:text-xl">
            یہ قرآنِ پاک کی تلاوت، ترجمہ و تفسیر کا عمل تمام مرحومین و مرحومات، عزیز و اقارب اور
            تمام اہلِ ایمان کی ارواح کو ایصالِ ثواب کی نیت سے پیش کیا جاتا ہے۔ اللہ تعالیٰ اسے اپنی
            بارگاہ میں قبول فرمائے، ہمارے والدین کو صحت، عافیت، ایمان، خوشیوں اور برکتوں بھری لمبی
            عمر عطا فرمائے، ہمیں قرآنِ پاک پڑھنے، اسے سمجھنے اور اس کی تعلیمات پر عمل کرنے کی توفیق
            عطا فرمائے، اور تمام مرحومین کی مغفرت فرما کر ان کے درجات بلند فرمائے۔ آمین یا رب
            العالمین۔
          </p>
          <p dir="rtl" className="mt-4 text-sm tracking-wide text-muted-foreground">
            — طالبِ دعا، کفیل احمد
          </p>
        </div>

        <button onClick={start} className="btn-primary mt-10">
          Continue
        </button>
      </div>
    </div>
  );
}
