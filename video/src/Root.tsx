import React from "react";
import {Composition} from "remotion";
import {Ad} from "./Ad";
import {ADS, type Lang} from "./data";
import {FPS, beatsFor} from "./timing";

/* Kurdish Sorani needs an Arabic-script face and this machine has none —
   DejaVu covers no Arabic at all, so without bundling one every Kurdish
   glyph renders as a tofu box. Imported from node_modules so the render
   never depends on the network. */
import "@fontsource/noto-kufi-arabic/arabic-400.css";
import "@fontsource/noto-kufi-arabic/arabic-700.css";
import "@fontsource/noto-kufi-arabic/arabic-800.css";

/* Kurdish only for the voiced batch — the TTS service is Kurdish, and Kurdish
   is the audience. English compositions still render (silently) if wanted. */
const LANGS: Lang[] = ["ku"];

export const RemotionRoot: React.FC = () => (
  <>
    {ADS.map((ad, index) =>
      LANGS.map((lang) => (
        <Composition
          key={`${ad.id}-${lang}`}
          /* Remotion ids allow a-z A-Z 0-9 and hyphen only — no underscores. */
          id={`${ad.id.replace(/_/g, "-")}-${lang}`}
          component={Ad}
          /* Length comes from the voice, not a constant. See timing.ts. */
          durationInFrames={Math.round(beatsFor(ad, lang).end * FPS)}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{index, lang}}
        />
      ))
    )}
  </>
);
