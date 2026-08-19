/* Ten hooks for the voiced batch, drawn verbatim from the question bank in
   ../web/index.html. Selection rule unchanged: the questions where the answer
   most people give is the wrong one, because being wrong is what makes someone
   comment.

   sayA / sayB are the SPOKEN scripts, split deliberately. sayA is the hook and
   question and plays from the start. sayB is the answer, the reason and the
   call to action, and must not begin until the answer is on screen — otherwise
   the voice gives away the reveal the entire timeline exists to delay.
   Every beat after sayA is derived from its real measured audio length; see
   scripts/gen-voice.mjs and Root.tsx.

   The previous eight-hook batch is in git history at 292a68e.

   a    = index of the correct option
   bait = the wrong option most people actually pick; lights red on reveal */

export type Lang = "ku" | "en";
export type Txt = Record<Lang, string>;

export type Ad = {
  id: string; label: string; a: number; bait: number;
  hook: Txt; q: Txt; o: Txt[]; why: Txt;
  sayA: Txt; sayB: Txt;
};

export const CTA: Record<Lang, { a: string; b: string }> = {
  en: { a: "745 more questions — free", b: "Kurdistan driving theory · link in bio" },
  ku: { a: "٧٤٥ پرسیاری تر — بەخۆڕایی", b: "تیۆریی لێخوڕینی کوردستان · لینک لە بایۆ" },
};

export const ADS: Ad[] = [
  {
    id: "night", label: "At night on a two-way road, what is the maxi", a: 0, bait: 1,
    hook: { en: "The rule changes after dark", ku: "شەودا یاساکە دەگۆڕێت" },
    q: { en: "At night on a two-way road, what is the maximum speed?", ku: "بە شەو لەسەر ڕێگایەکی دووئاراستە بەرزترین خێرایی چەندە؟" },
    o: [
      { en: "Half the limit set by law for that road", ku: "نیوەی ئەو سنوورەی یاسا بۆ ئەو ڕێگایە دایناوە" },
      { en: "The same limit as by day", ku: "هەمان سنووری ڕۆژ" },
      { en: "80 km/h on every road", ku: "٨٠ کم/کاتژمێر لەسەر هەموو ڕێگایەک" },
    ],
    why: { en: "Your headlights show far less than daylight does, so the night limit on a two-way road is half the daytime figure.", ku: "لایتەکانت زۆر کەمتر لە ڕووناکی ڕۆژ نیشانت دەدەن، بۆیە سنووری شەو لەسەر ڕێگای دووئاراستە نیوەی ژمارەی ڕۆژە." },
    sayA: { en: "The rule changes after dark. At night on a two-way road, what is the maximum speed?", ku: "شەودا یاساکە دەگۆڕێت. بە شەو لەسەر ڕێگایەکی دووئاراستە بەرزترین خێرایی چەندە؟" },
    sayB: { en: "Half the limit set by law for that road. Your headlights show far less than daylight does, so the night limit on a two-way road is half the daytime figure. 745 more questions, free.", ku: "نیوەی ئەو سنوورەی یاسا بۆ ئەو ڕێگایە دایناوە. لایتەکانت زۆر کەمتر لە ڕووناکی ڕۆژ نیشانت دەدەن، بۆیە سنووری شەو لەسەر ڕێگای دووئاراستە نیوەی ژمارەی ڕۆژە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "instructor", label: "During a driving lesson the learner commits ", a: 0, bait: 1,
    hook: { en: "Who gets the ticket?", ku: "کێ سزا دەدرێت؟" },
    q: { en: "During a driving lesson the learner commits a traffic violation. Who is held responsible?", ku: "لە کاتی وانەی شۆفێریدا فێرخواز سەرپێچییەکی هاتووچۆ دەکات. بەرپرس کێیە؟" },
    o: [
      { en: "The instructor", ku: "ڕاهێنەر" },
      { en: "The learner at the wheel", ku: "ئەو فێرخوازەی لە پشت سوکانەوەیە" },
      { en: "Neither of them", ku: "هیچ کامیان" },
    ],
    why: { en: "While a lesson is running the instructor carries the responsibility for any violation, not the learner driving. That is the point of the instructor sitting alongside with their own controls — they are expected to see it coming and intervene.", ku: "لە کاتی ئەنجامدانی وانەکەدا ڕاهێنەر بەرپرسە لە هەر سەرپێچییەک، نەک ئەو فێرخوازەی لێدەخوڕێت. مەبەست لە دانیشتنی ڕاهێنەر لەتەنیشتی و هەبوونی کۆنترۆڵی تایبەت بە خۆی ئەوەیە کە پێشوەخت بیبینێت و دەستێوەردان بکات." },
    sayA: { en: "Who gets the ticket?. During a driving lesson the learner commits a traffic violation. Who is held responsible?", ku: "کێ سزا دەدرێت؟. لە کاتی وانەی شۆفێریدا فێرخواز سەرپێچییەکی هاتووچۆ دەکات. بەرپرس کێیە؟" },
    sayB: { en: "The instructor. While a lesson is running the instructor carries the responsibility for any violation, not the learner driving. 745 more questions, free.", ku: "ڕاهێنەر. لە کاتی ئەنجامدانی وانەکەدا ڕاهێنەر بەرپرسە لە هەر سەرپێچییەک، نەک ئەو فێرخوازەی لێدەخوڕێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "ambulance", label: "Which number do you call for an ambulance in", a: 0, bait: 1,
    hook: { en: "You need to know this number", ku: "ئەم ژمارەیە دەبێت بزانیت" },
    q: { en: "Which number do you call for an ambulance in the Kurdistan Region?", ku: "بۆ ئەمبولانس لە هەرێمی کوردستان پەیوەندی بە چ ژمارەیەکەوە دەکەیت؟" },
    o: [
      { en: "122", ku: "١٢٢" },
      { en: "115", ku: "١١٥" },
      { en: "104", ku: "١٠٤" },
    ],
    why: { en: "122 is the ambulance. The full official list is 115 civil defence/fire, 188 traffic emergency, 440 traffic police, 104 emergency police and 122 ambulance — and the handbook tells you to call 911 for any sudden emergency.", ku: "١٢٢ ئەمبولانسە. لیستە فەرمییە تەواوەکە بریتییە لە ١١٥ ئاگرکوژێنەوە، ٤٤٠ پۆلیسی هاتوچۆ، ١٠٤ پۆلیسی فریاکەوتن و ١٢٢ فریاگوزاری — و کتێبەکە داوات لێ دەکات لە هەر بارودۆخێکی کتوپڕدا پەیوەندی بە ٩١١ ەوە بکەیت." },
    sayA: { en: "You need to know this number. Which number do you call for an ambulance in the Kurdistan Region?", ku: "ئەم ژمارەیە دەبێت بزانیت. بۆ ئەمبولانس لە هەرێمی کوردستان پەیوەندی بە چ ژمارەیەکەوە دەکەیت؟" },
    sayB: { en: "122. 122 is the ambulance. 745 more questions, free.", ku: "١٢٢. ١٢٢ ئەمبولانسە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "towing", label: "You are towing another car with a rope. What", a: 0, bait: 2,
    hook: { en: "Most people get this one wrong", ku: "زۆربەی خەڵک ئەمە بە هەڵە دەزانن" },
    q: { en: "You are towing another car with a rope. What is the maximum speed?", ku: "بە گوریس ئۆتۆمبیلێکی تر ڕادەکێشیت. زۆرترین خێرایی چەندە؟" },
    o: [
      { en: "30 km/h", ku: "٣٠ کم/کاتژمێر" },
      { en: "50 km/h", ku: "٥٠ کم/کاتژمێر" },
      { en: "The normal limit for the road", ku: "سنووری ئاساییی ڕێگاکە" },
    ],
    why: { en: "Towing on a rope is limited to 30 km/h. Both drivers must hold licences, the rope must be a suitable length with a marker tied in the middle so others can see it, and the hazard lights must be on. Outside a built-up area a broken-down vehicle should go on a recovery truck instead.", ku: "ڕاکێشان بە گوریس بە ٣٠ کم/کاتژمێر سنووردارە. هەردوو شۆفێر دەبێت مۆڵەتیان هەبێت، گوریسەکە دەبێت درێژییەکی گونجاوی هەبێت لەگەڵ نیشانەیەک لە ناوەڕاستیدا تا ئەوانی تر بیبینن، و لایتی ئاگادارکردنەوە دەبێت داگیرسێنرێت. لە دەرەوەی ناوچەی نیشتەجێبوون دەبێت سوارڕۆی پەککەوتوو بە ئۆتۆمبیلی هەڵگرتن ببردرێت." },
    sayA: { en: "Most people get this one wrong. You are towing another car with a rope. What is the maximum speed?", ku: "زۆربەی خەڵک ئەمە بە هەڵە دەزانن. بە گوریس ئۆتۆمبیلێکی تر ڕادەکێشیت. زۆرترین خێرایی چەندە؟" },
    sayB: { en: "30 km/h. Towing on a rope is limited to 30 km/h. 745 more questions, free.", ku: "٣٠ کم/کاتژمێر. ڕاکێشان بە گوریس بە ٣٠ کم/کاتژمێر سنووردارە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "pregnant", label: "How should a pregnant woman wear the seat be", a: 0, bait: 1,
    hook: { en: "A lot of people do this wrong", ku: "زۆر کەس بە هەڵە ئەمە دەکەن" },
    q: { en: "How should a pregnant woman wear the seat belt?", ku: "ژنی دووگیان چۆن دەبێت پشتێنی سەلامەتی ببەستێت؟" },
    o: [
      { en: "The lap strap under the bump, never across it", ku: "بەندی کۆش لە ژێر سکەکەوە، هەرگیز بەسەریدا نا" },
      { en: "She should not wear one", ku: "نابێت پشتێن ببەستێت" },
      { en: "Only the shoulder strap", ku: "تەنها بەندی شان" },
    ],
    why: { en: "The handbook prints a right and a wrong illustration. The belt still protects both mother and baby when positioned correctly.", ku: "کتێبەکە وێنەیەکی ڕاست و هەڵە چاپ دەکات. پشتێنەکە هێشتا هەم دایک و هەم منداڵ دەپارێزێت کاتێک بە دروستی دانرابێت." },
    sayA: { en: "A lot of people do this wrong. How should a pregnant woman wear the seat belt?", ku: "زۆر کەس بە هەڵە ئەمە دەکەن. ژنی دووگیان چۆن دەبێت پشتێنی سەلامەتی ببەستێت؟" },
    sayB: { en: "The lap strap under the bump, never across it. The handbook prints a right and a wrong illustration. 745 more questions, free.", ku: "بەندی کۆش لە ژێر سکەکەوە، هەرگیز بەسەریدا نا. کتێبەکە وێنەیەکی ڕاست و هەڵە چاپ دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "arrow", label: "A traffic light shows a green ARROW rather t", a: 0, bait: 1,
    hook: { en: "A green arrow is not a green light", ku: "تیری سەوز وەک چرای سەوز نییە" },
    q: { en: "A traffic light shows a green ARROW rather than a round green lamp. Who may go?", ku: "چرایەکی هاتوچۆ تیرێکی سەوز پیشان دەدات نەک چرایەکی سەوزی خڕ. کێ دەتوانێت بڕوات؟" },
    o: [
      { en: "Only the traffic travelling in the direction the arrow points", ku: "تەنها ئەو هاتوچۆیەی بەو ئاراستەدا دەڕوات کە تیرەکە پیشانی دەدات" },
      { en: "Everyone at the junction", ku: "هەموو ئەوانەی لە یەکتربڕەکەن" },
      { en: "Only lorries and buses", ku: "تەنها بارهەڵگر و پاسەکان" },
    ],
    why: { en: "A round lamp speaks to every driver at the junction; an arrow speaks only to one direction or one lane. An arrow pointing down applies just to the lane beneath it, so read which lamp is actually yours before moving.", ku: "چرای خڕ قسە لەگەڵ هەموو شۆفێرێکی یەکتربڕەکە دەکات؛ تیر تەنها لەگەڵ یەک ئاراستە یان یەک ڕێڕەو دەدوێت. تیرێکی ڕوو لە خوارەوە تەنها بۆ ئەو ڕێڕەوەیە کە لەژێریدایە، بۆیە پێش جووڵان بزانە کام چرا هی تۆیە." },
    sayA: { en: "A green arrow is not a green light. A traffic light shows a green ARROW rather than a round green lamp. Who may go?", ku: "تیری سەوز وەک چرای سەوز نییە. چرایەکی هاتوچۆ تیرێکی سەوز پیشان دەدات نەک چرایەکی سەوزی خڕ. کێ دەتوانێت بڕوات؟" },
    sayB: { en: "Only the traffic travelling in the direction the arrow points. A round lamp speaks to every driver at the junction; an arrow speaks only to one direction or one lane. 745 more questions, free.", ku: "تەنها ئەو هاتوچۆیەی بەو ئاراستەدا دەڕوات کە تیرەکە پیشانی دەدات. چرای خڕ قسە لەگەڵ هەموو شۆفێرێکی یەکتربڕەکە دەکات؛ تیر تەنها لەگەڵ یەک ئاراستە یان یەک ڕێڕەو دەدوێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "priority", label: "According to the traffic law order of priori", a: 0, bait: 1,
    hook: { en: "Who actually has right of way?", ku: "کێ بە یاسا پێشینەی هەیە؟" },
    q: { en: "According to the traffic law order of priority, right of way belongs to:", ku: "مافی پێشینە بۆ کامیانە؟" },
    o: [
      { en: "A moving vehicle over a stopped one", ku: "ئۆتۆمبیلی جوڵاو بەسەر ئۆتۆمبیلی وەستاو" },
      { en: "A stopped vehicle over a moving one", ku: "ئۆتۆمبیلی وەستاو بەسەر ئۆتۆمبیلی جوڵاو" },
      { en: "A vehicle going downhill over one going uphill", ku: "ئۆتۆمبیلی دابەزیو بەسەر ئۆتۆمبیلی سەرکەوتوو" },
    ],
    why: { en: "The law sets a fixed order: an officer signal first, then a moving vehicle over a stopped one, a main road over a minor one, straight ahead over turning, the vehicle in front over the one behind, uphill over downhill, and rail vehicles over everything.", ku: "بەگشتی ئۆتۆمبیلی جوڵاو پێشینەی هەیە — لەگەڵ پۆرتاڵەکە پشکنینی بکە." },
    sayA: { en: "Who actually has right of way?. According to the traffic law order of priority, right of way belongs to:", ku: "کێ بە یاسا پێشینەی هەیە؟. مافی پێشینە بۆ کامیانە؟" },
    sayB: { en: "A moving vehicle over a stopped one. The law sets a fixed order: an officer signal first, then a moving vehicle over a stopped one, a main road over a minor one,. 745 more questions, free.", ku: "ئۆتۆمبیلی جوڵاو بەسەر ئۆتۆمبیلی وەستاو. بەگشتی ئۆتۆمبیلی جوڵاو پێشینەی هەیە — لەگەڵ پۆرتاڵەکە پشکنینی بکە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "gap", label: "At 30 km/h, how far should you stay behind t", a: 0, bait: 1,
    hook: { en: "Most people guess too close", ku: "زۆربەی خەڵک کەمتر دەڵێن" },
    q: { en: "At 30 km/h, how far should you stay behind the vehicle in front?", ku: "بە خێرایی ٣٠ کم/کاتژمێر چەند دوور لە دوای ئۆتۆمبیلی پێشەوە بمێنیتەوە؟" },
    o: [
      { en: "About 10 metres", ku: "نزیکەی ١٠ مەتر" },
      { en: "About 5 metres", ku: "نزیکەی ٥ مەتر" },
      { en: "About 20 metres", ku: "نزیکەی ٢٠ مەتر" },
    ],
    why: { en: "Roughly ten metres at 30 km/h. The gap grows with speed — the faster you go, the further ahead your stopping point is.", ku: "نزیکەی دە مەتر بە ٣٠ کم/کاتژمێر. بۆشاییەکە لەگەڵ خێراییدا زیاد دەکات — چەند خێراتر بڕۆیت، خاڵی وەستانت دوورترە." },
    sayA: { en: "Most people guess too close. At 30 km/h, how far should you stay behind the vehicle in front?", ku: "زۆربەی خەڵک کەمتر دەڵێن. بە خێرایی ٣٠ کم/کاتژمێر چەند دوور لە دوای ئۆتۆمبیلی پێشەوە بمێنیتەوە؟" },
    sayB: { en: "About 10 metres. Roughly ten metres at 30 km/h. 745 more questions, free.", ku: "نزیکەی ١٠ مەتر. نزیکەی دە مەتر بە ٣٠ کم/کاتژمێر. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "kerb", label: "There is a solid yellow line painted along t", a: 1, bait: 0,
    hook: { en: "What is that yellow line telling you?", ku: "هێڵە زەردەکە چی دەڵێت؟" },
    q: { en: "There is a solid yellow line painted along the kerb where you want to park. Is parking allowed?", ku: "هێڵێکی زەردی بەردەوام لەسەر لێواری ڕێگا هەیە لەو شوێنەی دەتەوێت پارک بکەیت. ئایا پارککردن ڕێگەپێدراوە؟" },
    o: [
      { en: "Yes, park normally", ku: "بەڵێ، بە ئاسایی پارک بکە" },
      { en: "No — a yellow kerb line means no parking", ku: "نەخێر — هێڵی زەردی لێواری ڕێگا واتای قەدەغەی پارککردنە" },
    ],
    why: { en: "A yellow line along the kerb marks a no-parking (or no-stopping) zone.", ku: "هێڵی زەرد لەسەر لێوار ناوچەی قەدەغەی پارککردن (یان ڕاوەستان) دیاری دەکات." },
    sayA: { en: "What is that yellow line telling you?. There is a solid yellow line painted along the kerb where you want to park. Is parking allowed?", ku: "هێڵە زەردەکە چی دەڵێت؟. هێڵێکی زەردی بەردەوام لەسەر لێواری ڕێگا هەیە لەو شوێنەی دەتەوێت پارک بکەیت. ئایا پارککردن ڕێگەپێدراوە؟" },
    sayB: { en: "No — a yellow kerb line means no parking. A yellow line along the kerb marks a no-parking (or no-stopping) zone. 745 more questions, free.", ku: "نەخێر — هێڵی زەردی لێواری ڕێگا واتای قەدەغەی پارککردنە. هێڵی زەرد لەسەر لێوار ناوچەی قەدەغەی پارککردن (یان ڕاوەستان) دیاری دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "unlicensed", label: "The penalty for letting someone without a li", a: 1, bait: 2,
    hook: { en: "You get punished too", ku: "تۆش سزا دەدرێیت" },
    q: { en: "The penalty for letting someone without a licence drive your vehicle is:", ku: "سزای ڕێگەدان بە کەسی بێ مۆڵەت بۆ لێخوڕینی ئۆتۆمبیلەکەت چییە؟" },
    o: [
      { en: "Confiscation of the vehicle", ku: "دەستبەسەرداگرتنی ئۆتۆمبیلەکە" },
      { en: "Imprisonment or a fine, or both", ku: "بەندکردن یان غەرامە، یان هەردووکیان" },
      { en: "Only a warning to the owner", ku: "تەنها ئاگادارکردنەوەی خاوەنەکە" },
    ],
    why: { en: "Letting an unlicensed person drive can bring jail, a fine, or both.", ku: "ڕێگەدان بە کەسی بێ مۆڵەت دەکرێت بەندکردن، غەرامە یان هەردووک لێبکەوێتەوە." },
    sayA: { en: "You get punished too. The penalty for letting someone without a licence drive your vehicle is:", ku: "تۆش سزا دەدرێیت. سزای ڕێگەدان بە کەسی بێ مۆڵەت بۆ لێخوڕینی ئۆتۆمبیلەکەت چییە؟" },
    sayB: { en: "Imprisonment or a fine, or both. Letting an unlicensed person drive can bring jail, a fine, or both. 745 more questions, free.", ku: "بەندکردن یان غەرامە، یان هەردووکیان. ڕێگەدان بە کەسی بێ مۆڵەت دەکرێت بەندکردن، غەرامە یان هەردووک لێبکەوێتەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
];
