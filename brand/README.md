# Brand assets

TikTok / social profile pictures, 1024×1024 PNG. Built from the steering-wheel
mark already in `web/index.html` (`.logo` svg) so the account, the app and the
URL read as one thing — do not invent a second mark.

| File | Scheme | Note |
|---|---|---|
| `pfp-a.png` | deep blue `#0f5f86` + white | the app's `--brand`; calm, official |
| `pfp-b.png` | amber `#e29b00` + dark `#161b26` | the app's `--accent`; **recommended** |
| `pfp-c.png` | dark + amber | weakest at 40px, merges into a dark feed |

**B is recommended because TikTok's UI is dark.** At 40px in a feed — the only
size that decides whether anyone notices you — a bright amber disc separates
from the background where the blue and dark ones sink into it. Judge these at
40px, never at full size.

The mark sits inside an 80% safe circle, so the circular crop every platform
applies never clips it.

Regenerate: `node generate.mjs` (needs `playwright-core`; use
`executablePath:'/opt/pw-browsers/chromium'`, never `playwright install`).
