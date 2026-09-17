import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "@/assets/al-noor-logo.png";

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3">
          <Link to="/paras" className="flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt="Al-Noor Quran logo"
              width={816}
              height={816}
              loading="lazy"
              className="h-9 w-9 shrink-0"
            />
            <span className="truncate font-display text-xl font-semibold tracking-wide">
              Al-Noor Quran
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-2 text-sm">
            <Link to="/paras" className="btn-quiet">
              پارے
            </Link>
            <Link to="/surahs" className="btn-quiet">
              سورتیں
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/masnoon-duain" className="btn-quiet">
                <span aria-hidden="true">✦</span>
                <span>مسنون دعا</span>
              </Link>
              <Link to="/settings" className="btn-quiet">
                ترتیبات
              </Link>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
              className="btn-quiet flex items-center justify-center p-2 sm:hidden"
            >
              ☰
            </button>
          </nav>
        </div>

        {menuOpen && (
          <div className="border-t border-border/70 bg-background/95 px-4 py-3 sm:hidden">
            <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-2 text-sm">
              <Link to="/masnoon-duain" className="btn-quiet justify-center" onClick={() => setMenuOpen(false)}>
                <span aria-hidden="true">✦</span>
                <span>مسنون دعا</span>
              </Link>
              <Link to="/settings" className="btn-quiet justify-center" onClick={() => setMenuOpen(false)}>
                ترتیبات
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-10">{children}</main>

      <AppFooter />
    </div>
  );
}

export function AppFooter() {
  return (
    <footer className="mt-8 border-t border-border/70 py-6 text-center">
      <div className="gold-rule mx-auto mb-4 h-px w-24" />
      <p className="font-display text-base tracking-wide">Al-Noor Quran</p>
      <p className="mt-1 text-sm text-muted-foreground">Developed by Kafeel Ahmed</p>
    </footer>
  );
}
