import React from "react";
import {Composition} from "remotion";
import {Ad, BEATS} from "./Ad";
import {ADS, type Lang} from "./data";

/* Kurdish Sorani needs an Arabic-script face and this machine has none —
   DejaVu covers no Arabic at all, so without bundling one every Kurdish
   glyph renders as a tofu box. Imported from node_modules so the render
   never depends on the network. */
import "@fontsource/noto-kufi-arabic/arabic-400.css";
import "@fontsource/noto-kufi-arabic/arabic-700.css";
import "@fontsource/noto-kufi-arabic/arabic-800.css";

const FPS = 30;
const LANGS: Lang[] = ["ku", "en"];

export const RemotionRoot: React.FC = () => (
  <>
    {ADS.map((ad, index) =>
      LANGS.map((lang) => (
        <Composition
          key={`${ad.id}-${lang}`}
          /* Remotion ids allow a-z A-Z 0-9 and hyphen only — no underscores. */
          id={`${ad.id.replace(/_/g, "-")}-${lang}`}
          component={Ad}
          durationInFrames={Math.round(BEATS.end * FPS)}
          fps={FPS}
          width={1080}
          height={1920}
          defaultProps={{index, lang}}
        />
      ))
    )}
  </>
);
