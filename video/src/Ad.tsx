import React from "react";
import {AbsoluteFill, Audio, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {ADS, CTA, type Lang} from "./data";
import {beatsFor, voiceFile} from "./timing";
import manifest from "./audio-manifest.json" with {type: "json"};

/* Beat timings now live in timing.ts and are derived per clip from the real
   measured length of the voice — see the comment there for why. */

const C = {
  bg: "#0b1018", panel: "#121a26", ink: "#fff", dim: "#93a3b8",
  line: "#ffffff1f", accent: "#f4c400", good: "#22c55e", bad: "#ef4444",
};

const FONT = '"Noto Kufi Arabic", -apple-system, "Segoe UI", Roboto, sans-serif';

/* TikTok overlays its own UI on top of the video, and anything under it is
   simply not read. On a 1080x1920 canvas: ~130px of status bar at the top,
   ~320px at the bottom for caption, username and the sound row, and ~120px
   down the right edge for the like / comment / share column.
   The right edge matters most here: Kurdish sets right-to-left, so Kurdish
   text starts exactly where those buttons sit. Horizontal padding is
   symmetric at 130 so both directions clear it. */
const SAFE = {top: 150, side: 130, bottom: 350};

/* Fade-and-rise, driven by a spring so it does not look linear. */
const rise = (frame: number, fps: number, atSec: number) => {
  const s = spring({frame: frame - atSec * fps, fps, config: {damping: 200}});
  return {opacity: s, transform: `translateY(${interpolate(s, [0, 1], [22, 0])}px)`};
};

/* Audio is opt-in and file-driven: drop public/audio/<id>-<lang>.mp3 in and it
   is picked up on the next render. See public/audio/README.md.

   The music bed sits low on purpose — under a voiceover it must not compete,
   and TikTok's own trending sound will usually be layered on top of the whole
   clip anyway. */
const MUSIC_VOLUME = 0.14;

export const Ad: React.FC<{index: number; lang: Lang}> = ({index, lang}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const d = ADS[index];
  const B = beatsFor(d, lang);

  /* Type scales to how much text this clip actually carries. The binding
     constraint is column height against the safe zones, and hand-tuning each
     new hook was already needed twice. Weight is the characters that have to
     fit: question + options + reason. */
  const weight = d.q[lang].length + d.o.reduce((n, o) => n + o[lang].length, 0) + d.why[lang].length;
  const k = weight < 260 ? 1 : weight < 330 ? 0.93 : weight < 400 ? 0.86 : 0.80;
  const px = (n: number) => Math.round(n * k);
  const sayA = voiceFile(d.id, lang, "a");
  const sayB = voiceFile(d.id, lang, "b");
  const rtl = lang === "ku";
  const sec = frame / fps;

  const revealed = sec >= B.reveal;
  const counting = sec >= B.countStart && sec < B.countStart + 3;
  const countN = Math.min(3, Math.max(1, 3 - Math.floor(sec - B.countStart)));
  const kuDigit = ["١", "٢", "٣"][countN - 1];

  const optStyle = (i: number): React.CSSProperties => {
    let bg = C.panel, border = C.line, keyBg = "#ffffff1a", keyInk = C.dim, op = 1;
    if (revealed && i === d.a) { bg = "#14361f"; border = C.good; keyBg = C.good; keyInk = "#04120a"; }
    else if (revealed && i === d.bait) { bg = "#3a1414"; border = C.bad; keyBg = C.bad; keyInk = "#fff"; op = 0.8; }
    return {
      display: "flex", alignItems: "center", gap: 26, background: bg,
      border: `5px solid ${border}`, borderRadius: 30, padding: `${px(26)}px ${px(32)}px`,
      fontSize: px(44), fontWeight: 700, lineHeight: 1.3, opacity: op,
      ...rise(frame, fps, B.opts + i * 0.38),
      // The spring above sets opacity; the reveal dim must survive it.
      ...(revealed ? {opacity: op} : null),
      "--kb": keyBg, "--ki": keyInk,
    } as React.CSSProperties;
  };

  return (
    <AbsoluteFill style={{background: C.bg, fontFamily: FONT, color: C.ink,
      direction: rtl ? "rtl" : "ltr",
      padding: `${SAFE.top}px ${SAFE.side}px ${SAFE.bottom}px`,
      display: "flex", flexDirection: "column", justifyContent: "center", gap: 16}}>

      {/* sayB is wrapped in a Sequence so it cannot start before the answer is
          on screen. Playing both from zero would have the voice give away the
          reveal the timeline is built to delay. */}
      {sayA ? (
        <Sequence from={Math.round(B.sayA * fps)}>
          <Audio src={staticFile(`audio/${sayA}`)} />
        </Sequence>
      ) : null}
      {sayB ? (
        <Sequence from={Math.round(B.sayB * fps)}>
          <Audio src={staticFile(`audio/${sayB}`)} />
        </Sequence>
      ) : null}
      {manifest.music ? (
        <Audio src={staticFile(`audio/${manifest.music}`)} volume={MUSIC_VOLUME} loop />
      ) : null}

      <div style={{position: "absolute", top: 142, [rtl ? "right" : "left"]: SAFE.side,
        fontSize: 36, fontWeight: 800, letterSpacing: 5, color: C.dim}}>TAREEQ</div>

      <div style={{fontSize: px(50), fontWeight: 800, color: C.accent, ...rise(frame, fps, B.hook)}}>
        {d.hook[lang]}
      </div>

      {/* Sign clips carry a picture as well as the text, so their question
          runs a size down. Shrinking every clip to fit the tightest one would
          cost legibility on the five that have room to spare. */}
      <div style={{fontSize: px(66), fontWeight: 800, lineHeight: 1.22, margin: 0}}>
        {d.q[lang]}
      </div>

      {d.sign ? (
        <div style={{alignSelf: "center", width: 250, height: 250, background: "#fff",
          borderRadius: 38, padding: 22, ...rise(frame, fps, B.opts - 0.3)}}>
          <svg viewBox="0 0 100 100" width="100%" height="100%"
            dangerouslySetInnerHTML={{__html: SIGNS[d.sign]}} />
        </div>
      ) : null}

      <div style={{display: "flex", flexDirection: "column", gap: 20, marginTop: 8}}>
        {d.o.map((o, i) => (
          <div key={i} style={optStyle(i)}>
            <span style={{flex: "none", width: px(74), height: px(74), borderRadius: "50%",
              display: "grid", placeItems: "center", fontSize: px(38), fontWeight: 800,
              background: "var(--kb)" as string, color: "var(--ki)" as string}}>
              {"ABC"[i]}
            </span>
            <span>{o[lang]}</span>
          </div>
        ))}
      </div>

      <div style={{fontSize: px(36), lineHeight: 1.35, color: C.dim, marginTop: 6,
        ...rise(frame, fps, B.why)}}>
        {d.why[lang]}
      </div>

      {counting ? (
        <AbsoluteFill style={{display: "grid", placeItems: "center", pointerEvents: "none"}}>
          <div style={{fontSize: 620, fontWeight: 800, color: "#ffffff14", lineHeight: 1}}>
            {rtl ? kuDigit : countN}
          </div>
        </AbsoluteFill>
      ) : null}

      <div style={{textAlign: "center", marginTop: 24, ...rise(frame, fps, B.cta)}}>
        <div style={{fontSize: px(58), fontWeight: 800, color: C.accent}}>{CTA[lang].a}</div>
        <div style={{fontSize: px(36), color: C.dim, marginTop: 10}}>{CTA[lang].b}</div>
      </div>
    </AbsoluteFill>
  );
};
