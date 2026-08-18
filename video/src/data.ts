/* The eight highest-hook items from the question bank: the ones where the
   answer most people give is the wrong one. Copied verbatim from
   web/index.html, both languages.

   a    = index of the correct option
   bait = index of the wrong option most people pick, shown in red on reveal
   hook = the stakes line; the reason to keep watching */

export type Lang = "ku" | "en";
export type Txt = Record<Lang, string>;

export type Ad = {
  id: string;
  label: string;
  a: number;
  bait: number;
  sign?: keyof typeof SIGNS;
  hook: Txt;
  q: Txt;
  o: Txt[];
  why: Txt;
};

export const SIGNS = {
  priority:
    '<polygon points="50,6 94,50 50,94 6,50" fill="#ffffff" stroke="#1a1a1a" stroke-width="3"/><polygon points="50,20 80,50 50,80 20,50" fill="#f4c400"/>',
  level_crossing:
    '<polygon points="50,44 78,16 84,22 56,50 84,78 78,84 50,56 22,84 16,78 44,50 16,22 22,16" fill="#c8202a"/><circle cx="50" cy="50" r="4" fill="#ffffff"/>',
  give_way_oncoming:
    '<circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#c8202a" stroke-width="9"/><path d="M38 74 l9 -16 h-5.5 v-24 h-7 v24 h-5.5 z" fill="#1a1a1a"/><path d="M64 26 l7 13 h-4.5 v22 h-5 v-22 h-4.5 z" fill="#c8202a"/>',
};

export const CTA: Record<Lang, { a: string; b: string }> = {
  en: { a: "745 more questions — free", b: "Kurdistan driving theory · link in bio" },
  ku: { a: "٧٤٥ پرسیاری تر — بەخۆڕایی", b: "تیۆریی لێخوڕینی کوردستان · لینک لە بایۆ" },
};

export const ADS: Ad[] = [
  {
    id: "mirrors", label: "Signal or mirrors first?", a: 0, bait: 1,
    hook: { en: "90% of drivers get this wrong", ku: "٩٠٪ ی شۆفێرەکان هەڵە دەکەن" },
    q: { en: "What is the correct order before moving off or changing lane?", ku: "ڕیزبەندیی دروست پێش جووڵان یان گۆڕینی ڕێڕەو چییە؟" },
    o: [
      { en: "Mirrors → blind spot → signal → move", ku: "ئاوێنە ← ناوچەی مردوو ← ئاماژە ← جووڵە" },
      { en: "Signal → mirrors → move", ku: "ئاماژە ← ئاوێنە ← جووڵە" },
      { en: "Move first, signal if anyone is near", ku: "سەرەتا بجووڵێ، ئاماژە بدە ئەگەر کەسێک نزیک بوو" },
    ],
    why: { en: "Look before you announce. Signalling first invites someone to act on a move you have not checked is safe.", ku: "پێش ڕاگەیاندن سەیر بکە. ئاماژەدان لە سەرەتادا کەسێک هان دەدات کارێک بکات لەسەر جووڵەیەک کە هێشتا نەتپشکنیوە سەلامەتە." },
  },
  {
    id: "alley", label: "Speed limit in an alley?", a: 0, bait: 2,
    hook: { en: "Almost nobody knows this one", ku: "بەداخەوە کەس ئەمە نازانێت" },
    q: { en: "Maximum speed in an alley or narrow lane inside a town?", ku: "زۆرترین خێرایی لە کۆڵان یان ڕێگای تەسکی ناو شار چەندە؟" },
    o: [
      { en: "20 km/h", ku: "٢٠ کم/کاتژمێر" },
      { en: "60 km/h", ku: "٦٠ کم/کاتژمێر" },
      { en: "40 km/h", ku: "٤٠ کم/کاتژمێر" },
    ],
    why: { en: "20 km/h — far below the 60 on main streets in the same town. Children play there and sight lines at each corner are almost nil.", ku: "٢٠ کم/کاتژمێر — زۆر خوارتر لە ٦٠ی شەقامە سەرەکییەکانی هەمان شار. منداڵ لەوێ یاری دەکەن و لە هەر سووچێکدا نابینیت." },
  },
  {
    id: "helmet", label: "Remove the helmet?", a: 0, bait: 1,
    hook: { en: "Getting this wrong can paralyse someone", ku: "هەڵەکردن لێرەدا دەتوانێت کەسێک ئیفلیج بکات" },
    q: { en: "A motorcyclist is unconscious after a crash. The helmet should be:", ku: "پاسکیلسوارێکی مۆتۆڕ دوای ڕووداو بێهۆش بووە. کڵاوەکەی دەبێت:" },
    o: [
      { en: "Left on, unless they cannot breathe", ku: "لەسەری بمێنێت، مەگەر نەتوانێت هەناسە بدات" },
      { en: "Removed straight away", ku: "دەستبەجێ لابدرێت" },
      { en: "Loosened and turned around", ku: "شل بکرێت و بسووڕێنرێت" },
    ],
    why: { en: "Removing a helmet can worsen a neck or spine injury. Leave it on unless the airway is blocked.", ku: "لابردنی کڵاو دەتوانێت برینی مل یان بڕبڕەی پشت خراپتر بکات. لەسەری بهێڵە مەگەر ڕێگای هەناسە بەستراوە." },
  },
  {
    id: "burn", label: "How long to cool a burn?", a: 0, bait: 2,
    hook: { en: "Your family does this wrong", ku: "خێزانەکەت بە هەڵە ئەمە دەکات" },
    q: { en: "Best immediate first aid for a minor burn?", ku: "باشترین فریاگوزاریی خێرا بۆ سووتانێکی بچووک چییە؟" },
    o: [
      { en: "Cool under running water 10–15 minutes", ku: "١٠ بۆ ١٥ خولەک لەژێر ئاوی ڕۆیشتوودا" },
      { en: "Put ice directly on it", ku: "ڕاستەوخۆ سەلج بخە سەری" },
      { en: "Rub oil or toothpaste on it", ku: "ڕۆن یان مەعجوونی ددان بمالە پێی" },
    ],
    why: { en: "At least 10 to 15 minutes. A quick rinse is not enough — the heat keeps working deeper after the flame is gone. Ice and creams make it worse.", ku: "لایەنی کەم ١٠ بۆ ١٥ خولەک. شوشتنێکی خێرا بەس نییە — گەرمییەکە دوای کوژانەوەی ئاگرەکەش بەردەوام دەبێت. سەلج و کرێم خراپتری دەکەن." },
  },
  {
    id: "green", label: "Green light, blocked junction", a: 0, bait: 1,
    hook: { en: "Green does not mean go", ku: "سەوز واتای ڕۆیشتن نییە" },
    q: { en: "The light is green but the junction ahead is blocked. What must you do?", ku: "چراکە سەوزە بەڵام یەکتربڕی پێشەوە داخراوە. دەبێت چی بکەیت؟" },
    o: [
      { en: "Wait behind the line until your exit is clear", ku: "لە پشت هێڵەکە بوەستە هەتا دەرچوونەکەت ڕوون دەبێتەوە" },
      { en: "Drive in anyway, the light is green", ku: "بەهەرحاڵ بڕۆ ژوورەوە، چراکە سەوزە" },
      { en: "Sound the horn until it clears", ku: "بۆڕی لێبدە هەتا ڕێگاکە ڕوون دەبێتەوە" },
    ],
    why: { en: "Green permits you to go; it does not promise you room. Enter a blocked junction and you stop every other direction when the lights change.", ku: "سەوز ڕێگەت پێدەدات بڕۆیت؛ بەڵێنی شوێنت پێنادات. ئەگەر بچیتە ناو یەکتربڕێکی داخراو، کاتێک چراکان دەگۆڕێن هەموو ئاراستەکانی تر دەبەستیت." },
  },
  {
    id: "sign_priority", label: "Sign: yellow diamond", a: 0, bait: 1, sign: "priority",
    hook: { en: "Can you name this sign?", ku: "دەتوانیت ناوی ئەم هێمایە بڵێیت؟" },
    q: { en: "What does this sign mean?", ku: "ئەم هێمایە واتای چییە؟" },
    o: [
      { en: "Priority road — others give way to you", ku: "ڕێگای پێشینە — ئەوانی تر ڕێگات دەدەن" },
      { en: "Give way to everyone", ku: "ڕێگا بدە بە هەمووان" },
      { en: "Parking area ahead", ku: "شوێنی پارککردن لە پێشەوە" },
    ],
    why: { en: "The yellow diamond means you are on the priority road. Traffic from side roads must give way to you — but stay alert anyway.", ku: "لۆزەنگە زەردەکە واتای ئەوەیە لەسەر ڕێگای پێشینەیت. هاتوچۆی ڕێگا لاوەکییەکان دەبێت ڕێگات بدەن — بەڵام هەر ئاگادار بە." },
  },
  {
    id: "sign_crossing", label: "Sign: red X", a: 0, bait: 2, sign: "level_crossing",
    hook: { en: "Miss this one and it is fatal", ku: "ئەمە لەبیر بکەیت، مردنە" },
    q: { en: "What does this sign mean?", ku: "ئەم هێمایە واتای چییە؟" },
    o: [
      { en: "Railway level crossing ahead", ku: "پەڕینگەی شەمەندەفەر لە پێشەوە" },
      { en: "Crossroads ahead", ku: "چوارڕیان لە پێشەوە" },
      { en: "Road closed", ku: "ڕێگا داخراوە" },
    ],
    why: { en: "The red St Andrew's cross marks a railway level crossing. Slow down, look both ways, and never stop on the tracks.", ku: "خاچە سوورەکە پەڕینگەی شەمەندەفەر دیاری دەکات. خێرایی کەم بکەرەوە، هەردوولا سەیر بکە، و هەرگیز لەسەر هێڵەکان مەوەستە." },
  },
  {
    id: "sign_narrow", label: "Sign: two arrows", a: 0, bait: 1, sign: "give_way_oncoming",
    hook: { en: "Most people read this backwards", ku: "زۆربەی خەڵک بە پێچەوانە دەیخوێننەوە" },
    q: { en: "You meet this sign at a narrow section. What does it mean?", ku: "ئەم هێمایە لە ڕێگای تەسکدا چی دەڵێت؟" },
    o: [
      { en: "Give way to oncoming traffic", ku: "ڕێگا بدە بە هاتوچۆی بەرامبەر" },
      { en: "You have priority, carry on", ku: "پێشینەت هەیە، بەردەوام بە" },
      { en: "Two-way traffic ahead", ku: "هاتوچۆی دوولا لە پێشەوە" },
    ],
    why: { en: "The red arrow is the one with priority, and it is pointing at you. Wait for the oncoming traffic to clear before entering.", ku: "تیرە سوورەکە پێشینەی هەیە و ڕووی لە تۆیە. چاوەڕێی هاتوچۆی بەرامبەر بکە." },
  },
];
