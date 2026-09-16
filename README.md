# Al-Noor Quran

Build a premium, responsive Quran web app called “Al-Noor Quran”.

IMPORTANT: Keep the implementation simple and efficient to minimize Lovable credits. Do not over-engineer or add unnecessary features.

TECH:

- React + Vite + Tailwind CSS

- Vercel-ready

- Web app only

- No backend for V1

- No Android/APK

APP FLOW:

SCREEN 1 — PREMIUM APP NAME

Create a beautiful premium opening screen.

Show the app name prominently:

“Al-Noor Quran”

Use an elegant Islamic visual style with deep green, cream/white and subtle gold accents.

Minimal, classy and premium.

Add a simple “Continue” button.

SCREEN 2 — INTRO + PREMIUM LOGO

Create a second premium welcome screen.

Show a beautiful Islamic “Al-Noor Quran” logo at the top/center.

The logo should be clean, memorable and suitable for a Quran application.

Show:

“بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ”

Then a short introduction:

“This app was created to make reading and understanding the Quran easier, so we can read it more, understand it, and follow its teachings.”

Also include a respectful Isal-e-Sawab message for our elders.

Add “Continue”.

Save onboarding completion in localStorage.

SCREEN 3 — MAIN APP

Design the main Quran screen with a premium UI.

Show all 30 Paras/Juz as the primary navigation.

Do NOT use Surah list as the main screen.

Each Para card:

- Para number

- Para name

- Clean premium design

- Responsive layout

QURAN READER:

When a Para is opened, display:

- Complete Arabic Quran text

- Urdu translation

- Ayah numbers

- RTL support

- Adjustable Arabic/Urdu text size

- Light/Dark mode

- Smooth reading experience

DATA:

Use a reliable Quran API for Arabic Quran + Urdu translation + Juz/Para information.

Never generate, invent or use placeholder Quran text/translation.

Keep API logic in a separate service so it can be replaced later.

Add simple local caching to reduce repeated API calls.

Include proper loading, error and retry states.

SETTINGS:

- Arabic text size

- Urdu text size

- Light/Dark mode

- About

- App version

QURAN COMPLETION SCREEN:

After completing all 30 Paras, show:

“الحمدللہ، قرآنِ مجید مکمل ہوا”

“اللہ تعالیٰ آپ کی تلاوت اور اس نیک کوشش کو قبول فرمائے۔ یا اللہ! اس تلاوت کا اجر ہمارے بزرگوں اور تمام اہلِ ایمان کو پہنچا، ان کی مغفرت فرما، ان کے درجات بلند فرما، اور ہمیں قرآنِ مجید کو سمجھنے اور اس پر عمل کرنے کی توفیق عطا فرما۔ آمین یا رب العالمین۔”

Footer:

“Developed by Kafeel Ahmed”

“Al-Noor Quran”

DESIGN:

Premium Islamic, elegant, minimal and peaceful.

Excellent Arabic and Urdu typography.

Fully responsive on small phones, tablets and desktops.

No overlapping, broken layouts or unnecessary animations.

Keep the Quran content as the main visual focus.

SCALABILITY:

Structure the code cleanly so English translation, audio, tafsir, search, bookmarks and Surah navigation can be added later.

DO NOT BUILD NOW:

- English translation

- Audio

- Tafsir

- User accounts

- Payments

- Android/APK

IMPORTANT:

Keep the codebase clean, reusable and lightweight.

Do not add unnecessary libraries or features.

Build only the V1 requirements above.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://alnoorquran.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/345103c6-636b-4719-82a3-8032d1789cec).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
