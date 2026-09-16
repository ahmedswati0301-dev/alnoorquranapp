import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { onboarding } from "@/lib/settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al-Noor Quran — Read the Holy Quran by Para" },
      {
        name: "description",
        content:
          "Al-Noor Quran: a peaceful, premium way to read the complete Holy Quran by Para with Urdu translation.",
      },
      { property: "og:title", content: "Al-Noor Quran" },
      {
        property: "og:description",
        content: "Read the complete Holy Quran by Para with Urdu translation.",
      },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    if (onboarding.isDone()) navigate({ to: "/paras", replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-16 text-center">
      <div className="w-full max-w-xl">
        <p className="font-arabic text-lg text-gold sm:text-xl">القرآن الكريم</p>
        <div className="gold-rule mx-auto mt-6 h-px w-32" />
        <h1 className="mt-8 font-display text-5xl leading-tight font-semibold tracking-wide text-primary sm:text-6xl">
          Al-Noor Quran
        </h1>
        <p className="mt-4 font-display text-lg text-muted-foreground italic">
          Light upon light — read, understand, and follow.
        </p>
        <div className="gold-rule mx-auto mt-8 h-px w-32" />
        <div className="mt-10">
          <Link to="/intro" className="btn-primary">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
