/* Sign artwork for the clips that ask about a sign.

   Copied verbatim from the SIGNS table in ../../web/index.html (the `svg`
   inner markup, with its <svg> wrapper stripped — Ad.tsx supplies its own,
   sized to the card). Kept as a literal rather than imported, because the web
   app is a single 2 MB HTML file with no module boundary to import from, and
   a render must not depend on parsing it.

   To add another sign, take SIGNS.<key>.svg from web/index.html and drop the
   outer <svg viewBox="0 0 100 100" role="img"> … </svg> wrapper. The colours
   there are literals already, so nothing else has to come across. */

export const SIGNS: Record<string, string> = {
  /* Dangerous bends, with the advisory-speed plate beneath. Red-bordered
     warning triangle — the white fill needs the white card behind it, which
     is what Ad.tsx draws. */
  bends:
    '<polygon points="50,6 90,68 10,68" fill="#ffffff" stroke="#c8202a" stroke-width="7"/>' +
    '<path d="M44 62 q-6 -10 5 -14 q11 -4 4 -18" fill="none" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>' +
    '<polygon points="53,18 47,30 59,29" fill="#1a1a1a"/>' +
    '<rect x="31" y="74" width="38" height="19" rx="3" fill="#ffffff" stroke="#1a1a1a" stroke-width="2"/>' +
    '<text x="50" y="88" text-anchor="middle" font-size="14" font-weight="800" fill="#1a1a1a" font-family="sans-serif">45</text>',
};
