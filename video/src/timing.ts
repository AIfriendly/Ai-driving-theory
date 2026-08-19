/* Beats are computed from the real measured length of the voice, not fixed.

   The first batch hard-coded 15s and the voice came back at 24.6s for one
   clip. Rather than trim every script to fit an arbitrary number, the video
   now fits the audio.

   Two things stay fixed because they are the design:
     - the question is on screen in frame one
     - the answer arrives only after a countdown and a beat of silence
   Everything else stretches. */

import manifest from "./audio-manifest.json" with {type: "json"};
import type {Ad, Lang} from "./data";

export const FPS = 30;

const FIXED = {
  hook: 0.4,        // stakes line fades in
  opts: 1.5,        // options start staggering in, 0.38s apart
  countdown: 3.0,   // 3 - 2 - 1, one second each
  silence: 1.2,     // the beat after the countdown, before the answer
  gapAfterSayA: 1.0,// let the question land before the countdown starts
  minReveal: 7.6,   // never reveal earlier than the original design
  whyAfter: 1.4,    // reason appears this long after the answer
  ctaBefore: 2.4,   // call to action sits this long before the end
  tail: 1.4,        // silence after the voice stops, so it does not cut dead
};

export type Beats = {
  hook: number; opts: number; countStart: number;
  reveal: number; why: number; cta: number; end: number;
  sayA: number; sayB: number; lenA: number; lenB: number;
};

const parts = (id: string, lang: Lang) =>
  (manifest.voice as Record<string, {a?: {seconds: number}; b?: {seconds: number}}>)[`${id}-${lang}`];

export const beatsFor = (ad: Ad, lang: Lang): Beats => {
  const p = parts(ad.id, lang);
  const lenA = p?.a?.seconds ?? 0;
  const lenB = p?.b?.seconds ?? 0;

  /* The reveal waits for the spoken question to finish. With no audio it
     falls back to the original 7.6s, so silent renders still work. */
  const reveal = Math.max(FIXED.minReveal, FIXED.hook + lenA + FIXED.gapAfterSayA);
  const end = lenB
    ? reveal + lenB + FIXED.tail
    : Math.max(15, reveal + 7.4);

  return {
    hook: FIXED.hook,
    opts: FIXED.opts,
    countStart: reveal - FIXED.silence - FIXED.countdown,
    reveal,
    why: reveal + FIXED.whyAfter,
    cta: Math.max(reveal + FIXED.whyAfter + 1.2, end - FIXED.ctaBefore),
    end,
    sayA: FIXED.hook,
    sayB: reveal,
    lenA, lenB,
  };
};

export const voiceFile = (id: string, lang: Lang, part: "a" | "b") =>
  parts(id, lang)?.[part]?.file ?? null;
