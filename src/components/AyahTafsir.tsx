import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getAyahTafsir } from "@/lib/tafsir.functions";

type TafsirState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; text: string; name: string; author: string; language: string };

export function AyahTafsir({ surah, ayah }: { surah: number; ayah: number }) {
  const fetchTafsir = useServerFn(getAyahTafsir);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<TafsirState>({ status: "idle" });

  const load = async () => {
    setState({ status: "loading" });
    try {
      const res = await fetchTafsir({ data: { surah, ayah } });
      if ("error" in res) setState({ status: "error", message: res.error });
      else
        setState({
          status: "ready",
          text: res.text,
          name: res.name,
          author: res.author,
          language: res.language,
        });
    } catch {
      setState({ status: "error", message: "Could not load Tafsir right now." });
    }
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next && state.status === "idle") void load();
  };

  const isUrdu = state.status === "ready" && state.language?.toLowerCase() === "urdu";

  return (
    <div className="mt-4">
      <button
        onClick={toggle}
        aria-expanded={open}
        className="btn-quiet px-3 py-1 text-xs tracking-wide"
      >
        {open ? "Hide Tafsir" : "Tafsir"}
      </button>

      {open && (
        <div className="card-premium mt-3 p-4">
          {state.status === "loading" && (
            <p className="text-sm text-muted-foreground">Loading Tafsir…</p>
          )}

          {state.status === "error" && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{state.message}</p>
              <button onClick={() => void load()} className="btn-quiet mt-3 px-3 py-1 text-xs">
                Retry
              </button>
            </div>
          )}

          {state.status === "ready" && (
            <>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {state.name}
                {state.author ? ` · ${state.author}` : ""}
              </p>
              <div className="gold-rule mt-3 h-px w-16" />
              <div
                dir={isUrdu ? "rtl" : "ltr"}
                className={
                  isUrdu
                    ? "mt-3 font-urdu text-base leading-[2.6] text-foreground"
                    : "mt-3 text-sm leading-relaxed text-foreground"
                }
                dangerouslySetInnerHTML={{ __html: state.text }}
              />
              <p className="mt-4 text-[11px] text-muted-foreground">
                Source: Quran Foundation (Quran.com) Content API
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
