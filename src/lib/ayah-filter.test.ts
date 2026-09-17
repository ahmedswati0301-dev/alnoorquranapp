import test from "node:test";
import assert from "node:assert/strict";

import { filterAyahs } from "./ayah-filter";

test("filters ayahs by number and Urdu text content", () => {
  const ayahs = [
    { numberInSurah: 1, arabic: "بِسْمِ", urdu: "شروع اللہ کا نام" },
    { numberInSurah: 2, arabic: "ٱللّٰهِ", urdu: "خداوندِ مہربان" },
    { numberInSurah: 3, arabic: "ٱلرَّحْمَـٰنِ", urdu: "بہت مہربان" },
  ];

  assert.deepEqual(filterAyahs(ayahs, "2"), [ayahs[1]]);
  assert.deepEqual(filterAyahs(ayahs, "مہربان"), [ayahs[1], ayahs[2]]);
  assert.deepEqual(filterAyahs(ayahs, "بسْم"), [ayahs[0]]);
});
