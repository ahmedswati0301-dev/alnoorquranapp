import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Tafsir from the official Quran Foundation (Quran.com) Content API.
 * All network access stays on the server so request details and any future
 * credentials never reach the browser bundle.
 */

const CONTENT_API = "https://api.quran.com/api/v4";

// Urdu Tafsir Ibn Kathir matches the app's Urdu translation.
const TAFSIR_ID = 160;

type TafsirResponse = {
  tafsir?: {
    text?: string;
    resource_name?: string;
    translated_name?: { name?: string; language_name?: string };
  };
};

export const getAyahTafsir = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z
      .object({ surah: z.number().int().min(1).max(114), ayah: z.number().int().min(1) })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const verseKey = `${data.surah}:${data.ayah}`;
    try {
      const res = await fetch(`${CONTENT_API}/tafsirs/${TAFSIR_ID}/by_ayah/${verseKey}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Tafsir request failed (${res.status})`);

      const json = (await res.json()) as TafsirResponse;
      const text = json.tafsir?.text?.trim();
      if (!text) return { error: "No Tafsir available for this Ayah." as string } as const;

      return {
        text,
        name: json.tafsir?.resource_name ?? "Tafsir Ibn Kathir",
        author: "Hafiz Ibn Kathir",
        language: json.tafsir?.translated_name?.language_name ?? "urdu",
      } as const;
    } catch (e) {
      console.error("Tafsir fetch failed", e);
      return { error: "Could not load Tafsir right now." as string } as const;
    }
  });
