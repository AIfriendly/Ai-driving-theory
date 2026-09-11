/* Twenty hooks across two voiced batches, drawn verbatim from the question
   bank in ../web/index.html. Selection rule unchanged: the questions where the
   answer most people give is the wrong one, because being wrong is what makes
   someone comment.

   sayA / sayB are the SPOKEN scripts, split deliberately. sayA is the hook and
   question and plays from the start. sayB is the answer, the reason and the
   call to action, and must not begin until the answer is on screen — otherwise
   the voice gives away the reveal the entire timeline exists to delay.
   Every beat after sayA is derived from its real measured audio length; see
   scripts/gen-voice.mjs and Root.tsx.

   The previous eight-hook batch is in git history at 292a68e.

   Batch two picks from a different corner of the bank on purpose: first aid,
   the vehicle itself and the two rules people argue about (roundabout
   signalling, and whether an advisory speed is a limit). Ten more clips on
   speed limits would have competed with the ten already posted.

   a    = index of the correct option
   bait = the wrong option most people actually pick; lights red on reveal */

export type Lang = "ku" | "en";
export type Txt = Record<Lang, string>;

export type Ad = {
  id: string; label: string; a: number; bait: number;
  /* One line naming what this clip is ABOUT, not what it says. It exists so
     the next batch can be checked against every previous one — the question
     bank contains near-duplicates of its own (two pregnancy seat-belt
     questions, three about a motorcyclist's helmet), so "pick something new"
     is not something to eyeball. scripts/check-topics.mjs enforces it. */
  topic: string;
  hook: Txt; q: Txt; o: Txt[]; why: Txt;
  sayA: Txt; sayB: Txt;
  /* Key into SIGNS in ./signs.ts. Set it and the clip draws the sign on a
     white card between the question and the options — worth it only when the
     question is about the sign, because the card costs 250px of column. */
  sign?: string;
};

export const CTA: Record<Lang, { a: string; b: string }> = {
  en: { a: "745 more questions — free", b: "Kurdistan driving theory · link in bio" },
  ku: { a: "٧٤٥ پرسیاری تر — بەخۆڕایی", b: "🔗 t.tareeq.workers.dev" },
};

export const ADS: Ad[] = [
  {
    id: "night", topic: "Night speed limit on a two-way road", label: "At night on a two-way road, what is the maxi", a: 0, bait: 1,
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
    id: "instructor", topic: "Who is liable during a driving lesson", label: "During a driving lesson the learner commits ", a: 0, bait: 1,
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
    id: "ambulance", topic: "Ambulance emergency number", label: "Which number do you call for an ambulance in", a: 0, bait: 1,
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
    id: "towing", topic: "Speed limit when towing on a rope", label: "You are towing another car with a rope. What", a: 0, bait: 2,
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
    id: "pregnant", topic: "How a pregnant woman wears the seat belt", label: "How should a pregnant woman wear the seat be", a: 0, bait: 1,
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
    id: "arrow", topic: "Green arrow vs round green lamp", label: "A traffic light shows a green ARROW rather t", a: 0, bait: 1,
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
    id: "priority", topic: "Order of priority in the traffic law", label: "According to the traffic law order of priori", a: 0, bait: 1,
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
    id: "gap", topic: "Following distance at 30 km/h", label: "At 30 km/h, how far should you stay behind t", a: 0, bait: 1,
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
    id: "kerb", topic: "Yellow kerb line and parking", label: "There is a solid yellow line painted along t", a: 1, bait: 0,
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
    id: "unlicensed", topic: "Penalty for lending a car to an unlicensed driver", label: "The penalty for letting someone without a li", a: 1, bait: 2,
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

  /* ---- batch two ---- */

  {
    id: "hangover", topic: "Alcohol still in the blood the next morning", label: "You drank a lot last night. Can you drive to ", a: 0, bait: 1,
    hook: { en: "Sleeping it off is a myth", ku: "خەوتن مەی دەرناکات" },
    q: { en: "You drank a lot last night. Can you drive to work in the morning?", ku: "دوێنێ شەو زۆرت خواردەوە. بەیانی دەتوانیت بۆ کار لێبخوڕیت؟" },
    o: [
      { en: "Not necessarily — alcohol can still be in your blood", ku: "بەپێویست نا — لەوانەیە مەی هێشتا لە خوێنتدا بێت" },
      { en: "Yes, a night's sleep always clears it", ku: "بەڵێ، خەوی شەوێک هەمیشە پاکی دەکاتەوە" },
      { en: "Yes, as long as you feel fine", ku: "بەڵێ، تا هەست بە باشی دەکەیت" },
    ],
    why: { en: "Your body removes alcohol at a fixed slow rate — sleep, a shower and coffee change nothing. You can be over the limit at breakfast and feel completely normal.", ku: "جەستەت مەی بە ڕێژەیەکی هێواشی جێگیر دەردەکات — خەو و سەرشۆر و قاوە هیچ ناگۆڕن. دەکرێت لە کاتی نانی بەیانیدا لە سنوور تێپەڕاندبیت و بە تەواوی هەست بە ئاسایی بکەیت." },
    sayA: { en: "Sleeping it off is a myth. You drank a lot last night. Can you drive to work in the morning?", ku: "خەوتن مەی دەرناکات. دوێنێ شەو زۆرت خواردەوە. بەیانی دەتوانیت بۆ کار لێبخوڕیت؟" },
    sayB: { en: "Not necessarily — alcohol can still be in your blood. Your body removes alcohol at a fixed slow rate, and sleep, a shower and coffee change nothing. 745 more questions, free.", ku: "بەپێویست نا — لەوانەیە مەی هێشتا لە خوێنتدا بێت. جەستەت مەی بە ڕێژەیەکی هێواشی جێگیر دەردەکات، و خەو و سەرشۆر و قاوە هیچ ناگۆڕن. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "helmet", topic: "Removing an unconscious motorcyclist's helmet", label: "A motorcyclist is injured and unconscious. Th", a: 0, bait: 1,
    hook: { en: "Taking it off can kill them", ku: "لابردنی دەتوانێت بیکوژێت" },
    q: { en: "A motorcyclist is injured and unconscious. Their crash helmet should be:", ku: "پاسکیلسوارێکی مۆتۆڕ بریندار و بێهۆش بووە. کڵاوی پاراستنەکەی دەبێت:" },
    o: [
      { en: "Left on, unless they cannot breathe", ku: "لەسەری بمێنێت، مەگەر نەتوانێت هەناسە بدات" },
      { en: "Removed straight away", ku: "دەستبەجێ لابدرێت" },
      { en: "Loosened and turned around", ku: "شل بکرێت و بسووڕێنرێت" },
    ],
    why: { en: "Taking a helmet off means moving the head and neck, which is exactly what you are trying to avoid. Leave it on unless the airway is blocked, and let the crew trained to do it as a pair take it off.", ku: "لابردنی کڵاو واتە جووڵاندنی سەر و مل، کە بەڕاست ئەوەیە دەتەوێت ڕێگری لێبکەیت. لەسەری بهێڵە مەگەر ڕێگای هەناسە بەستراوە، و با ئەو تیمە لایبەرێت کە فێرکراوە بە دووان بیکات." },
    sayA: { en: "Taking it off can kill them. A motorcyclist is injured and unconscious. Their crash helmet should be:", ku: "لابردنی دەتوانێت بیکوژێت. پاسکیلسوارێکی مۆتۆڕ بریندار و بێهۆش بووە. کڵاوی پاراستنەکەی دەبێت چی لێبکرێت؟" },
    sayB: { en: "Left on, unless they cannot breathe. Taking a helmet off means moving the head and neck, which is exactly what you are trying to avoid. 745 more questions, free.", ku: "لەسەری بمێنێت، مەگەر نەتوانێت هەناسە بدات. لابردنی کڵاو واتە جووڵاندنی سەر و مل، کە بەڕاست ئەوەیە دەتەوێت ڕێگری لێبکەیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "childseat", topic: "Where a child under 13 must sit", label: "Where must a child under 13 travel in a car?", a: 0, bait: 1,
    hook: { en: "Not in the front seat", ku: "لە کورسی پێشەوە نا" },
    q: { en: "Where must a child under 13 travel in a car?", ku: "منداڵی خوار ١٣ ساڵ دەبێت لە کوێی ئۆتۆمبیلدا دابنیشێت؟" },
    o: [
      { en: "In the rear seat, in a child seat matched to their weight", ku: "لە کورسی دواوە، لە کورسییەکی منداڵدا کە لەگەڵ کێشیدا بگونجێت" },
      { en: "In the front seat, so the driver can watch them", ku: "لە کورسی پێشەوە، تا شۆفێر چاودێریان بکات" },
      { en: "Anywhere, as long as they wear the adult seat belt", ku: "لە هەر شوێنێک، بەمەرجێک پشتێنی گەورەکان ببەستێت" },
    ],
    why: { en: "Below 13 the child sits in the back, in a seat chosen by weight. An adult belt alone does not fit a small body and can injure them in a crash.", ku: "لە خوار ١٣ ساڵ منداڵ لە دواوە دادەنیشێت، لە کورسییەکدا کە بەپێی کێش هەڵبژێردراوە. پشتێنی گەورەکان بە تەنها لەگەڵ لەشی بچووکدا ناگونجێت و لە ڕووداودا دەتوانێت بریندارییان بکات." },
    sayA: { en: "Not in the front seat. Where must a child under 13 travel in a car?", ku: "لە کورسی پێشەوە نا. منداڵی خوار ١٣ ساڵ دەبێت لە کوێی ئۆتۆمبیلدا دابنیشێت؟" },
    sayB: { en: "In the rear seat, in a child seat matched to their weight. An adult belt alone does not fit a small body and can injure them in a crash. 745 more questions, free.", ku: "لە کورسی دواوە، لە کورسییەکی منداڵدا کە لەگەڵ کێشیدا بگونجێت. پشتێنی گەورەکان بە تەنها لەگەڵ لەشی بچووکدا ناگونجێت و لە ڕووداودا دەتوانێت بریندارییان بکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "glass", topic: "Embedded glass in a wound", label: "A large piece of glass is embedded deep in a", a: 0, bait: 1,
    hook: { en: "Do not pull it out", ku: "ڕایمەکێشە دەرەوە" },
    q: { en: "A large piece of glass is embedded deep in a wound. What do you do?", ku: "پارچەیەکی گەورەی شووشە بە قووڵی چووەتە ناو برینێک. چی دەکەیت؟" },
    o: [
      { en: "Leave it in place and press around it", ku: "لە جێی خۆی بیهێڵەرەوە و بە دەوریدا پەستان بدە" },
      { en: "Pull it straight out", ku: "ڕاستەوخۆ ڕایبکێشە دەرەوە" },
      { en: "Push it in further to seal the wound", ku: "زیاتر پاڵی پێوەبنێ تا برینەکە دابخات" },
    ],
    why: { en: "The object is partly plugging the wound; pulling it out opens the bleeding wide and can tear more tissue on the way. Pad around it and let the hospital remove it.", ku: "شتەکە بەشێک لە برینەکە دادەخات؛ ڕاکێشانی دەرەوە خوێنبەربوونەکە فراوان دەکاتەوە و دەتوانێت لە ڕێگادا شانەی زیاتر بدڕێنێت. بە دەوریدا داپۆشە و با نەخۆشخانە لایبەرێت." },
    sayA: { en: "Do not pull it out. A large piece of glass is embedded deep in a wound. What do you do?", ku: "ڕایمەکێشە دەرەوە. پارچەیەکی گەورەی شووشە بە قووڵی چووەتە ناو برینێک. چی دەکەیت؟" },
    sayB: { en: "Leave it in place and press around it. The object is partly plugging the wound; pulling it out opens the bleeding wide and can tear more tissue on the way. 745 more questions, free.", ku: "لە جێی خۆی بیهێڵەرەوە و بە دەوریدا پەستان بدە. شتەکە بەشێک لە برینەکە دادەخات؛ ڕاکێشانی دەرەوە خوێنبەربوونەکە فراوان دەکاتەوە و دەتوانێت لە ڕێگادا شانەی زیاتر بدڕێنێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "foglights", topic: "Which lights in fog or heavy rain", label: "Visibility drops below about 100 metres in f", a: 0, bait: 1,
    hook: { en: "Full beam makes fog worse", ku: "لایتی بەرز تەم خراپتر دەکات" },
    q: { en: "Visibility drops below 100 metres in fog or heavy rain. Which lights do you use?", ku: "لە تەم یان بارانی بەخوڕدا ڕوونی لە ١٠٠ مەتر کەمتر دەبێتەوە. کام چرا بەکاردەهێنیت؟" },
    o: [
      { en: "Dipped headlights (and fog lights if fitted)", ku: "چرای نزم (و چرای تەم ئەگەر هەیە)" },
      { en: "Full beam, to see as far as possible", ku: "چرای بەرز، بۆ ئەوەی تا دەکرێت دوور ببینیت" },
      { en: "Parking lights only", ku: "تەنها چرای پارک" },
    ],
    why: { en: "Full beam reflects back off fog and rain into your own eyes, so you see less, not more. Dipped beam throws light under the fog and makes you visible to everyone else.", ku: "چرای بەرز لە تەم و بارانەوە دەگەڕێتەوە ناو چاوی خۆت، بۆیە کەمتر دەبینیت نەک زیاتر. چرای نزم ڕووناکی دەخاتە ژێر تەمەکەوە و وا دەکات هەموو کەس بتبینێت." },
    sayA: { en: "Full beam makes fog worse. Visibility drops below 100 metres in fog or heavy rain. Which lights do you use?", ku: "لایتی بەرز تەم خراپتر دەکات. لە تەم یان بارانی بەخوڕدا ڕوونی لە ١٠٠ مەتر کەمتر دەبێتەوە. کام چرا بەکاردەهێنیت؟" },
    sayB: { en: "Dipped headlights, and fog lights if fitted. Full beam reflects back off fog and rain into your own eyes, so you see less, not more. 745 more questions, free.", ku: "چرای نزم، و چرای تەم ئەگەر هەبێت. چرای بەرز لە تەم و بارانەوە دەگەڕێتەوە ناو چاوی خۆت، بۆیە کەمتر دەبینیت نەک زیاتر. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "roundabout", topic: "Signalling for the second roundabout exit", label: "You want to take the second exit (straight a", a: 0, bait: 1,
    hook: { en: "The signal most people get wrong", ku: "ئەو ئاماژەیەی زۆر کەس هەڵەی دەکەن" },
    q: { en: "You want to take the second exit (straight ahead) at a roundabout. What do you do?", ku: "دەتەوێت دووەم دەرچوون (ڕاست بەرەوپێش) لە بازنەکە وەربگریت. چی دەکەیت؟" },
    o: [
      { en: "No signal on approach, then signal right after the first exit", ku: "بەبێ ئاماژە نزیک ببەرەوە، پاشان دوای یەکەم دەرچوون ئاماژە بۆ ڕاست بکە" },
      { en: "Signal right as soon as you approach the roundabout", ku: "هەرکە لە بازنەکە نزیک دەبیتەوە ئاماژە بۆ لای ڕاست بکە" },
      { en: "Move into the left-hand lane and signal left", ku: "بڕۆ ناو لاینی چەپ و ئاماژە بۆ لای چەپ بکە" },
    ],
    why: { en: "Approach without signalling and keep your lane. Only signal right once you have passed the exit before the one you want — signalling early tells everyone waiting that you are leaving at the first exit.", ku: "بەبێ ئاماژە نزیک ببەرەوە و لە لاینەکەی خۆتدا بمێنەوە. تەنها دوای ئەوەی ئەو دەرچوونەت تێپەڕاند کە پێش دەرچوونەکەی خۆتە ئاماژە بۆ ڕاست بکە — ئاماژەی زوو بەوانەی چاوەڕێن دەڵێت لە یەکەم دەرچوون دەڕۆیت." },
    sayA: { en: "The signal most people get wrong. You want to take the second exit, straight ahead, at a roundabout. What do you do?", ku: "ئەو ئاماژەیەی زۆر کەس هەڵەی دەکەن. دەتەوێت دووەم دەرچوون، ڕاست بەرەوپێش، لە بازنەکە وەربگریت. چی دەکەیت؟" },
    sayB: { en: "No signal on approach, then signal right after the first exit. Signalling early tells everyone waiting that you are leaving at the first exit. 745 more questions, free.", ku: "بەبێ ئاماژە نزیک ببەرەوە، پاشان دوای یەکەم دەرچوون ئاماژە بۆ ڕاست بکە. ئاماژەی زوو بەوانەی چاوەڕێن دەڵێت لە یەکەم دەرچوون دەڕۆیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "advisory", topic: "Advisory speed plate under a warning sign", label: "This warning sign shows bends with '45' bene", a: 0, bait: 1, sign: "bends",
    hook: { en: "That number is not a limit", ku: "ئەو ژمارەیە سنووری یاسایی نییە" },
    q: { en: "A bends sign has '45' beneath it. What does the number mean?", ku: "هێمای پێچەکان ژمارەی '٤٥'ی لەژێردایە. ژمارەکە واتای چییە؟" },
    o: [
      { en: "An advisory speed — dangerous, but not illegal, to exceed", ku: "خێراییەکی ئامۆژگاری — مەترسیدارە تێیپەڕێنیت، بەڵام قەدەغە نییە" },
      { en: "A legal limit — illegal to exceed", ku: "سنوورێکی یاسایی — قەدەغەیە تێیپەڕێنیت" },
      { en: "The bends end in 45 metres", ku: "پێچەکان لە ٤٥ مەتردا تەواودەبن" },
    ],
    why: { en: "A number under a warning sign is the recommended speed for that hazard, not a limit set by law. No ticket — but the bend does not care about that.", ku: "ژمارەیەک لەژێر هێمای ئاگادارکردنەوەدا خێرایی پێشنیارکراوە بۆ ئەو مەترسییە، نەک سنوورێک کە یاسا دایناوە. سزات نادرێت — بەڵام پێچەکە گوێی بەوە نییە." },
    sayA: { en: "That number is not a limit. A bends sign has forty-five beneath it. What does the number mean?", ku: "ئەو ژمارەیە سنووری یاسایی نییە. هێمای پێچەکان ژمارەی چل و پێنجی لەژێردایە. ژمارەکە واتای چییە؟" },
    sayB: { en: "An advisory speed — dangerous, but not illegal, to exceed. A number under a warning sign is the recommended speed for that hazard, not a limit set by law. 745 more questions, free.", ku: "خێراییەکی ئامۆژگاری — مەترسیدارە تێیپەڕێنیت، بەڵام قەدەغە نییە. ژمارەیەک لەژێر هێمای ئاگادارکردنەوەدا خێرایی پێشنیارکراوە بۆ ئەو مەترسییە، نەک سنوورێک کە یاسا دایناوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "alley", topic: "Speed limit in an alley", label: "What is the maximum speed in an alley or nar", a: 0, bait: 2,
    hook: { en: "The lowest limit in town", ku: "نزمترین سنووری ناو شار" },
    q: { en: "What is the maximum speed in an alley or narrow lane inside a town?", ku: "زۆرترین خێرایی لە کۆڵان یان ڕێگای تەسکی ناو شار چەندە؟" },
    o: [
      { en: "20 km/h", ku: "٢٠ کم/کاتژمێر" },
      { en: "60 km/h", ku: "٦٠ کم/کاتژمێر" },
      { en: "40 km/h", ku: "٤٠ کم/کاتژمێر" },
    ],
    why: { en: "Alleys have their own much lower limit of 20 km/h — far below the 60 on main streets in the same town. Children play in them, there are rarely pavements, and sight lines at each corner are almost nil.", ku: "کۆڵانەکان سنووری زۆر نزمتری خۆیان هەیە، ٢٠ کم/کاتژمێر — زۆر خوارتر لەو ٦٠ـەی لەسەر شەقامە سەرەکییەکانی هەمان شارە. منداڵ تێیاندا یاری دەکەن، بەدەگمەن شۆستەیان هەیە، و دید لە هەر گۆشەیەکدا نزیکەی هیچە." },
    sayA: { en: "The lowest limit in town. What is the maximum speed in an alley or narrow lane inside a town?", ku: "نزمترین سنووری ناو شار. زۆرترین خێرایی لە کۆڵان یان ڕێگای تەسکی ناو شار چەندە؟" },
    sayB: { en: "20 km/h. Alleys have their own much lower limit, far below the 60 on main streets in the same town. Children play in them and sight lines at each corner are almost nil. 745 more questions, free.", ku: "٢٠ کم/کاتژمێر. کۆڵانەکان سنووری زۆر نزمتری خۆیان هەیە، زۆر خوارتر لەو ٦٠ـەی لەسەر شەقامە سەرەکییەکانە. منداڵ تێیاندا یاری دەکەن و دید لە هەر گۆشەیەکدا نزیکەی هیچە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "dazzle", topic: "Being dazzled by an oncoming high beam", label: "At night an oncoming vehicle keeps its high ", a: 0, bait: 1,
    hook: { en: "Never look at the lights", ku: "هەرگیز سەیری لایتەکان مەکە" },
    q: { en: "At night an oncoming car keeps its high beam on and dazzles you. What do you do?", ku: "بە شەو ئۆتۆمبیلێکی ڕووبەڕوو لایتی بەرزی هێشتووەتەوە و چاوت خەڵەتان دەکات. چی دەکەیت؟" },
    o: [
      { en: "Look toward the right edge of the road and slow down", ku: "سەیری لای ڕاستی ڕێگا بکە و خێرایی کەم بکەرەوە" },
      { en: "Switch on your own high beam so you can see better", ku: "لایتی بەرزی خۆت دابگرسێنە بۆ ئەوەی باشتر ببینیت" },
      { en: "Speed up to get past them as quickly as possible", ku: "خێرایی زیاد بکە بۆ ئەوەی زووتر بەلایاندا تێبپەڕیت" },
    ],
    why: { en: "Do not stare into the lights or retaliate with your own high beam — that blinds you both. Look to the right edge to keep your bearings, slow down, and give one brief flash to remind them to dip.", ku: "سەیری ڕاستەوخۆی لایتەکان مەکە و بە لایتی بەرزی خۆت وەڵام مەدەرەوە — ئەوە هەردووکتان کوێر دەکات. سەیری لای ڕاستی ڕێگا بکە بۆ ئەوەی ئاراستەت بزانیت، خێرایی کەم بکەرەوە، و بە کورتی جارێک لایت بدە بۆ بیرخستنەوەیان." },
    sayA: { en: "Never look at the lights. At night an oncoming car keeps its high beam on and dazzles you. What do you do?", ku: "هەرگیز سەیری لایتەکان مەکە. بە شەو ئۆتۆمبیلێکی ڕووبەڕوو لایتی بەرزی هێشتووەتەوە و چاوت خەڵەتان دەکات. چی دەکەیت؟" },
    sayB: { en: "Look toward the right edge of the road and slow down. Retaliating with your own high beam blinds you both. Give one brief flash to remind them to dip. 745 more questions, free.", ku: "سەیری لای ڕاستی ڕێگا بکە و خێرایی کەم بکەرەوە. وەڵامدانەوە بە لایتی بەرزی خۆت هەردووکتان کوێر دەکات. بە کورتی جارێک لایت بدە بۆ بیرخستنەوەیان. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
  {
    id: "tyredate", topic: "The DOT date code on a tyre", label: "A tyre is marked \"DOT ... 0321\". What does 0", a: 0, bait: 1,
    hook: { en: "Your tyres have a date on them", ku: "تایەکانت ڕێکەوتیان لەسەرە" },
    q: { en: "A tyre is marked \"DOT … 0321\". What does 0321 tell you?", ku: "تایەیەک بە \"DOT … 0321\" نیشانە کراوە. ٠٣٢١ چیت پێدەڵێت؟" },
    o: [
      { en: "It was made in week 03 of 2021", ku: "لە هەفتەی ٠٣ی ساڵی ٢٠٢١ دروستکراوە" },
      { en: "It fits a 3 cm by 21 cm rim", ku: "بۆ ویلێکی ٣ سم لە ٢١ سم دەگونجێت" },
      { en: "Its maximum pressure is 32.1", ku: "زۆرترین پەستانی ٣٢٫١ ـە" },
    ],
    why: { en: "The last four digits of the DOT code are the week and year it was made. Age matters as much as tread — rubber hardens with time, so check the date before you buy a \"new\" tyre.", ku: "چوار ژمارەی کۆتایی کۆدی DOT هەفتە و ساڵی دروستکردنن. تەمەن هێندەی نەخشی تایە گرنگە — لاستیک بە تێپەڕبوونی کات ڕەق دەبێت، بۆیە پێش کڕینی تایەیەکی \"نوێ\" ڕێکەوتەکەی بپشکنە." },
    sayA: { en: "Your tyres have a date on them. A tyre is marked DOT, zero three two one. What does zero three two one tell you?", ku: "تایەکانت ڕێکەوتیان لەسەرە. تایەیەک بە کۆدی DOT، سفر سێ دوو یەک، نیشانە کراوە. ئەم ژمارەیە چیت پێدەڵێت؟" },
    sayB: { en: "It was made in week three of 2021. The last four digits of the DOT code are the week and year it was made. Rubber hardens with time, so check the date before you buy a new tyre. 745 more questions, free.", ku: "لە هەفتەی سێیەمی ساڵی دوو هەزار و بیست و یەکدا دروستکراوە. چوار ژمارەی کۆتایی کۆدی DOT هەفتە و ساڵی دروستکردنن. لاستیک بە تێپەڕبوونی کات ڕەق دەبێت، بۆیە پێش کڕینی تایەیەکی نوێ ڕێکەوتەکەی بپشکنە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  /* ---- batch three ---- */

  {
    id: "seatbelt", topic: "Seat belts — who must wear one", label: "In the Kurdistan Region, seat belts must be ", a: 0, bait: 1,
    hook: { en: "Everyone. The back seat too", ku: "هەموو کەس. دواوەش" },
    q: { en: "In the Kurdistan Region, seat belts must be worn by:", ku: "لە کوردستاندا پشتێنی سەلامەتی بۆ کێ پێویستە؟" },
    o: [
      { en: "All occupants, including rear passengers", ku: "هەموو سواران، پاشەکانیشەوە" },
      { en: "Only the driver", ku: "تەنها شۆفێر" },
      { en: "Nobody", ku: "هیچکەس" },
    ],
    why: { en: "Seat belts are mandatory for everyone in the vehicle.", ku: "پشتێنی سەلامەتی بۆ هەموو کەسێکی ناو ئۆتۆمبێل پێویستە." },
    sayA: { en: "Everyone. The back seat too. In the Kurdistan Region, seat belts must be worn by whom?", ku: "هەموو کەس. دواوەش. لە کوردستاندا پشتێنی سەلامەتی بۆ کێ پێویستە؟" },
    sayB: { en: "All occupants, including rear passengers. Seat belts are mandatory for everyone in the vehicle. 745 more questions, free.", ku: "هەموو سواران، پاشەکانیشەوە. پشتێنی سەلامەتی بۆ هەموو کەسێکی ناو ئۆتۆمبێل پێویستە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "intercity", topic: "Speed limit between cities", label: "Between cities and towns in the Kurdistan Re", a: 1, bait: 2,
    hook: { en: "Not 60. Not 140.", ku: "نە ٦٠. نە ١٤٠." },
    q: { en: "Between cities and towns in the Kurdistan Region, what is the maximum speed?", ku: "لە نێوان شار و شارۆچکەکانی هەرێمی کوردستاندا بەرزترین خێرایی چەندە؟" },
    o: [
      { en: "60 km/h", ku: "٦٠ کم" },
      { en: "100 km/h", ku: "١٠٠ کم" },
      { en: "140 km/h", ku: "١٤٠ کم" },
    ],
    why: { en: "A 2011 circular sets 100 km/h between cities and towns. Do not confuse it with the KURDISTAN border panel, which shows 80 for an ordinary road and 110 for a motorway.", ku: "بڵاونامەیەکی ٢٠١١ خێرایی نێوان شار و شارۆچکەکان بە ١٠٠ کم/کاتژمێر دیاری دەکات. تێکەڵی تابلۆی سنووری کوردستانی مەکە، کە ٨٠ بۆ ڕێگای ئاسایی و ١١٠ بۆ ڕێگای خێرا پیشان دەدات." },
    sayA: { en: "Not sixty. Not a hundred and forty. Between cities and towns in the Kurdistan Region, what is the maximum speed?", ku: "نە شەست. نە سەد و چل. لە نێوان شار و شارۆچکەکانی هەرێمی کوردستاندا بەرزترین خێرایی چەندە؟" },
    sayB: { en: "100 km/h. A circular from 2011 sets 100 between cities and towns. Do not confuse it with the Kurdistan border panel, which shows 80 for an ordinary road and 110 for a motorway. 745 more questions, free.", ku: "سەد کم/کاتژمێر. بڵاونامەیەکی ٢٠١١ خێرایی نێوان شارەکان بە ١٠٠ دیاری دەکات. تێکەڵی تابلۆی سنووری کوردستانی مەکە، کە ٨٠ بۆ ڕێگای ئاسایی و ١١٠ بۆ ڕێگای خێرا پیشان دەدات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "horn", topic: "When the horn may be used", label: "When and how should the horn be used?", a: 0, bait: 2,
    hook: { en: "The horn is not for anger", ku: "هۆڕن بۆ تووڕەیی نییە" },
    q: { en: "When and how should the horn be used?", ku: "هۆڕن دەبێت کەی و چۆن بەکاربێت؟" },
    o: [
      { en: "Once, briefly, only when needed to warn others of danger", ku: "بۆ یەک جار و ماوەیەکی کورت لە کاتی زۆر پێویستدا بۆ ئاگادارکردنەوەی خەڵک لە مەترسی" },
      { en: "To scold drivers who commit violations", ku: "بۆ سەرزەنشتکردنی شۆفێرە سەرپێچیکارەکان" },
      { en: "For greeting, thanking, or calling someone", ku: "بۆ سڵاوکردن، سوپاسکردن یان بانگکردنی کەسێک" },
    ],
    why: { en: "Use the horn only briefly to warn of danger.", ku: "هۆڕن تەنها بۆ ئاگادارکردنەوە لە مەترسی بە کورتی بەکاربهێنە." },
    sayA: { en: "The horn is not for anger. When and how should the horn be used?", ku: "هۆڕن بۆ تووڕەیی نییە. هۆڕن دەبێت کەی و چۆن بەکاربێت؟" },
    sayB: { en: "Once, briefly, only to warn of danger. That is the only lawful use — not scolding, not greeting. 745 more questions, free.", ku: "بۆ یەک جار و بە کورتی، تەنها بۆ ئاگادارکردنەوە لە مەترسی. ئەوە تاکە بەکارهێنانی یاساییە — نە سەرزەنشت، نە سڵاو. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "brakeleak", topic: "Brake fluid leak and the annual inspection", label: "If the brake system has an oil leak, does th", a: 1, bait: 0,
    hook: { en: "One drip fails the whole car", ku: "یەک دڵۆپ هەموو ئۆتۆمبیلەکە ڕەت دەکاتەوە" },
    q: { en: "If the brake system has an oil leak, does the car pass its annual inspection?", ku: "ئەگەر سیستەمی بریک لێچوونی ڕۆنی هەبێت، ئایا ئۆتۆمبیل لە پشکنینی ساڵانە دەردەچێت؟" },
    o: [
      { en: "Yes, it passes", ku: "بەڵێ دەردەچێت" },
      { en: "No, it does not pass", ku: "نەخێر دەرناچێت" },
      { en: "It does not matter", ku: "گرنگ نییە" },
    ],
    why: { en: "A brake-fluid leak is a serious defect — it fails inspection.", ku: "لێچوونی ڕۆنی بریک کێشەیەکی گەورەیە — لە پشکنین دەرناچێت." },
    sayA: { en: "One drip fails the whole car. If the brake system has an oil leak, does the car pass its annual inspection?", ku: "یەک دڵۆپ هەموو ئۆتۆمبیلەکە ڕەت دەکاتەوە. ئەگەر سیستەمی بریک لێچوونی ڕۆنی هەبێت، ئایا ئۆتۆمبیل لە پشکنینی ساڵانە دەردەچێت؟" },
    sayB: { en: "No, it does not pass. A brake-fluid leak is a serious defect and fails inspection outright. 745 more questions, free.", ku: "نەخێر دەرناچێت. لێچوونی ڕۆنی بریک کێشەیەکی گەورەیە و ڕاستەوخۆ لە پشکنین دەرناچێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "doubleline", topic: "Double solid centre lines", label: "What do these road markings mean?", a: 1, bait: 0,
    hook: { en: "Two lines, one rule", ku: "دوو هێڵ، یەک یاسا" },
    q: { en: "A road has double solid lines down the centre. What do they mean?", ku: "ڕێگایەک هێڵی دووانەی بەردەوامی لە ناوەڕاستدایە. واتایان چییە؟" },
    o: [
      { en: "U-turns are prohibited", ku: "سووڕانەوە قەدەغەیە" },
      { en: "No overtaking in either direction, and do not drive on the central markings", ku: "تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە، و لەسەر نیشانە ناوەڕاستەکان مەڕۆ" },
      { en: "A pedestrian crossing area", ku: "شوێنی پەڕینەوەی پیادە" },
    ],
    why: { en: "Double centre lines forbid overtaking both ways and must not be driven over.", ku: "هێڵی دووانەی ناوەڕاست تێپەڕاندن لە هەردوو لا قەدەغە دەکات و نابێت بەسەریدا بڕۆیت." },
    sayA: { en: "Two lines, one rule. A road has double solid lines down the centre. What do they mean?", ku: "دوو هێڵ، یەک یاسا. ڕێگایەک هێڵی دووانەی بەردەوامی لە ناوەڕاستدایە. واتایان چییە؟" },
    sayB: { en: "No overtaking in either direction, and do not drive on the markings. A double centre line forbids overtaking both ways. 745 more questions, free.", ku: "تێپەڕاندن لە هەردوو ئاراستە قەدەغەیە، و لەسەر نیشانەکان مەڕۆ. هێڵی دووانەی ناوەڕاست تێپەڕاندن لە هەردوو لا قەدەغە دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "cyclistbend", topic: "Overtaking cyclists on a bend", label: "Cyclists are ahead on a bend and the road ha", a: 2, bait: 0,
    hook: { en: "Wait. Just wait.", ku: "چاوەڕێ بکە. تەنها چاوەڕێ بکە." },
    q: { en: "Cyclists are ahead on a bend and the road has a double centre line. What should you do?", ku: "جووتەسوار لە پێشتدا هەن لەسەر خواروخێچێک و ڕێگاکە هێڵی ناوەڕاستی دووانەی هەیە. دەبێت چی بکەیت؟" },
    o: [
      { en: "Overtake the cyclists quickly before the bend", ku: "بەخێرایی جووتەسوارەکان تێبپەڕێنە پێش خواروخێچەکە" },
      { en: "Sound your horn and squeeze past them", ku: "هۆڕن لێبدە و بە زۆر تێیان بپەڕێنە" },
      { en: "Do not overtake — wait behind them until it is clearly safe and legal", ku: "تێیان مەپەڕێنە — لە پشتیانەوە بوەستە هەتا بە تەواوی سەلامەت و یاساییە" },
    ],
    why: { en: "A double centre line and a bend both forbid overtaking — stay behind the cyclists until it is safe.", ku: "هێڵی ناوەڕاستی دووانە و خواروخێچ هەردووکیان تێپەڕاندن قەدەغە دەکەن — لە پشت جووتەسوارەکانەوە بمێنەوە هەتا سەلامەت دەبێت." },
    sayA: { en: "Wait. Just wait. Cyclists are ahead on a bend and the road has a double centre line. What should you do?", ku: "چاوەڕێ بکە. تەنها چاوەڕێ بکە. جووتەسوار لە پێشتدا هەن لەسەر خواروخێچێک و ڕێگاکە هێڵی ناوەڕاستی دووانەی هەیە. دەبێت چی بکەیت؟" },
    sayB: { en: "Do not overtake — wait behind them until it is clearly safe and legal. The bend and the double line each forbid it on their own. 745 more questions, free.", ku: "تێیان مەپەڕێنە — لە پشتیانەوە بوەستە هەتا بە تەواوی سەلامەت و یاساییە. خواروخێچەکە و هێڵە دووانەکە هەرکامیان بەتەنها قەدەغەی دەکەن. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "uturnsign", topic: "No U-turn sign — what to do instead", label: "You have gone the wrong way and want to turn", a: 2, bait: 0,
    hook: { en: "Wrong way? Not here.", ku: "ڕێگا هەڵە؟ لێرە نا." },
    q: { en: "You have gone the wrong way and want to turn around, but there is a 'no U-turn' sign here. What do you do?", ku: "ڕێگەت هەڵەکردووە و دەتەوێت بسووڕێیتەوە، بەڵام هێمای 'یوتێرن قەدەغە' لێرەیە. چی دەکەیت؟" },
    o: [
      { en: "Make a U-turn here anyway", ku: "بەهەرحاڵ لێرە یوتێرن دەکەم" },
      { en: "Move to the right lane and just keep driving straight", ku: "دەچمە ڕێڕەوی ڕاست و تەنها ڕاستەوڕاست بەردەوام دەبم" },
      { en: "Find a proper, legal place to turn around", ku: "شوێنێکی گونجاو و یاسایی بۆ سووڕانەوە دەدۆزمەوە" },
    ],
    why: { en: "A 'no U-turn' sign means you must not turn here — carry on and turn where it is allowed.", ku: "هێمای 'سووڕانەوە قەدەغە' واتە نابێت لێرە بسووڕێیتەوە — بەردەوام بە و لە شوێنێک بسووڕێوە کە ڕێگەپێدراوە." },
    sayA: { en: "Wrong way? Not here. You have gone the wrong way and want to turn around, but there is a no U-turn sign here. What do you do?", ku: "ڕێگا هەڵە؟ لێرە نا. ڕێگەت هەڵەکردووە و دەتەوێت بسووڕێیتەوە، بەڵام هێمای یوتێرن قەدەغە لێرەیە. چی دەکەیت؟" },
    sayB: { en: "Find a proper, legal place to turn around. The sign means you must not turn here — carry on and turn where it is allowed. 745 more questions, free.", ku: "شوێنێکی گونجاو و یاسایی بۆ سووڕانەوە دەدۆزمەوە. هێماکە واتای ئەوەیە نابێت لێرە بسووڕێیتەوە — بەردەوام بە و لە شوێنێکی ڕێگەپێدراو بسووڕێوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "shock", topic: "First aid — treating shock", label: "To help someone who is in shock after a cras", a: 0, bait: 1,
    hook: { en: "Do not give them tea", ku: "چایان مەدەرێ" },
    q: { en: "To help someone who is in shock after a crash, you should:", ku: "بۆ یارمەتیدانی کەسێک کە دوای ڕووداو تووشی شۆک بووە، دەبێت:" },
    o: [
      { en: "Keep them warm, lying down, and reassure them", ku: "گەرمیان ڕابگرە، ڕاکشاو، و دڵنیایان بکەرەوە" },
      { en: "Give them a hot drink and food", ku: "خواردنەوەی گەرم و خۆراکیان بدەرێ" },
      { en: "Make them walk around", ku: "بیانکە بە پیاسەکردن" },
    ],
    why: { en: "Keep a person in shock warm, lying down and calm, and get medical help — do not give food or drink.", ku: "کەسی تووشی شۆک گەرم و ڕاکشاو و ئارام ڕابگرە و یارمەتیی پزیشکی بهێنە — خواردن یان خواردنەوەی مەدەرێ." },
    sayA: { en: "Do not give them tea. To help someone who is in shock after a crash, what should you do?", ku: "چایان مەدەرێ. بۆ یارمەتیدانی کەسێک کە دوای ڕووداو تووشی شۆک بووە، دەبێت چی بکەیت؟" },
    sayB: { en: "Keep them warm, lying down, and reassure them. Keep them calm and get medical help — give no food or drink. 745 more questions, free.", ku: "گەرمیان ڕابگرە، ڕاکشاو، و دڵنیایان بکەرەوە. ئارامیان ڕابگرە و یارمەتیی پزیشکی بهێنە — خواردن یان خواردنەوەیان مەدەرێ. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "tunnel", topic: "Entering a dark tunnel", label: "You are about to drive from bright daylight ", a: 0, bait: 2,
    hook: { en: "Your eyes need a moment", ku: "چاوت ساتێکی دەوێت" },
    q: { en: "You are about to drive from bright daylight into a dark tunnel. What should you do?", ku: "خەریکیت لە ڕووناکی ڕۆژەوە دەچیتە ناو تونێلێکی تاریک. دەبێت چی بکەیت؟" },
    o: [
      { en: "Slow down and switch on your dipped (low-beam) headlights", ku: "خێرایی کەم بکەرەوە و لایتی نزم دابگرسێنە" },
      { en: "Keep the same speed and turn on high beam", ku: "بەهەمان خێرایی بەردەوام بە و لایتی بەرز دابگرسێنە" },
      { en: "Speed up to get through the tunnel quickly", ku: "خێرایی زیاد بکە بۆ ئەوەی خێرا لە تونێلەکە دەربچیت" },
    ],
    why: { en: "Your eyes need time to adjust. Slow down, use dipped beam rather than high beam, and keep a safe distance until you can see clearly.", ku: "چاوەکانت کاتیان دەوێت بۆ خۆگونجاندن. خێرایی کەم بکەرەوە، لایتی نزم بەکاربهێنە نەک بەرز، و مەودای سەلامەت بپارێزە هەتا بە ڕوونی دەبینیت." },
    sayA: { en: "Your eyes need a moment. You are about to drive from bright daylight into a dark tunnel. What should you do?", ku: "چاوت ساتێکی دەوێت. خەریکیت لە ڕووناکی ڕۆژەوە دەچیتە ناو تونێلێکی تاریک. دەبێت چی بکەیت؟" },
    sayB: { en: "Slow down and switch on your dipped headlights. Your eyes need time to adjust, so keep a safe distance until you can see clearly. 745 more questions, free.", ku: "خێرایی کەم بکەرەوە و لایتی نزم دابگرسێنە. چاوەکانت کاتیان دەوێت بۆ خۆگونجاندن، بۆیە مەودای سەلامەت بپارێزە هەتا بە ڕوونی دەبینیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "crossing", topic: "A car slowing at a pedestrian crossing", label: "The car ahead of you is slowing down at a pe", a: 0, bait: 1,
    hook: { en: "Never overtake here", ku: "لێرە هەرگیز تێمەپەڕێنە" },
    q: { en: "The car ahead of you is slowing down at a pedestrian crossing. What should you do?", ku: "ئۆتۆمبیلی پێشەوەت لە شوێنی پەڕینەوەی پیادەدا خێرایی کەم دەکاتەوە. دەبێت چی بکەیت؟" },
    o: [
      { en: "Slow down and do NOT overtake it — it may be stopping for someone you cannot see", ku: "خێرایی کەم بکەرەوە و تێمەپەڕێنە — لەوانەیە بۆ کەسێک ڕادەوەستێت کە تۆ نایبینیت" },
      { en: "Overtake it quickly to get past", ku: "بە خێرایی تێیدەپەڕێنم بۆ تێپەڕین" },
      { en: "Warn it with your horn or lights", ku: "بە هۆڕن یان لایت ئاگاداری دەکەمەوە" },
    ],
    why: { en: "Never overtake a vehicle slowing or stopped at a crossing — it may be giving way to someone hidden from your view.", ku: "هەرگیز ئۆتۆمبیلێک تێمەپەڕێنە کە لە پەڕینگەدا خێرایی کەم دەکاتەوە یان ڕاوەستاوە — لەوانەیە ڕێگا بدات بە کەسێک کە لە بینینی تۆ شاراوەیە." },
    sayA: { en: "Never overtake here. The car ahead of you is slowing down at a pedestrian crossing. What should you do?", ku: "لێرە هەرگیز تێمەپەڕێنە. ئۆتۆمبیلی پێشەوەت لە شوێنی پەڕینەوەی پیادەدا خێرایی کەم دەکاتەوە. دەبێت چی بکەیت؟" },
    sayB: { en: "Slow down and do not overtake it. It may be stopping for someone you cannot see. 745 more questions, free.", ku: "خێرایی کەم بکەرەوە و تێمەپەڕێنە. لەوانەیە بۆ کەسێک ڕادەوەستێت کە تۆ نایبینیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "redamber", topic: "Red and amber showing together", label: "The traffic light shows RED and AMBER togeth", a: 0, bait: 1,
    hook: { en: "Red plus amber is not green", ku: "سوور و زەرد سەوز نییە" },
    q: { en: "The traffic light shows RED and AMBER together. What does that mean?", ku: "چرای هاتووچۆ سوور و زەرد پێکەوە پیشان دەدات. واتای چییە؟" },
    o: [
      { en: "Get ready to move, but do not go until the green shows", ku: "ئامادەبە بۆ جووڵان، بەڵام مەڕۆ هەتا سەوز دەردەکەوێت" },
      { en: "You may go now — it is the same as green", ku: "ئێستا دەتوانیت بڕۆیت — وەک سەوز وایە" },
      { en: "The lights are faulty, so treat it as a give-way", ku: "چراکان تێکچوون، بۆیە وەک ڕێگادانی لەگەڵدا جوڵێ" },
    ],
    why: { en: "Red and amber together is the 'get ready' phase before green. You must not cross the line until the green shows.", ku: "سوور و زەرد پێکەوە قۆناغی 'ئامادەبە'یە پێش سەوز. نابێت لە هێڵەکە تێپەڕیت هەتا چرای سەوز دەردەکەوێت." },
    sayA: { en: "Red plus amber is not green. The traffic light shows red and amber together. What does that mean?", ku: "سوور و زەرد سەوز نییە. چرای هاتووچۆ سوور و زەرد پێکەوە پیشان دەدات. واتای چییە؟" },
    sayB: { en: "Get ready to move, but do not go until the green shows. It is the get-ready phase, not permission to cross the line. 745 more questions, free.", ku: "ئامادەبە بۆ جووڵان، بەڵام مەڕۆ هەتا سەوز دەردەکەوێت. قۆناغی ئامادەبوونە، نەک ڕێگەپێدان بۆ تێپەڕین لە هێڵەکە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "trailerweight", topic: "Category B licence — trailer weight", label: "You hold a category B licence. What is the h", a: 0, bait: 1,
    hook: { en: "750 kg is the line", ku: "٧٥٠ کیلۆ هێڵی جیاکەرەوەیە" },
    q: { en: "You hold a category B licence. What is the heaviest trailer you may tow?", ku: "مۆڵەتی پۆلی B ت هەیە. قورسترین کەرەفانە کە بۆت هەیە ڕایبکێشیت چەندە؟" },
    o: [
      { en: "Up to 750 kg — above that you need a BE licence", ku: "تا ٧٥٠ کگم — لەوە زیاتر مۆڵەتی BE دەوێت" },
      { en: "Any weight, as long as the car can pull it", ku: "هەر کێشێک، بەمەرجێک ئۆتۆمبیلەکە بتوانێت ڕایبکێشێت" },
      { en: "Up to 1500 kg", ku: "تا ١٥٠٠ کگم" },
    ],
    why: { en: "750 kg is the dividing line: at or below it a B licence is enough, anything heavier needs category BE.", ku: "٧٥٠ کگم هێڵی جیاکەرەوەیە: لەو کێشە یان کەمتر مۆڵەتی B بەسە، هەرچی قورستر بێت پۆلی BE دەوێت." },
    sayA: { en: "Seven hundred and fifty kilos is the line. You hold a category B licence. What is the heaviest trailer you may tow?", ku: "حەوت سەد و پەنجا کیلۆ هێڵی جیاکەرەوەیە. مۆڵەتی پۆلی B ت هەیە. قورسترین کەرەفانە کە بۆت هەیە ڕایبکێشیت چەندە؟" },
    sayB: { en: "Up to 750 kg — above that you need a BE licence. A light trailer with a heavy load can still put you over it. 745 more questions, free.", ku: "تا ٧٥٠ کگم — لەوە زیاتر مۆڵەتی BE دەوێت. کەرەفانەیەکی سووک بە بارێکی قورس هێشتا دەتوانێت لە سنوورەکە تێپەڕێنێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "trailerrider", topic: "Riding inside a towed trailer", label: "May a passenger ride inside a trailer or car", a: 0, bait: 2,
    hook: { en: "Never. Not for one minute.", ku: "هەرگیز. تەنانەت یەک خولەکیش." },
    q: { en: "May a passenger ride inside a trailer or caravan while it is being towed?", ku: "ئایا بۆ سەرنشین هەیە لە ناو کەرەفانە یان کاروانەدا سەربکەوێت لە کاتی ڕاکێشاندا؟" },
    o: [
      { en: "No — never, under any circumstances", ku: "نەخێر — هەرگیز، لە هیچ حاڵەتێکدا" },
      { en: "Yes, if they wear a seat belt", ku: "بەڵێ، ئەگەر پشتێنی سەلامەتی ببەستێت" },
      { en: "Yes, on short journeys only", ku: "بەڵێ، تەنها لە گەشتە کورتەکاندا" },
    ],
    why: { en: "A trailer has no seat belts, no crash structure, and no way for the driver to see or reach anyone inside. It is prohibited outright.", ku: "کەرەفانە نە پشتێنی سەلامەتی هەیە، نە پێکهاتەی پارێزەر، و نە ڕێگەیەک بۆ شۆفێر کە کەسی ناوەوە ببینێت. بە تەواوی قەدەغەیە." },
    sayA: { en: "Never. Not for one minute. May a passenger ride inside a trailer or caravan while it is being towed?", ku: "هەرگیز. تەنانەت یەک خولەکیش. ئایا بۆ سەرنشین هەیە لە ناو کەرەفانە یان کاروانەدا سەربکەوێت لە کاتی ڕاکێشاندا؟" },
    sayB: { en: "No — never, under any circumstances. A trailer has no belts, no crash structure, and the driver cannot see or reach anyone inside. 745 more questions, free.", ku: "نەخێر — هەرگیز، لە هیچ حاڵەتێکدا. کەرەفانە نە پشتێن هەیە، نە پێکهاتەی پارێزەر، و شۆفێر ناتوانێت کەسی ناوەوە ببینێت یان پێی بگات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "crossingposts", topic: "Level-crossing countdown posts", label: "Beside a railway you see a post with three r", a: 0, bait: 1,
    hook: { en: "Those stripes are counting down", ku: "ئەو خەتانە ژماردنەوەن" },
    q: { en: "Beside a railway you see a post with three red stripes, then one with two, then one with a single stripe. What do they count?", ku: "لەتەنیشت هێڵی شەمەندەفەر کۆڵەکەیەک بە سێ خەتی سوور دەبینیت، پاشان یەکێک بە دوو، پاشان یەکێک بە یەک خەت. چی دەژمێرن؟" },
    o: [
      { en: "The distance to the level crossing: 300 m, 200 m and 100 m", ku: "دووری بۆ پەڕینگەکە: ٣٠٠، ٢٠٠ و ١٠٠ مەتر" },
      { en: "The number of tracks you will cross", ku: "ژمارەی ئەو هێڵانەی دەیانبڕیت" },
      { en: "How many trains use the line each hour", ku: "چەند شەمەندەفەر لە هەر کاتژمێرێکدا هێڵەکە بەکاردەهێنن" },
    ],
    why: { en: "A countdown to the crossing — three stripes at 300 m, two at 200 m, one at 100 m. By the single stripe you should be slow enough to stop.", ku: "ژماردنەوەیەکن بۆ پەڕینگەکە — سێ خەت لە ٣٠٠ مەتر، دوو لە ٢٠٠، یەک لە ١٠٠. لەلای خەتە تاکەکە دەبێت هێندە هێواش بیت کە بتوانیت بوەستیت." },
    sayA: { en: "Those stripes are counting down. Beside a railway you see a post with three red stripes, then two, then one. What do they count?", ku: "ئەو خەتانە ژماردنەوەن. لەتەنیشت هێڵی شەمەندەفەر کۆڵەکەیەک بە سێ خەتی سوور دەبینیت، پاشان دوو، پاشان یەک. چی دەژمێرن؟" },
    sayB: { en: "The distance to the level crossing: 300, 200 and 100 metres. By the single stripe you should already be slow enough to stop. 745 more questions, free.", ku: "دووری بۆ پەڕینگەکە: ٣٠٠، ٢٠٠ و ١٠٠ مەتر. لەلای خەتە تاکەکە دەبێت پێشتر هێندە هێواش بیت کە بتوانیت بوەستیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "nofood", topic: "No food or drink for a casualty", label: "Should you give an injured person food or a ", a: 0, bait: 2,
    hook: { en: "The kindest thing is nothing", ku: "بەخێرترین کار هیچە" },
    q: { en: "Should you give an injured person food or a drink at the scene?", ku: "دەبێت لە شوێنی ڕووداودا خواردن یان خواردنەوە بدەیت بە کەسێکی بریندار؟" },
    o: [
      { en: "No — nothing by mouth until the paramedics arrive", ku: "نەخێر — هیچ بە دەم نەدرێت تا تیمی فریاگوزاری دەگات" },
      { en: "Yes, water helps with shock", ku: "بەڵێ، ئاو بۆ شۆک سوودی هەیە" },
      { en: "Yes, sweet tea is best", ku: "بەڵێ، چای شیرین باشترینە" },
    ],
    why: { en: "They may need an anaesthetic at hospital, and anything in the stomach makes that dangerous. If they are unconscious, food or drink can also block the airway.", ku: "لەوانەیە لە نەخۆشخانەدا پێویستیان بە بێهۆشکەر بێت، و هەر شتێک لە گەدەدا بێت ئەوە مەترسیدار دەکات. ئەگەر لە هۆش خۆی چووبێت، خواردن یان خواردنەوە دەتوانێت ڕێڕەوی هەناسەش ببەستێت." },
    sayA: { en: "The kindest thing is nothing. Should you give an injured person food or a drink at the scene?", ku: "بەخێرترین کار هیچە. دەبێت لە شوێنی ڕووداودا خواردن یان خواردنەوە بدەیت بە کەسێکی بریندار؟" },
    sayB: { en: "No — nothing by mouth until the paramedics arrive. They may need an anaesthetic, and anything in the stomach makes that dangerous. 745 more questions, free.", ku: "نەخێر — هیچ بە دەم نەدرێت تا تیمی فریاگوزاری دەگات. لەوانەیە پێویستیان بە بێهۆشکەر بێت، و هەر شتێک لە گەدەدا بێت ئەوە مەترسیدار دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "triangle", topic: "Where to place the warning triangle", label: "Your car breaks down on the road. Where do y", a: 0, bait: 2,
    hook: { en: "50 metres, not 5", ku: "٥٠ مەتر، نەک ٥" },
    q: { en: "Your car breaks down on the road. Where do you place the warning triangle?", ku: "ئۆتۆمبیلەکەت لەسەر ڕێگا پەکی دەکەوێت. سێگۆشەی وریاکردنەوە لەکوێ دادەنێیت؟" },
    o: [
      { en: "About 50 m behind the car, at the right-hand edge", ku: "نزیکەی ٥٠ مەتر لە دوای ئۆتۆمبیلەکە، لە لێواری لای ڕاست" },
      { en: "On the roof of the car", ku: "لەسەر سەربانی ئۆتۆمبیلەکە" },
      { en: "Directly behind the bumper", ku: "ڕاستەوخۆ لە پشت بەمپەرەکە" },
    ],
    why: { en: "The point is to give following traffic time to react, which it cannot do if the triangle appears at the same moment as your car. Hazard lights on as well.", ku: "مەبەست ئەوەیە کاتی وەڵامدانەوە بە هاتوچۆی دواوە بدات، کە ناتوانێت ئەگەر سێگۆشەکە لە هەمان ساتی ئۆتۆمبیلەکەتدا دەربکەوێت. لایتی وریاکردنەوەش دابگیرسێنە." },
    sayA: { en: "Fifty metres, not five. Your car breaks down on the road. Where do you place the warning triangle?", ku: "پەنجا مەتر، نەک پێنج. ئۆتۆمبیلەکەت لەسەر ڕێگا پەکی دەکەوێت. سێگۆشەی وریاکردنەوە لەکوێ دادەنێیت؟" },
    sayB: { en: "About 50 metres behind the car, at the right-hand edge. The point is to give following traffic time to react. 745 more questions, free.", ku: "نزیکەی ٥٠ مەتر لە دوای ئۆتۆمبیلەکە، لە لێواری لای ڕاست. مەبەست ئەوەیە کاتی وەڵامدانەوە بە هاتوچۆی دواوە بدات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "mirrorword", topic: "Why AMBULANCE is written backwards", label: "Why is AMBULANCE written back-to-front on th", a: 0, bait: 2,
    hook: { en: "It is not a printing mistake", ku: "هەڵەی چاپ نییە" },
    q: { en: "Why is AMBULANCE written back-to-front on the front of the vehicle?", ku: "بۆچی وشەی AMBULANCE بە پێچەوانەوە لە پێشەوەی ئۆتۆمبیلەکە نووسراوە؟" },
    o: [
      { en: "So a driver ahead reads it the right way round in the mirror", ku: "تا شۆفێری پێشەوە لە ئاوێنەدا بە شێوەی دروست بیخوێنێتەوە" },
      { en: "It is a decorative style", ku: "شێوازێکی ڕازاندنەوەیە" },
      { en: "It is a printing mistake", ku: "هەڵەیەکی چاپە" },
    ],
    why: { en: "A mirror reverses the image, so mirrored lettering comes out the right way round to the driver you are catching up with — which is exactly who needs to read it.", ku: "ئاوێنە وێنەکە هەڵدەگەڕێنێتەوە، بۆیە نووسینی پێچەوانە بە شێوەی دروست دەردەکەوێت بۆ ئەو شۆفێرەی پێی دەگەیت — کە هەر ئەوەیە پێویستی بە خوێندنەوەی هەیە." },
    sayA: { en: "It is not a printing mistake. Why is the word AMBULANCE written back-to-front on the front of the vehicle?", ku: "هەڵەی چاپ نییە. بۆچی وشەی AMBULANCE بە پێچەوانەوە لە پێشەوەی ئۆتۆمبیلەکە نووسراوە؟" },
    sayB: { en: "So the driver ahead reads it the right way round in the mirror. A mirror reverses the image, and that driver is exactly who needs to read it. 745 more questions, free.", ku: "تا شۆفێری پێشەوە لە ئاوێنەدا بە شێوەی دروست بیخوێنێتەوە. ئاوێنە وێنەکە هەڵدەگەڕێنێتەوە، و هەر ئەو شۆفێرەیە کە پێویستی بە خوێندنەوەی هەیە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "absgravel", topic: "ABS on gravel or ice", label: "On a gravel or frozen surface, what does ABS", a: 0, bait: 1,
    hook: { en: "ABS can stop you later", ku: "ABS دەتوانێت دواتر ڕاتبگرێت" },
    q: { en: "On a gravel or frozen surface, what does ABS do to your stopping distance?", ku: "لەسەر ڕوویەکی خشڵ یان بەستوو، ABS چی بە ماوەی وەستانت دەکات؟" },
    o: [
      { en: "It lengthens it — but you keep steering control", ku: "درێژی دەکاتەوە — بەڵام کۆنترۆڵی سوکان دەمێنێتەوە" },
      { en: "It shortens it in every condition", ku: "لە هەموو بارودۆخێکدا کورتی دەکاتەوە" },
      { en: "It has no effect at all", ku: "هیچ کاریگەرییەکی نییە" },
    ],
    why: { en: "On dry or wet asphalt ABS shortens the stopping distance; on loose or frozen surfaces it lengthens it. What it always gives you is the ability to steer while braking hard.", ku: "لەسەر قیری وشک یان تەڕ ABS ماوەی وەستان کورت دەکاتەوە؛ لەسەر ڕووی هەڵوەریو یان بەستوو درێژی دەکاتەوە. ئەوەی هەمیشە پێتی دەدات توانای سووڕاندنەوەیە لە کاتی بڕەیکی توندا." },
    sayA: { en: "ABS can stop you later, not sooner. On a gravel or frozen surface, what does ABS do to your stopping distance?", ku: "ABS دەتوانێت دواتر ڕاتبگرێت، نەک زووتر. لەسەر ڕوویەکی خشڵ یان بەستوو، ABS چی بە ماوەی وەستانت دەکات؟" },
    sayB: { en: "It lengthens it — but you keep steering control. On dry or wet asphalt it shortens it; on loose or frozen ground it does the opposite. 745 more questions, free.", ku: "درێژی دەکاتەوە — بەڵام کۆنترۆڵی سوکان دەمێنێتەوە. لەسەر قیری وشک یان تەڕ کورتی دەکاتەوە؛ لەسەر زەوی هەڵوەریو یان بەستوو بە پێچەوانەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "sixthings", topic: "Six things the traffic police may ask for", label: "Which six things may the traffic police ask ", a: 0, bait: 1,
    hook: { en: "Six things, not one", ku: "شەش شت، نەک یەک" },
    q: { en: "Which things may the traffic police ask you to produce?", ku: "پۆلیسی هاتوچۆ دەتوانێت داوای چ شتێکت لێبکات؟" },
    o: [
      { en: "Licence, registration, inspection, warning triangle, fire extinguisher and first aid kit", ku: "مۆڵەت، سەنەوی، پشکنین، سێگۆشەی ئاگادارکردنەوە، ئاگرکوژێنەوە و سندووقی فریاگوزاری" },
      { en: "Only your driving licence", ku: "تەنها مۆڵەتی لێخوڕینەکەت" },
      { en: "Licence and insurance only", ku: "تەنها مۆڵەت و دڵنیایی" },
    ],
    why: { en: "All must be valid and unexpired, and the inspection sticker must be on the front windscreen.", ku: "هەموویان دەبێت کارا و بەسەرنەچوو بن، و ستیکەری پشکنین دەبێت لەسەر جامی پێشەوە بێت." },
    sayA: { en: "Six things, not one. Which things may the traffic police ask you to produce?", ku: "شەش شت، نەک یەک. پۆلیسی هاتوچۆ دەتوانێت داوای چ شتێکت لێبکات؟" },
    sayB: { en: "Licence, registration, inspection, warning triangle, fire extinguisher and first aid kit. All must be valid, and the inspection sticker goes on the windscreen. 745 more questions, free.", ku: "مۆڵەت، سەنەوی، پشکنین، سێگۆشەی ئاگادارکردنەوە، ئاگرکوژێنەوە و سندووقی فریاگوزاری. هەموویان دەبێت کارا بن، و ستیکەری پشکنین لەسەر جامی پێشەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "breaks", topic: "How often to rest on a long drive", label: "How often should you take a break on a long ", a: 0, bait: 2,
    hook: { en: "Five minutes every hour", ku: "پێنج خولەک لە هەر کاتژمێرێک" },
    q: { en: "How often should you take a break on a long drive?", ku: "لە گەشتێکی درێژدا چەند جار پشوو بدەیت؟" },
    o: [
      { en: "About five minutes' rest every hour", ku: "نزیکەی پێنج خولەک پشوو لە هەر کاتژمێرێکدا" },
      { en: "Twenty minutes every four hours", ku: "بیست خولەک لە هەر چوار کاتژمێرێکدا" },
      { en: "Only when you feel tired", ku: "تەنیا کاتێک هەست بە ماندووبوون دەکەیت" },
    ],
    why: { en: "Short, regular breaks work better than one long one, because tiredness builds before you notice it.", ku: "پشووی کورت و بەردەوام باشتر کار دەکات لە یەکێکی درێژ، چونکە ماندووبوون پێش ئەوەی هەستی پێبکەیت کۆدەبێتەوە." },
    sayA: { en: "Five minutes every hour. On a long drive, how often should you take a break?", ku: "پێنج خولەک لە هەر کاتژمێرێک. لە گەشتێکی درێژدا چەند جار پشوو بدەیت؟" },
    sayB: { en: "About five minutes' rest every hour. Short regular breaks beat one long one, because tiredness builds before you notice it. 745 more questions, free.", ku: "نزیکەی پێنج خولەک پشوو لە هەر کاتژمێرێکدا. پشووی کورت و بەردەوام باشترە لە یەکێکی درێژ، چونکە ماندووبوون پێش ئەوەی هەستی پێبکەیت کۆدەبێتەوە.  ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  /* Batch four: 40 new clips. Signs, first aid, mechanical faults and rules
     that did not overlap the first three batches — checked against them and
     against each other with scripts/check-topics.mjs. */

  {
    id: "minspeed", topic: "Minimum speed sign (blue circle)", label: "This blue circle shows a speed. What does it ", a: 0, bait: 1,
    hook: { en: "Blue means minimum, not maximum", ku: "شین واتای کەمترینە، نەک زۆرترین" },
    q: { en: "This blue circle shows a speed. What does it mean?", ku: "ئەم بازنە شینە خێراییەک پیشان دەدات. چی دەگەیەنێت؟" },
    o: [
      { en: "It is a MINIMUM speed — you must not drive slower than this", ku: "کەمترین خێراییە — نابێت لەمە هێواشتر لێبخوڕیت" },
      { en: "It is a maximum speed limit", ku: "بەرزترین سنووری خێراییە" },
      { en: "It is a recommended speed only", ku: "تەنها خێراییەکی پێشنیارکراوە" },
    ],
    why: { en: "Colour tells you which it is: a number in a RED ring is the maximum you may drive, while a number on a BLUE circle is the minimum. A minimum-speed sign keeps very slow vehicles off roads where they would be a hazard.", ku: "ڕەنگەکە پێت دەڵێت کامەیە: ژمارەیەک لە بازنەیەکی سووردا بەرزترین خێراییە کە دەتوانیت پێی بڕۆیت، بەڵام ژمارەیەک لەسەر بازنەیەکی شین کەمترین خێراییە." },
    sayA: { en: "Blue means minimum, not maximum. This blue circle shows a speed. What does it mean?", ku: "شین واتای کەمترینە، نەک زۆرترین. ئەم بازنە شینە خێراییەک پیشان دەدات. چی دەگەیەنێت؟" },
    sayB: { en: "It is a minimum speed — you must not drive slower than this. Red rings set a maximum, blue circles set a minimum. 745 more questions, free.", ku: "کەمترین خێراییە — نابێت لەمە هێواشتر لێبخوڕیت. بازنەی سوور زۆرترین خێراییە، بازنەی شین کەمترینە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "parkinghours", topic: "Parking hours sign — is now within the permitted time", label: "A blue 'P' parking sign permits parking from ", a: 0, bait: 1,
    hook: { en: "Read the hours before you park", ku: "پێش پارککردن کاتەکان بخوێنەوە" },
    q: { en: "A blue 'P' parking sign permits parking from 09:00 to 18:00. It is now 12:00 (noon). Is parking allowed?", ku: "هێمای 'P'ی شینی پارکینگ لە کاتژمێر ٩ی بەیانییەوە تا ٦ی ئێوارە پارککردن ڕێگەپێدەدات. ئێستا کاتژمێر ١٢ی نیوەڕۆیە. ئایا پارککردن ڕێگەپێدراوە؟" },
    o: [
      { en: "Yes — 12:00 is within the permitted hours", ku: "بەڵێ — ١٢ لە نێو کاتە ڕێگەپێدراوەکاندایە" },
      { en: "No — parking is forbidden now", ku: "نەخێر — ئێستا پارککردن قەدەغەیە" },
    ],
    why: { en: "Read the times on the parking sign: 12:00 falls between 09:00 and 18:00, so parking is allowed.", ku: "کاتەکانی سەر هێمای پارکینگ بخوێنەوە: ١٢ی نیوەڕۆ لە نێوان ٩ و ١٨دایە، بۆیە پارککردن ڕێگەپێدراوە." },
    sayA: { en: "Read the hours before you park. A blue P parking sign permits parking from 09:00 to 18:00. It is now 12:00 noon. Is parking allowed?", ku: "پێش پارککردن کاتەکان بخوێنەوە. هێمای 'P'ی شینی پارکینگ لە کاتژمێر ٩ی بەیانییەوە تا ٦ی ئێوارە پارککردن ڕێگەپێدەدات. ئێستا کاتژمێر ١٢ی نیوەڕۆیە. ئایا پارککردن ڕێگەپێدراوە؟" },
    sayB: { en: "Yes — 12:00 is within the permitted hours. Always read the times on the sign itself before you park. 745 more questions, free.", ku: "بەڵێ — ١٢ لە نێو کاتە ڕێگەپێدراوەکاندایە. هەمیشە پێش پارککردن کاتەکانی سەر هێماکە بخوێنەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "policeoverride", topic: "Traffic policeman's signal overrides the lights", label: "A traffic policeman signals you to go, but t", a: 0, bait: 1,
    hook: { en: "The policeman beats the light", ku: "پۆلیس لە چرا پێشترە" },
    q: { en: "A traffic policeman signals you to go, but the light is red. What do you do?", ku: "پۆلیسێکی هاتوچۆ ئاماژەت پێدەدات بڕۆیت، بەڵام چراکە سوورە. چی دەکەیت؟" },
    o: [
      { en: "Obey the policeman — their signal overrides lights and signs", ku: "گوێڕایەڵی پۆلیسەکە بە — ئاماژەکەیان لەسەر چرا و هێماکان دەڕوات" },
      { en: "Obey the red light and stay stopped", ku: "گوێڕایەڵی چرای سوور بە و بوەستە" },
      { en: "Sound the horn and wait", ku: "بۆری لێدە و چاوەڕێ بکە" },
    ],
    why: { en: "Section 17 gives the traffic policeman's signal priority over every other device. Obey it immediately even when it contradicts the lights or a sign.", ku: "بەندی ١٧ ئاماژەی پۆلیسی هاتوچۆ لەسەر هەموو ئامێرێکی تر پێشڕەو دەکات. دەستبەجێ گوێڕایەڵی بە تەنانەت کاتێک پێچەوانەی چراکان یان هێمایەک بێت." },
    sayA: { en: "The policeman beats the light. A traffic policeman signals you to go, but the light is red. What do you do?", ku: "پۆلیس لە چرا پێشترە. پۆلیسێکی هاتوچۆ ئاماژەت پێدەدات بڕۆیت، بەڵام چراکە سوورە. چی دەکەیت؟" },
    sayB: { en: "Obey the policeman — their signal overrides lights and signs. A traffic officer's signal always has priority over every device. 745 more questions, free.", ku: "گوێڕایەڵی پۆلیسەکە بە — ئاماژەکەیان لەسەر چرا و هێماکان دەڕوات. ئاماژەی ئەفسەری هاتوچۆ هەمیشە پێشڕەوە بەسەر هەموو ئامێرێکدا. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "speedcamera", topic: "What a speed-camera sign means", label: "What does this sign mean?", a: 2, bait: 0,
    hook: { en: "Not a no-photos sign", ku: "نیشانەی قەدەغەی وێنەگرتن نییە" },
    q: { en: "What does this sign mean?", ku: "ئەم هێمایە چی دەگەیەنێت؟" },
    o: [
      { en: "Photography is prohibited", ku: "وێنەگرتن قەدەغەیە" },
      { en: "Beware of side wind", ku: "ئاگاداربە لە بای تەنیشت" },
      { en: "The road is monitored by a speed camera", ku: "ڕێگاکە بە کامێرای خێرایی چاودێری دەکرێت" },
    ],
    why: { en: "A camera sign warns that speed is enforced by camera.", ku: "هێمای کامێرا ئاگادار دەکاتەوە کە خێرایی بە کامێرا چاودێری دەکرێت." },
    sayA: { en: "Not a no-photos sign. What does this sign mean?", ku: "نیشانەی قەدەغەی وێنەگرتن نییە. ئەم هێمایە چی دەگەیەنێت؟" },
    sayB: { en: "The road is monitored by a speed camera. The camera icon warns that speed here is enforced electronically. 745 more questions, free.", ku: "ڕێگاکە بە کامێرای خێرایی چاودێری دەکرێت. هێمای کامێرا ئاگادار دەکاتەوە کە خێرایی بە کامێرا چاودێری دەکرێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "nostopping", topic: "No-stopping sign forbids even a brief halt", label: "What does this road sign tell you to do?", a: 0, bait: 1,
    hook: { en: "No stopping means none at all", ku: "هیچ ڕاوەستانێک نییە بە تەواوی" },
    q: { en: "What does this road sign tell you to do?", ku: "ئەم هێمایە چی لێت دەوێت بکەیت؟" },
    o: [
      { en: "No stopping at all — you may not even stop briefly to pick someone up", ku: "هیچ ڕاوەستانێک نییە — تەنانەت بۆ ماوەیەکی کورتیش ناتوانیت بۆ سواركردنی کەسێک بوەستیت" },
      { en: "No parking, but a short stop to drop someone off is allowed", ku: "پارککردن قەدەغەیە، بەڵام ڕاوەستانێکی کورت بۆ دابەزاندن ڕێگەپێدراوە" },
      { en: "Parking is allowed for a limited time", ku: "پارککردن بۆ ماوەیەکی سنووردار ڕێگەپێدراوە" },
    ],
    why: { en: "The blue disc with a red cross means no stopping and no parking. Unlike the no-parking sign (a single diagonal), this one forbids even a brief halt to set down or pick up — keep moving unless traffic or an emergency forces you to stop.", ku: "بازنە شینەکە لەگەڵ خاچی سوور واتای قەدەغەبوونی ڕاوەستان و پارککردنە." },
    sayA: { en: "No stopping means none at all. What does this road sign tell you to do?", ku: "هیچ ڕاوەستانێک نییە بە تەواوی. ئەم هێمایە چی لێت دەوێت بکەیت؟" },
    sayB: { en: "No stopping at all — not even briefly to pick someone up. A single diagonal line means no parking only; this crossed disc bans any halt. 745 more questions, free.", ku: "هیچ ڕاوەستانێک نییە — تەنانەت بۆ ماوەیەکی کورتیش. هێڵێکی لار تەنها واتای قەدەغەی پارککردنە؛ ئەم بازنە خاچدارە هەر ڕاوەستانێک قەدەغە دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "heightlimit", topic: "Height-limit sign before a bridge or tunnel", label: "What does this warning sign show?", a: 0, bait: 2,
    hook: { en: "Know your vehicle's height", ku: "بەرزی ئۆتۆمبیلەکەت بزانە" },
    q: { en: "What does this warning sign show?", ku: "ئەم هێمای ئاگادارکردنەوەیە چی پیشان دەدات؟" },
    o: [
      { en: "Vehicles higher than the figure shown may not pass", ku: "ئۆتۆمبیلی بەرزتر لە ژمارەی نیشانکراو ناتوانێت تێبپەڕێت" },
      { en: "The road ahead is that far away", ku: "ڕێگای پێشەوە بەو دووریە دوورە" },
      { en: "The bridge ahead is that wide", ku: "پردی پێشەوە بەو پانییەیە" },
    ],
    why: { en: "The figure is the maximum height allowed, usually because of a bridge or tunnel ahead. Know your vehicle's height, including any roof load — striking a bridge is a serious offence and a serious danger.", ku: "ژمارەکە بەرزترین بەرزی ڕێگەپێدراوە، زۆرجار بەهۆی پرد یان تونێلێک لە پێشەوە." },
    sayA: { en: "Know your vehicle's height. What does this warning sign show?", ku: "بەرزی ئۆتۆمبیلەکەت بزانە. ئەم هێمای ئاگادارکردنەوەیە چی پیشان دەدات؟" },
    sayB: { en: "Vehicles higher than the figure shown may not pass. It marks the maximum height before a bridge or tunnel — know your vehicle's height, roof load included. 745 more questions, free.", ku: "ئۆتۆمبیلی بەرزتر لە ژمارەی نیشانکراو ناتوانێت تێبپەڕێت. بەرزترین بەرزی ڕێگەپێدراوە پێش پرد یان تونێل — بەرزی ئۆتۆمبیلەکەت لەگەڵ باری سەر سەقف بزانە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "aircraft", topic: "Low-flying aircraft warning sign", label: "What is this triangular warning sign about?", a: 1, bait: 0,
    hook: { en: "Not a railway warning", ku: "ئاگاداری هێڵی شەمەندەفەر نییە" },
    q: { en: "What is this triangular warning sign about?", ku: "ئەم هێمایە سێگۆشەییە دەربارەی چییە؟" },
    o: [
      { en: "Beware of a railway ahead", ku: "ئاگاداربە لە هێڵی شەمەندەفەر لە پێشەوە" },
      { en: "Beware of low-flying aircraft in this area", ku: "ئاگاداربە لە نزمفڕینی فڕۆکەکان لەم ناوچەیە" },
      { en: "Beware of wild animals crossing", ku: "ئاگاداربە لە پەڕینەوەی ئاژەڵی کێوی" },
    ],
    why: { en: "A triangle with an aircraft warns of low-flying aircraft.", ku: "سێگۆشە لەگەڵ فڕۆکە ئاگادار دەکاتەوە لە نزمفڕینی فڕۆکە." },
    sayA: { en: "Not a railway warning. What is this triangular warning sign about?", ku: "ئاگاداری هێڵی شەمەندەفەر نییە. ئەم هێمایە سێگۆشەییە دەربارەی چییە؟" },
    sayB: { en: "Beware of low-flying aircraft in this area. A triangle with an aircraft warns of planes flying low nearby, often near an airport. 745 more questions, free.", ku: "ئاگاداربە لە نزمفڕینی فڕۆکەکان لەم ناوچەیە. سێگۆشە لەگەڵ فڕۆکە ئاگادار دەکاتەوە لە نزمفڕینی فڕۆکە، زۆرجار لە نزیک فڕۆکەخانە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "slowvehicle", topic: "Red reflective triangle on a slow vehicle", label: "A vehicle carries a red reflective triangle ", a: 0, bait: 1,
    hook: { en: "A triangle that means slow, not dangerous", ku: "سێگۆشەیەک واتای هێواشە، نەک مەترسیدار" },
    q: { en: "A vehicle carries a red reflective triangle on the back. What does it tell you?", ku: "سوارڕۆیەک سێگۆشەیەکی سووری تیشکدەرەوەی لە دواوەیە. چیت پێدەڵێت؟" },
    o: [
      { en: "It cannot go faster than 30 km/h", ku: "ناتوانێت لە ٣٠ کم/کاتژمێر خێراتر بڕوات" },
      { en: "It is carrying dangerous goods", ku: "باری مەترسیدار هەڵدەگرێت" },
      { en: "It is a learner driver", ku: "شۆفێرێکی فێرخوازە" },
    ],
    why: { en: "The reflective triangle marks a slow vehicle — a tractor or harvester that cannot exceed 30 km/h. You close on it far faster than you expect, so start planning to overtake as soon as you see it.", ku: "سێگۆشەی تیشکدەرەوە نیشانەی سوارڕۆیەکی هێواشە — تراکتۆر یان دەڕاسەیەک کە ناتوانێت لە ٣٠ کم/کاتژمێر تێپەڕێت." },
    sayA: { en: "A triangle that means slow, not dangerous. A vehicle carries a red reflective triangle on the back. What does it tell you?", ku: "سێگۆشەیەک واتای هێواشە، نەک مەترسیدار. سوارڕۆیەک سێگۆشەیەکی سووری تیشکدەرەوەی لە دواوەیە. چیت پێدەڵێت؟" },
    sayB: { en: "It cannot go faster than 30 km/h. It marks a slow vehicle like a tractor — you close on it far faster than you expect, so plan to overtake early. 745 more questions, free.", ku: "ناتوانێت لە ٣٠ کم/کاتژمێر خێراتر بڕوات. نیشانەی سوارڕۆیەکی هێواشە وەک تراکتۆر — زۆر خێراتر لێی نزیک دەبیتەوە، بۆیە زوو پلان بۆ تێپەڕاندن دابنێ. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "lorrygap", topic: "Minimum gap sign for lorries on a descent", label: "A red-ringed sign shows two lorries and 70 m", a: 0, bait: 2,
    hook: { en: "70 metres is a gap, not a length", ku: "٧٠ مەتر بۆشاییە، نەک درێژی" },
    q: { en: "A red-ringed sign shows two lorries and 70 m. What does it require?", ku: "هێمایەکی بازنە سوور دوو بارهەڵگر و «٧٠ م» پیشان دەدات. داوای چی دەکات؟" },
    o: [
      { en: "Lorries must keep at least 70 m apart", ku: "بارهەڵگرەکان دەبێت بەلایەنی کەم ٧٠ مەتر لە یەکتر دوور بن" },
      { en: "Lorries may not travel more than 70 m along this road", ku: "بارهەڵگرەکان نابێت زیاتر لە ٧٠ مەتر بەم ڕێگایەدا بڕۆن" },
      { en: "The bridge ahead is 70 m long", ku: "پردی پێشەوە ٧٠ مەتر درێژە" },
    ],
    why: { en: "It sets a minimum gap between heavy vehicles, usually on a long descent, in a tunnel or on a weight-limited bridge. Spacing them out keeps the load on the structure down and leaves room to stop.", ku: "کەمترین بۆشایی نێوان سوارڕۆ قورسەکان دیاری دەکات، زۆرجار لەسەر نشێوێکی درێژ، لە تونێل یان لەسەر پردێکی سنووردار." },
    sayA: { en: "70 metres is a gap, not a length. A red-ringed sign shows two lorries and 70 metres. What does it require?", ku: "٧٠ مەتر بۆشاییە، نەک درێژی. هێمایەکی بازنە سوور دوو بارهەڵگر و «٧٠ م» پیشان دەدات. داوای چی دەکات؟" },
    sayB: { en: "Lorries must keep at least 70 metres apart. It sets a minimum gap on a long descent or tunnel, so the load on the road stays spread out. 745 more questions, free.", ku: "بارهەڵگرەکان دەبێت بەلایەنی کەم ٧٠ مەتر لە یەکتر دوور بن. کەمترین بۆشایی لەسەر نشێوێکی درێژ یان لە تونێل دیاری دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "stepsigns", topic: "Footbridge vs pedestrian underpass sign", label: "One blue sign shows a person walking UP step", a: 0, bait: 1,
    hook: { en: "Up or down changes everything", ku: "سەرکەوتن یان دابەزین هەموو شتێک دەگۆڕێت" },
    q: { en: "One blue sign shows a person walking UP steps, another shows a person walking DOWN steps. What is the difference?", ku: "هێمایەکی شین کەسێک پیشان دەدات کە بە پلەکاندا سەردەکەوێت، ئەوی تر کەسێک کە دادەبەزێت. جیاوازییەکە چییە؟" },
    o: [
      { en: "Up steps is a pedestrian footbridge; down steps is a pedestrian underpass", ku: "سەرکەوتن بە پلەکاندا پردی پەڕینەوەی پیادەیە؛ دابەزین ڕێگای ژێرزەمینییە" },
      { en: "They both mean the same crossing", ku: "هەردووکیان هەمان پەڕینەوە دەگەیەنن" },
      { en: "One is for cyclists only", ku: "یەکێکیان تەنها بۆ پاسکیلسوارانە" },
    ],
    why: { en: "The direction of the steps tells you whether you cross over the road or under it. Both keep pedestrians off the carriageway, and where one is provided it should be used rather than crossing the road itself.", ku: "ئاراستەی پلەکان پێت دەڵێت ئایا بەسەر ڕێگاکەدا دەپەڕیتەوە یان لەژێریدا." },
    sayA: { en: "Up or down changes everything. One blue sign shows a person walking up steps, another shows walking down. What is the difference?", ku: "سەرکەوتن یان دابەزین هەموو شتێک دەگۆڕێت. هێمایەکی شین کەسێک پیشان دەدات کە بە پلەکاندا سەردەکەوێت، ئەوی تر کەسێک کە دادەبەزێت. جیاوازییەکە چییە؟" },
    sayB: { en: "Up steps is a footbridge; down steps is an underpass. Both keep pedestrians off the road, and where one exists it should be used. 745 more questions, free.", ku: "سەرکەوتن بە پلەکاندا پردی پەڕینەوەی پیادەیە؛ دابەزین ڕێگای ژێرزەمینییە. هەردووکیان پیادە لە ڕێگاکە دوور دەخەنەوە، و پێویستە بەکاربهێنرێن. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "stripedbarrier", topic: "Striped barrier board — which side to pass", label: "A road is blocked by a striped barrier board", a: 0, bait: 1,
    hook: { en: "The stripes point the way through", ku: "خەتەکان ڕێگای تێپەڕین پیشان دەدەن" },
    q: { en: "A road is blocked by a striped barrier board. How do you know which way to pass?", ku: "ڕێگایەک بە تەختەیەکی بەربەستی خەتدار داخراوە. چۆن دەزانیت بە کام لادا تێبپەڕیت؟" },
    o: [
      { en: "Diagonal stripes lean toward the side you should pass; vertical stripes mean the road is closed", ku: "خەتە لارەکان بەرەو ئەو لایە دەچەمێنەوە کە دەبێت لێیەوە تێبپەڕیت؛ خەتە ستوونییەکان واتە ڕێگاکە داخراوە" },
      { en: "You always pass on the right", ku: "هەمیشە بەلای ڕاستدا تێدەپەڕیت" },
      { en: "The board only marks the edge of the road", ku: "تەختەکە تەنها لێواری ڕێگاکە دیاری دەکات" },
    ],
    why: { en: "Read the lean of the stripes: they point to the open side. Upright stripes mean there is no way through at all. The same logic runs through chevron boards on a bend.", ku: "سەیری چەمانەوەی خەتەکان بکە: ئاماژە بەو لایە دەکەن کە کراوەیە." },
    sayA: { en: "The stripes point the way through. A road is blocked by a striped barrier board. How do you know which way to pass?", ku: "خەتەکان ڕێگای تێپەڕین پیشان دەدەن. ڕێگایەک بە تەختەیەکی بەربەستی خەتدار داخراوە. چۆن دەزانیت بە کام لادا تێبپەڕیت؟" },
    sayB: { en: "Diagonal stripes lean toward the side you should pass; vertical stripes mean the road is fully closed. The same logic runs through chevron bend boards. 745 more questions, free.", ku: "خەتە لارەکان بەرەو ئەو لایە دەچەمێنەوە کە دەبێت لێیەوە تێبپەڕیت؛ خەتە ستوونییەکان واتە ڕێگاکە بە تەواوی داخراوە. هەمان لۆژیک لە تەختەکانی پێچدا هەیە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "cyclecolor", topic: "Blue vs red circular bicycle sign", label: "A BLUE circle with a bicycle. How does it di", a: 0, bait: 2,
    hook: { en: "Same bicycle, opposite meaning", ku: "هەمان پاسکیل، پێچەوانەی واتا" },
    q: { en: "A BLUE circle with a bicycle. How does it differ from a bicycle in a RED ring?", ku: "بازنەیەکی شین بە پاسکیلەوە. چ جیاوازییەکی هەیە لەگەڵ پاسکیلێک لەناو بازنەی سوور؟" },
    o: [
      { en: "Blue orders — this route is for cyclists; red forbids — no bicycles", ku: "شین فەرمان دەکات — ئەم ڕێڕەوە بۆ پاسکیلسوارە؛ سوور قەدەغە دەکات — پاسکیل قەدەغەیە" },
      { en: "They mean exactly the same thing", ku: "هەردووکیان هەمان شت دەگەیەنن" },
      { en: "Blue is a warning, red is information", ku: "شین ئاگادارکردنەوەیە، سوور زانیارییە" },
    ],
    why: { en: "Colour carries the grammar of the sign: a blue circle gives an order or marks a route, a red ring forbids. The same bicycle symbol means opposite things in each.", ku: "ڕەنگ ڕێزمانی تابلۆکە هەڵدەگرێت: بازنەی شین فەرمان دەدات یان ڕێڕەو دیاری دەکات، بازنەی سوور قەدەغە دەکات." },
    sayA: { en: "Same bicycle, opposite meaning. A blue circle with a bicycle — how does it differ from a bicycle in a red ring?", ku: "هەمان پاسکیل، پێچەوانەی واتا. بازنەیەکی شین بە پاسکیلەوە. چ جیاوازییەکی هەیە لەگەڵ پاسکیلێک لەناو بازنەی سوور؟" },
    sayB: { en: "Blue orders — this route is for cyclists; red forbids — no bicycles. Colour is the grammar of the sign: blue commands, red forbids. 745 more questions, free.", ku: "شین فەرمان دەکات — ئەم ڕێڕەوە بۆ پاسکیلسوارە؛ سوور قەدەغە دەکات — پاسکیل قەدەغەیە. ڕەنگ ڕێزمانی تابلۆکەیە: شین فەرمان دەدات، سوور قەدەغە دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "escapelane", topic: "Escape lane sign for runaway heavy vehicles", label: "A blue sign shows a lorry climbing a short r", a: 0, bait: 2,
    hook: { en: "Gravel that saves lives, not a rest stop", ku: "خشڵێک کە ژیان ڕزگار دەکات، نەک شوێنی حەوانەوە" },
    q: { en: "A blue sign shows a lorry climbing a short ramp. What is it?", ku: "تابلۆیەکی شین بارهەڵگرێک پیشان دەدات کە بە هەورازێکی کورتدا سەردەکەوێت. ئەوە چییە؟" },
    o: [
      { en: "An escape lane, for a runaway heavy vehicle", ku: "شوێنی قەڵایانی ئۆتۆمبیلی گەورەی لەبەرچووەکەوە" },
      { en: "A pedestrian crossing", ku: "شوێنی پەڕینەوەی پیادە" },
      { en: "A hospital", ku: "نەخۆشخانە" },
    ],
    why: { en: "It marks an escape lane — a short uphill bed of gravel or sand set beside a long descent, there to stop a heavy vehicle whose brakes have overheated and faded. It is an emergency device, not a parking or rest area.", ku: "ئەمە شوێنی قەڵایانە — هەورازێکی کورتی زبڵ یان لم لەتەنیشت نشێوێکی درێژ." },
    sayA: { en: "Gravel that saves lives, not a rest stop. A blue sign shows a lorry climbing a short ramp of loose material. What is it?", ku: "خشڵێک کە ژیان ڕزگار دەکات، نەک شوێنی حەوانەوە. تابلۆیەکی شین بارهەڵگرێک پیشان دەدات کە بە هەورازێکی کورتدا سەردەکەوێت. ئەوە چییە؟" },
    sayB: { en: "An escape lane, where a runaway heavy vehicle can be brought to a stop. It is an emergency device only — never pull into one for any other reason. 745 more questions, free.", ku: "شوێنی قەڵایانی ئۆتۆمبیلی گەورە کە لەبەرچووەکە تێیدا دەوەستێنرێت. تەنها ئامرازی فریاکەوتنە — هەرگیز بۆ هیچ هۆکارێکی تر مەچۆرە ناوی. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "givewaystop", topic: "Give way sign vs stop sign", label: "What is the difference between a GIVE WAY si", a: 0, bait: 1,
    hook: { en: "Rolling through is not always allowed", ku: "بەردەوامبوون هەمیشە ڕێگەپێدراو نییە" },
    q: { en: "What is the difference between a GIVE WAY sign and a STOP sign?", ku: "جیاوازی نێوان هێمای ڕێگە بدە و هێمای STOP چییە؟" },
    o: [
      { en: "Give way means let others pass and go on if clear; STOP means you must halt completely at the line first", ku: "ڕێگە بدە واتە ڕێگە بە ئەوانی تر بدە و ئەگەر ڕوون بوو بڕۆ؛ STOP واتە دەبێت سەرەتا بە تەواوی لەلای هێڵەکە بوەستیت" },
      { en: "They mean exactly the same thing", ku: "هەردووکیان هەمان واتا دەگەیەنن" },
      { en: "Stop applies only to lorries", ku: "STOP تەنها بۆ بارهەڵگرەکانە" },
    ],
    why: { en: "Give way lets you roll through if the road is genuinely clear. STOP does not: the wheels must stop turning at the line, and only then do you look right, left and right again before moving off.", ku: "ڕێگە بدە ڕێگەت پێدەدات بڕۆیت ئەگەر ڕێگاکە بەڕاستی ڕوون بێت." },
    sayA: { en: "Rolling through is not always allowed. What is the difference between a give way sign and a stop sign?", ku: "بەردەوامبوون هەمیشە ڕێگەپێدراو نییە. جیاوازی نێوان هێمای ڕێگە بدە و هێمای STOP چییە؟" },
    sayB: { en: "Give way lets you roll through if clear; stop means your wheels must fully stop at the line first, then look right, left and right again. 745 more questions, free.", ku: "ڕێگە بدە ڕێگەت پێدەدات ئەگەر ڕوون بوو بڕۆیت؛ STOP واتە دەبێت سەرەتا تایەکان لەلای هێڵەکە بوەستن، پاشان ڕاست، چەپ و دووبارە ڕاست سەیر بکە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "snakebite", topic: "What not to do for a snake or scorpion bite", label: "Someone is bitten by a snake or stung by a s", a: 0, bait: 2,
    hook: { en: "Cutting and sucking make it worse", ku: "بڕین و هەڵمژین خراپتری دەکات" },
    q: { en: "Someone is bitten by a snake or stung by a scorpion. What must you NOT do?", ku: "کەسێک مار پێیدا داوە یان دووپشک پێیوەداوە. چی نابێت بکەیت؟" },
    o: [
      { en: "Cut the wound, suck out the venom or apply ice", ku: "برینەکە ببڕیت، ژەهرەکە هەڵمژیت یان سەهۆڵی بخەیتە سەر" },
      { en: "Keep them still and calm", ku: "بێجوڵە و ئارامیان ڕابگریت" },
      { en: "Remove rings and watches", ku: "ئەنگوستیلە و کاتژمێر لابەیت" },
    ],
    why: { en: "Cutting and sucking spread the venom and add infection; ice damages the tissue further. Keep the person still so the venom moves slowly, wash the site, remove anything tight before swelling, and call 122.", ku: "بڕین و هەڵمژین ژەهرەکە بڵاو دەکەنەوە و هەوکردنیش زیاد دەکەن." },
    sayA: { en: "Cutting and sucking make it worse. Someone is bitten by a snake or stung by a scorpion. What must you not do?", ku: "بڕین و هەڵمژین خراپتری دەکات. کەسێک مار پێیدا داوە یان دووپشک پێیوەداوە. چی نابێت بکەیت؟" },
    sayB: { en: "Cut the wound, suck out the venom, or apply ice. Cutting and sucking spread the venom; ice damages the tissue. Keep them still and call 122. 745 more questions, free.", ku: "برینەکە ببڕیت، ژەهرەکە هەڵمژیت یان سەهۆڵی بخەیتە سەر. بڕین و هەڵمژین ژەهرەکە بڵاو دەکەنەوە؛ سەهۆڵ زیانی زیاتر دەگەیەنێت. کەسەکە بێجوڵە ڕابگرە و پەیوەندی بە ١٢٢ بکە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "injuredeye", topic: "What not to do for an injured eye", label: "A casualty has an injured eye. What must you", a: 0, bait: 1,
    hook: { en: "Never wash an injured eye", ku: "هەرگیز چاوی بریندار مەشۆ" },
    q: { en: "A casualty has an injured eye. What must you not do?", ku: "برینداریک چاوی بریندار بووە. چی نابێت بکەیت؟" },
    o: [
      { en: "Wash or clean it — just cover it with a clean soft cloth", ku: "بیشۆیت یان پاکی بکەیتەوە — تەنها بە پارچە قوماشێکی پاک و نەرم دایپۆشە" },
      { en: "Cover it with a clean cloth", ku: "بە پارچە قوماشێکی پاک دایپۆشە" },
    ],
    why: { en: "Washing an injured eye can drive debris deeper and damage it further. Cover it gently and leave it to the hospital.", ku: "شوشتنی چاوێکی بریندار دەتوانێت پاشماوە قووڵتر ببات و زیانی زیاتری پێبگەیەنێت." },
    sayA: { en: "Never wash an injured eye. A casualty has an injured eye. What must you not do?", ku: "هەرگیز چاوی بریندار مەشۆ. برینداریک چاوی بریندار بووە. چی نابێت بکەیت؟" },
    sayB: { en: "Wash or clean it — just cover it with a clean soft cloth instead. Washing can drive debris deeper and damage the eye further. 745 more questions, free.", ku: "بیشۆیت یان پاکی بکەیتەوە — تەنها بە پارچە قوماشێکی پاک و نەرم دایپۆشە. شوشتن پاشماوە قووڵتر دەبات و زیانی زیاتر دەگەیەنێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "crowdcontrol", topic: "Moving a crowd away from an injured person", label: "A crowd is gathering around an injured perso", a: 0, bait: 1,
    hook: { en: "More people is not more help", ku: "خەڵکی زیاتر یارمەتی زیاتر نییە" },
    q: { en: "A crowd is gathering around an injured person. What should you do?", ku: "خەڵکێک لە دەوری کەسێکی بریندار کۆدەبنەوە. چی دەکەیت؟" },
    o: [
      { en: "Try to move them back", ku: "هەوڵبدە دووریان بخەیتەوە" },
      { en: "Let them stay — more help is better", ku: "بیانهێڵە — یارمەتی زیاتر باشترە" },
      { en: "Ask them to lift the casualty", ku: "داوایان لێبکە برینداری هەڵبگرن" },
    ],
    why: { en: "A crowd frightens the casualty and blocks the paramedics when they arrive. Once the medical team is there, step back yourself and let the people who are trained get on with it.", ku: "کۆمەڵێک خەڵک برینداری دەتۆقێنێت و ڕێگا لە تیمی فریاگوزاری دەگرێت." },
    sayA: { en: "More people is not more help. A crowd is gathering around an injured person. What should you do?", ku: "خەڵکی زیاتر یارمەتی زیاتر نییە. خەڵکێک لە دەوری کەسێکی بریندار کۆدەبنەوە. چی دەکەیت؟" },
    sayB: { en: "Try to move them back. A crowd frightens the casualty and blocks paramedics when they arrive — step back once trained help is there. 745 more questions, free.", ku: "هەوڵبدە دووریان بخەیتەوە. کۆمەڵێک خەڵک برینداری دەتۆقێنێت و ڕێگا لە تیمی فریاگوزاری دەگرێت. کاتێک تیمی پزیشکی گەیشت، خۆشت بکشێرەوە دواوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "internalbleed", topic: "Blood from the ear or mouth after a crash", label: "Blood is coming from a casualty's ear or mou", a: 0, bait: 2,
    hook: { en: "Blood from an ear is never nothing", ku: "خوێن لە گوێوە هەرگیز هیچی نییە" },
    q: { en: "Blood is coming from a casualty's ear or mouth after a crash. What does that suggest?", ku: "دوای ڕوودانێک خوێن لە گوێ یان دەمی برینداریکەوە دێت. ئەمە چی دەگەیەنێت؟" },
    o: [
      { en: "Internal injury — call 122 at once", ku: "برینداری ناوەکی — دەستبەجێ پەیوەندی بە ١٢٢ بکە" },
      { en: "A minor cut inside the mouth", ku: "بڕینێکی سووکی ناو دەم" },
      { en: "Nothing serious", ku: "هیچی گرنگ نییە" },
    ],
    why: { en: "Bleeding from an orifice — nose, ear or mouth — points to damage you cannot see. Other signs of internal bleeding are swelling and blue skin, a fast heart rate, rapid breathing, thirst and dizziness.", ku: "خوێنبەربوون لە کونێکەوە — لووت، گوێ یان دەم — ئاماژەیە بۆ زیانێک کە نایبینیت." },
    sayA: { en: "Blood from an ear is never nothing. Blood is coming from a casualty's ear or mouth after a crash. What does that suggest?", ku: "خوێن لە گوێوە هەرگیز هیچی نییە. دوای ڕوودانێک خوێن لە گوێ یان دەمی برینداریکەوە دێت. ئەمە چی دەگەیەنێت؟" },
    sayB: { en: "Internal injury — call 122 at once. Bleeding from the nose, ear or mouth points to damage you cannot see. 745 more questions, free.", ku: "برینداری ناوەکی — دەستبەجێ پەیوەندی بە ١٢٢ بکە. خوێنبەربوون لە لووت، گوێ یان دەم ئاماژەیە بۆ زیانێک کە نایبینیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "firstaidaim", topic: "The stated aim of first aid", label: "What is the stated aim of first aid?", a: 0, bait: 1,
    hook: { en: "First aid does not mean treat", ku: "فریاگوزاری واتای چارەسەرکردن نییە" },
    q: { en: "What is the stated aim of first aid?", ku: "ئامانجی دیاریکراوی فریاگوزاری سەرەتایی چییە؟" },
    o: [
      { en: "To rescue the person until help arrives — not to treat them", ku: "ڕزگارکردنی کەسەکە تا یارمەتی دەگات — نەک چارەسەرکردنیان" },
      { en: "To treat the injury completely", ku: "چارەسەرکردنی تەواوی برینەکە" },
      { en: "To decide who caused the crash", ku: "بڕیاردان لەوەی کێ هۆکاری ڕووداوەکە بووە" },
    ],
    why: { en: "Anyone may give first aid, provided it is done correctly so as not to make things worse. Its three principles are: protect life, prevent deterioration, speed the treatment.", ku: "هەر کەسێک دەتوانێت فریاگوزاری سەرەتایی بکات، بەمەرجێک بە دروستی بکرێت." },
    sayA: { en: "First aid does not mean treat. What is the stated aim of first aid?", ku: "فریاگوزاری واتای چارەسەرکردن نییە. ئامانجی دیاریکراوی فریاگوزاری سەرەتایی چییە؟" },
    sayB: { en: "To rescue the person until help arrives — not to treat them. Its three principles: protect life, prevent deterioration, speed the treatment. 745 more questions, free.", ku: "ڕزگارکردنی کەسەکە تا یارمەتی دەگات — نەک چارەسەرکردنیان. سێ بنەماکەی: پاراستنی ژیان، ڕێگرتن لە خراپتربوون، خێراکردنی چارەسەر. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "stayatscene", topic: "Why you must stay at a crash scene", label: "You have been in a crash. Why must you stay ", a: 0, bait: 2,
    hook: { en: "Leaving costs you either way", ku: "چوون بەهەر شێوەیەک تاوانە" },
    q: { en: "You have been in a crash. Why must you stay at the scene?", ku: "تووشی ڕووداوێک بوویت. بۆچی دەبێت لە شوێنەکە بمێنیتەوە؟" },
    o: [
      { en: "Leaving carries a heavy penalty whether or not you caused it", ku: "بەجێهێشتن سزایەکی گرانی لێدەکەوێتەوە جا تۆ هۆکاری بویت یان نا" },
      { en: "Only the driver at fault must stay", ku: "تەنها ئەو شۆفێرەی هەڵەکەی کردووە دەبێت بمێنێتەوە" },
      { en: "You may leave once you have photographed it", ku: "دەتوانیت بڕۆیت کاتێک وێنەت گرت" },
    ],
    why: { en: "Stay calm, call the police and first aid, put your hazard lights on, and photograph the scene before moving the car. If you smell petrol or fuel, get out immediately.", ku: "ئارام بە، پەیوەندی بە پۆلیس و فریاگوزاری بکە، لایتی مەترسی داگیرسێنە." },
    sayA: { en: "Leaving costs you either way. You have been in a crash. Why must you stay at the scene?", ku: "چوون بەهەر شێوەیەک تاوانە. تووشی ڕووداوێک بوویت. بۆچی دەبێت لە شوێنەکە بمێنیتەوە؟" },
    sayB: { en: "Leaving carries a heavy penalty whether or not you caused it. Stay calm, call the police, put on hazard lights, and photograph the scene. 745 more questions, free.", ku: "بەجێهێشتن سزایەکی گرانی لێدەکەوێتەوە جا هۆکاری بویت یان نا. ئارام بە، پەیوەندی بە پۆلیس بکە، لایتی مەترسی داگیرسێنە، و وێنەی شوێنەکە بگرە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "arterialbleed", topic: "Recognising arterial bleeding", label: "Bright red blood is spurting from a wound. W", a: 0, bait: 2,
    hook: { en: "Spurting blood is the dangerous kind", ku: "خوێنی فیشقەیی جۆرە مەترسیدارەکەیە" },
    q: { en: "Bright red blood is spurting from a wound. What does that tell you?", ku: "خوێنی سووری گەش بە فیشقە لە برینێکەوە دێتە دەرەوە. ئەمە چیت پێدەڵێت؟" },
    o: [
      { en: "It is arterial bleeding — the most dangerous kind", ku: "خوێنبەربوونی لوولە خوێنبەرەکانە — مەترسیدارترین جۆر" },
      { en: "It is a minor surface graze", ku: "خوڕانەوەیەکی سووکی ڕووکەشە" },
      { en: "It is venous bleeding", ku: "خوێنبەربوونی لوولە خوێنهێنەرەکانە" },
    ],
    why: { en: "Bright red and pulsing means it is coming straight from the heart under pressure, and it must be stopped at once. Dark red blood that flows steadily is venous — serious, but less immediately life-threatening.", ku: "سووری گەش و لێدەردار واتای ئەوەیە ڕاستەوخۆ لە دڵەوە بە فشار دێت." },
    sayA: { en: "Spurting blood is the dangerous kind. Bright red blood is spurting from a wound. What does that tell you?", ku: "خوێنی فیشقەیی جۆرە مەترسیدارەکەیە. خوێنی سووری گەش بە فیشقە لە برینێکەوە دێتە دەرەوە. ئەمە چیت پێدەڵێت؟" },
    sayB: { en: "It is arterial bleeding — the most dangerous kind. Bright red and pulsing means it comes straight from the heart and must be stopped at once. 745 more questions, free.", ku: "خوێنبەربوونی لوولە خوێنبەرەکانە — مەترسیدارترین جۆر. سووری گەش و لێدەردار واتای ئەوەیە ڕاستەوخۆ لە دڵەوە بە فشار دێت، دەبێت دەستبەجێ بوەستێنرێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "callemergency", topic: "What to say first when calling emergency services", label: "You are calling the emergency services from ", a: 0, bait: 1,
    hook: { en: "Say who and where before what", ku: "پێش هەموو شتێک بڵێ کێی و لەکوێی" },
    q: { en: "You are calling the emergency services from a crash. What should you say first?", ku: "لە شوێنی ڕوودانێکەوە پەیوەندی بە فریاکەوتنەوە دەکەیت. سەرەتا چی دەڵێیت؟" },
    o: [
      { en: "Who you are, then the location, the type of crash and the number of casualties", ku: "خۆت بناسێنە، پاشان شوێنەکە، جۆری ڕوودانەکە و ژمارەی بریندارەکان" },
      { en: "Just ask them to hurry", ku: "تەنها داوایان لێبکە پەلە بکەن" },
      { en: "Describe each injury in detail first", ku: "سەرەتا هەر برینێک بە وردی باس بکە" },
    ],
    why: { en: "Look at the scene before you dial — how many vehicles, how many people hurt — so you can give it in one go. Mention any fire risk. If others are there, ask one of them to call as well.", ku: "پێش پەیوەندیکردن سەیری شوێنەکە بکە — چەند ئۆتۆمبیل، چەند کەس بریندار." },
    sayA: { en: "Say who and where before what. You are calling the emergency services from a crash. What should you say first?", ku: "پێش هەموو شتێک بڵێ کێی و لەکوێی. لە شوێنی ڕوودانێکەوە پەیوەندی بە فریاکەوتنەوە دەکەیت. سەرەتا چی دەڵێیت؟" },
    sayB: { en: "Who you are, then the location, the type of crash and the number of casualties. Look at the scene before you dial so you can give it in one go. 745 more questions, free.", ku: "خۆت بناسێنە، پاشان شوێنەکە، جۆری ڕوودانەکە و ژمارەی بریندارەکان. پێش پەیوەندیکردن سەیری شوێنەکە بکە تا بە یەک جار بیڵێیت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "acidburn", topic: "First aid for battery acid on the skin", label: "Battery acid has splashed onto someone's ski", a: 0, bait: 2,
    hook: { en: "Water first, hospital second", ku: "سەرەتا ئاو، دواتر نەخۆشخانە" },
    q: { en: "Battery acid has splashed onto someone's skin. What comes first?", ku: "تروشی باتری چۆتە سەر پێستی کەسێک. یەکەم شت چییە؟" },
    o: [
      { en: "Wash the area with water as soon as possible", ku: "بە زووترین کات شوێنەکە بە ئاو بشۆرەوە" },
      { en: "Cover it with a dry cloth", ku: "بە پارچەیەکی وشک دایبپۆشە" },
      { en: "Drive them to hospital straight away", ku: "دەستبەجێ بیانبە بۆ نەخۆشخانە" },
    ],
    why: { en: "Acid keeps burning while it is on the skin. Flushing with water dilutes and removes it; only then think about hospital.", ku: "ترش بەردەوام دەسووتێنێت هەتا لەسەر پێست بێت." },
    sayA: { en: "Water first, hospital second. Battery acid has splashed onto someone's skin. What comes first?", ku: "سەرەتا ئاو، دواتر نەخۆشخانە. تروشی باتری چۆتە سەر پێستی کەسێک. یەکەم شت چییە؟" },
    sayB: { en: "Wash the area with water as soon as possible. Acid keeps burning while it is on the skin — flushing dilutes and removes it. 745 more questions, free.", ku: "بە زووترین کات شوێنەکە بە ئاو بشۆرەوە. ترش بەردەوام دەسووتێنێت هەتا لەسەر پێست بێت — شۆردنەوە ڕەقی دەکاتەوە و لایدەبات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "electricburn", topic: "First aid for an electrical burn", label: "Someone has been burned by an electrical fau", a: 0, bait: 1,
    hook: { en: "Touching them can make you the next casualty", ku: "دەستلێدانیان دەتوانێت تۆش بکاتە قوربانی" },
    q: { en: "Someone has been burned by an electrical fault. What comes first?", ku: "کەسێک بەهۆی کێشەیەکی کارەباوە سووتاوە. چی لە پێشەوەیە؟" },
    o: [
      { en: "Make sure the power is switched off before you touch them", ku: "دڵنیابە کارەبا کوژاوەتەوە پێش ئەوەی دەستیان لێبدەیت" },
      { en: "Pour water on them immediately", ku: "دەستبەجێ ئاویان بەسەردا بڕێژە" },
      { en: "Pull them away by the arm", ku: "بە باڵیانەوە ڕایانبکێشە" },
    ],
    why: { en: "Touching someone who is still in contact with a live current makes you the second casualty. Once it is safe, take off rings, watches and belts near the burn before it swells, then cool it with water for 10 to 15 minutes.", ku: "دەستلێدانی کەسێک کە هێشتا بە کارەبای زیندووەوە لکاوە تۆ دەکاتە قوربانی دووەم." },
    sayA: { en: "Touching them can make you the next casualty. Someone has been burned by an electrical fault. What comes first?", ku: "دەستلێدانیان دەتوانێت تۆش بکاتە قوربانی. کەسێک بەهۆی کێشەیەکی کارەباوە سووتاوە. چی لە پێشەوەیە؟" },
    sayB: { en: "Make sure the power is switched off before you touch them. Touching a live casualty makes you the second victim. 745 more questions, free.", ku: "دڵنیابە کارەبا کوژاوەتەوە پێش ئەوەی دەستیان لێبدەیت. دەستلێدانی کەسێک کە هێشتا بە کارەبای زیندووەوە لکاوە تۆ دەکاتە قوربانی دووەم. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "boiledengine", topic: "What not to do when an engine boils over", label: "The engine has boiled over. What must you NO", a: 0, bait: 2,
    hook: { en: "Never open a boiling radiator", ku: "هەرگیز ڕادیەتەری کوڵاو مەکەرەوە" },
    q: { en: "The engine has boiled over. What must you NOT do?", ku: "بزوێنەر کوڵاوە. چی نابێت بکەیت؟" },
    o: [
      { en: "Open the radiator cap while it is still hot", ku: "سەرپۆشی ڕادیەتەر هەڵبگریت کاتێک هێشتا گەرمە" },
      { en: "Let the engine idle and cool", ku: "با بزوێنەر بە بێکاری کار بکات و سارد ببێتەوە" },
      { en: "Wait before adding water", ku: "پێش زیادکردنی ئاو چاوەڕێ بکە" },
    ],
    why: { en: "A hot system is under pressure. Opening the cap sprays boiling coolant over you. Let it cool, add water after about twenty minutes, and open the cap last.", ku: "سیستەمی گەرم لەژێر پەستاندایە." },
    sayA: { en: "Never open a boiling radiator. The engine has boiled over. What must you not do?", ku: "هەرگیز ڕادیەتەری کوڵاو مەکەرەوە. بزوێنەر کوڵاوە. چی نابێت بکەیت؟" },
    sayB: { en: "Open the radiator cap while it is still hot. A hot system is under pressure and will spray boiling coolant over you. Let it cool first. 745 more questions, free.", ku: "سەرپۆشی ڕادیەتەر هەڵبگریت کاتێک هێشتا گەرمە. سیستەمی گەرم لەژێر پەستاندایە و ئاوی کوڵاوت بەسەردا دەپرژێنێت. با یەکەم سارد ببێتەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "jumpstart", topic: "Where the last clamp goes when jump-starting", label: "You are jump-starting a car. Where does the ", a: 0, bait: 1,
    hook: { en: "The last clamp never touches the battery", ku: "دوایین کێلبە هەرگیز باتری بەرناکەوێت" },
    q: { en: "You are jump-starting a car. Where does the last (black) clamp go?", ku: "خەریکی دانەگیرساندنی ئۆتۆمبیلێکیت. دوایین کێلبەی ڕەش لە کوێ دەبەستێت؟" },
    o: [
      { en: "On a bare metal part of the dead car, not on its battery terminal", ku: "لەسەر بەشێکی کانزایی ڕووتی ئۆتۆمبیلە مردووەکە، نەک لەسەر جەمسەری باتری" },
      { en: "On the negative terminal of the dead battery", ku: "لەسەر جەمسەری نێگەتیڤی باتریی مردوو" },
      { en: "On the positive terminal of the dead battery", ku: "لەسەر جەمسەری پۆزەتیڤی باتریی مردوو" },
    ],
    why: { en: "Red to positive on both, black to negative on the good battery, then the last black clamp to bare metal on the dead car — away from the battery, because a charging battery gives off gas and the final connection can spark.", ku: "سوور بۆ پۆزەتیڤی هەردووکیان، ڕەش بۆ نێگەتیڤی باتریە باشەکە." },
    sayA: { en: "The last clamp never touches the battery. You are jump-starting a car. Where does the last black clamp go?", ku: "دوایین کێلبە هەرگیز باتری بەرناکەوێت. خەریکی دانەگیرساندنی ئۆتۆمبیلێکیت. دوایین کێلبەی ڕەش لە کوێ دەبەستێت؟" },
    sayB: { en: "On a bare metal part of the dead car, not its battery terminal. A charging battery gives off gas and the last connection can spark. 745 more questions, free.", ku: "لەسەر بەشێکی کانزایی ڕووتی ئۆتۆمبیلە مردووەکە، نەک لەسەر جەمسەری باتری. باتریی بارگاوی گاز دەردەکات و پەیوەندیی کۆتایی دەتوانێت بتروسکێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "wheelnuts", topic: "When to loosen wheel nuts before changing a wheel", label: "When changing a wheel, when should you loose", a: 0, bait: 1,
    hook: { en: "Loosen the nuts before you jack it up", ku: "پێش بەرزکردنەوە بولۆنەکان شل بکە" },
    q: { en: "When changing a wheel, when should you loosen the wheel nuts?", ku: "لە کاتی گۆڕینی ویلدا، کەی دەبێت بورغووەکان شل بکەیت؟" },
    o: [
      { en: "Before raising the car with the jack", ku: "پێش بەرزکردنەوەی ئۆتۆمبیلەکە بە جەک" },
      { en: "After the wheel is off the ground", ku: "دوای ئەوەی ویلەکە لە زەوی جیا دەبێتەوە" },
      { en: "It does not matter", ku: "گرنگ نییە" },
    ],
    why: { en: "Loosen them while the tyre still grips the ground, or the wheel simply spins. Then park level, apply the handbrake, chock the wheels, and lay the removed wheel under the car beside the jack.", ku: "پێش بەرزکردنەوەی ئۆتۆمبیلەکە بە جەک. شلیان بکە کاتێک تایەکە هێشتا زەوی دەگرێت." },
    sayA: { en: "Loosen the nuts before you jack it up. When changing a wheel, when should you loosen the wheel nuts?", ku: "پێش بەرزکردنەوە بولۆنەکان شل بکە. لە کاتی گۆڕینی ویلدا، کەی دەبێت بورغووەکان شل بکەیت؟" },
    sayB: { en: "Before raising the car with the jack. Loosen them while the tyre still grips the ground, or the wheel just spins in the air. 745 more questions, free.", ku: "پێش بەرزکردنەوەی ئۆتۆمبیلەکە بە جەک. شلیان بکە کاتێک تایەکە هێشتا زەوی دەگرێت، ئەگەرنا ویلەکە تەنها دەسووڕێتەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "sparetyre", topic: "Fitting a worn spare tyre", label: "Your spare tyre turns out to be worn smooth.", a: 0, bait: 1,
    hook: { en: "A smooth spare is still illegal", ku: "تایەی یەدەگی لووسیش نایاسایییە" },
    q: { en: "Your spare tyre turns out to be worn smooth. May you fit it and drive on?", ku: "دەردەکەوێت تایەی یەدەگەکەت لووس بووە. ئایا دەتوانیت دایبنێیت و بڕۆیت؟" },
    o: [
      { en: "No — a smooth tyre is illegal even as the spare", ku: "نەخێر — تایەی لووس نایاسایییە تەنانەت وەک تایەی یەدەگیش" },
      { en: "Yes, if you inflate it properly", ku: "بەڵێ، ئەگەر بە باشی پڕی بکەیت" },
      { en: "Yes, for up to 24 hours", ku: "بەڵێ، بۆ ماوەی ٢٤ کاتژمێر" },
    ],
    why: { en: "The law sets a minimum tread and makes no exception for a spare. A bald tyre has no grip in the wet whatever wheel it is on.", ku: "یاسا کەمترین نەخش دادەنێت و هیچ جیاوازییەک بۆ تایەی یەدەگ ناکات." },
    sayA: { en: "A smooth spare is still illegal. Your spare tyre turns out to be worn smooth. May you fit it and drive on?", ku: "تایەی یەدەگی لووسیش نایاسایییە. دەردەکەوێت تایەی یەدەگەکەت لووس بووە. ئایا دەتوانیت دایبنێیت و بڕۆیت؟" },
    sayB: { en: "No — a smooth tyre is illegal even as the spare. The law sets a minimum tread with no exception, and a bald tyre has no grip in the wet. 745 more questions, free.", ku: "نەخێر — تایەی لووس نایاسایییە تەنانەت وەک تایەی یەدەگیش. یاسا کەمترین نەخش دادەنێت بەبێ جیاوازی، و تایەی لووس لە شێداریدا هیچ گرتنێکی نییە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "blowout", topic: "What to do on a front tyre blowout", label: "Your FRONT tyre blows out at speed. What do ", a: 0, bait: 1,
    hook: { en: "Don't slam the brake on a front blowout", ku: "لە کاتی تەقینی پێشەوە برێک تووند مەگرە" },
    q: { en: "Your FRONT tyre blows out at speed. What do you do?", ku: "تایەی پێشەوەت بە خێرایی دەتەقێتەوە. چی دەکەیت؟" },
    o: [
      { en: "Grip the wheel firmly, keep straight, ease off, then brake gently", ku: "سوکانەکە بە توندی بگرە، ڕاست بڕۆ، پێ هەڵبگرە، پاشان بە نەرمی برێک بگرە" },
      { en: "Brake hard immediately", ku: "دەستبەجێ بە توندی برێک بگرە" },
      { en: "Pull the handbrake", ku: "هاندبرێک ڕابکێشە" },
    ],
    why: { en: "A front blowout drags the steering. Hold it straight, let the speed fall away, and brake only gently once you are stable.", ku: "تەقینەوەی پێشەوە سوکان ڕادەکێشێت." },
    sayA: { en: "Don't slam the brake on a front blowout. Your front tyre blows out at speed. What do you do?", ku: "لە کاتی تەقینی پێشەوە برێک تووند مەگرە. تایەی پێشەوەت بە خێرایی دەتەقێتەوە. چی دەکەیت؟" },
    sayB: { en: "Grip the wheel firmly, keep straight, ease off, then brake gently. A front blowout drags the steering — hold it straight and let speed fall away first. 745 more questions, free.", ku: "سوکانەکە بە توندی بگرە، ڕاست بڕۆ، پێ هەڵبگرە، پاشان بە نەرمی برێک بگرە. تەقینەوەی پێشەوە سوکان ڕادەکێشێت — ڕاستی بگرە و با خێراییەکە یەکەم بکەوێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "frozenwindscreen", topic: "What not to use to clear a frozen windscreen", label: "The windscreen is frozen. What must you not ", a: 0, bait: 2,
    hook: { en: "Hot water cracks cold glass", ku: "ئاوی گەرم جامی سارد دەتەقێنێت" },
    q: { en: "The windscreen is frozen. What must you not use to clear it?", ku: "جامی پێشەوە بەستووە. بۆ پاککردنەوەی چی نابێت بەکاربهێنیت؟" },
    o: [
      { en: "Very hot water — it can crack the glass", ku: "ئاوی زۆر گەرم — دەتوانێت جامەکە بتەقێنێت" },
      { en: "The car's heater", ku: "گەرمکەرەوەی ئۆتۆمبیلەکە" },
      { en: "A scraper or de-icing spray", ku: "فڵچە یان سپرای بەستنشکێن" },
    ],
    why: { en: "A sudden temperature change across cold glass is exactly what cracks it. Warm the car through, or use a scraper and a proper de-icer — and clear all the windows, not just a porthole in front of you.", ku: "گۆڕانێکی لەناکاوی پلەی گەرمی بەسەر جامی سارددا هەر ئەوەیە کە دەیتەقێنێت." },
    sayA: { en: "Hot water cracks cold glass. The windscreen is frozen. What must you not use to clear it?", ku: "ئاوی گەرم جامی سارد دەتەقێنێت. جامی پێشەوە بەستووە. بۆ پاککردنەوەی چی نابێت بەکاربهێنیت؟" },
    sayB: { en: "Very hot water — it can crack the glass. A sudden temperature change across cold glass is exactly what breaks it; use a scraper instead. 745 more questions, free.", ku: "ئاوی زۆر گەرم — دەتوانێت جامەکە بتەقێنێت. گۆڕانێکی لەناکاوی گەرمی بەسەر جامی سارددا هەر ئەوەیە کە دەیتەقێنێت؛ لەبری ئەوە فڵچە بەکاربهێنە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "headlampcolor", topic: "Required colour of headlamps", label: "What colour must a car's headlamps be?", a: 0, bait: 1,
    hook: { en: "Not every colour is legal on a headlamp", ku: "هەموو ڕەنگێک لەسەر لایت یاسایی نییە" },
    q: { en: "What colour must a car's headlamps be?", ku: "ڕەنگی چراکانی لایتی ئۆتۆمبیل دەبێت چی بێت؟" },
    o: [
      { en: "White", ku: "سپی" },
      { en: "Yellow", ku: "زەرد" },
      { en: "Any colour the owner chooses", ku: "هەر ڕەنگێک کە خاوەنەکە هەڵیبژێرێت" },
    ],
    why: { en: "White, high beam and low. Coloured lamps are reserved for emergency vehicles and confuse everyone else.", ku: "سپی، هەم بەرز هەم نزم." },
    sayA: { en: "Not every colour is legal on a headlamp. What colour must a car's headlamps be?", ku: "هەموو ڕەنگێک لەسەر لایت یاسایی نییە. ڕەنگی چراکانی لایتی ئۆتۆمبیل دەبێت چی بێت؟" },
    sayB: { en: "White. High beam and low beam alike. Coloured lamps are reserved for emergency vehicles and confuse everyone else on the road. 745 more questions, free.", ku: "سپی. هەم بەرز هەم نزم. چرای ڕەنگاوڕەنگ بۆ ئۆتۆمبیلی فریاگوزاری تەرخانکراوە و ئەوانی تر سەرلێشێواو دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "gearlever", topic: "Why not to rest a hand on the gear lever", label: "Why must you never rest your hand on the gea", a: 0, bait: 1,
    hook: { en: "Your hand can shift the gear by accident", ku: "دەستت دەتوانێت گێڕ بەبێ مەبەست بگۆڕێت" },
    q: { en: "Why must you never rest your hand on the gear lever while driving?", ku: "بۆچی هەرگیز نابێت لە کاتی لێخوڕیندا دەستت لەسەر دەسکی گێڕ دابنێیت؟" },
    o: [
      { en: "The pressure can knock the gearbox into neutral", ku: "پەستانەکە دەتوانێت گێڕبۆکس بخاتە بۆشەوە" },
      { en: "It blocks your view of the dashboard", ku: "دیمەنی داشبۆردت دەبەستێت" },
      { en: "It wears out the handbrake", ku: "هاندبڕەیک دەڕووخێنێت" },
    ],
    why: { en: "The same section warns that a wrong gear selection while driving can make you lose control, and that automatics should always be left in P or N when stopped.", ku: "هەمان بەش ئاگادار دەکاتەوە کە هەڵبژاردنی گێڕی هەڵە لە کاتی لێخوڕیندا دەتوانێت کۆنترۆڵت لەدەست بدات." },
    sayA: { en: "Your hand can shift the gear by accident. Why must you never rest your hand on the gear lever while driving?", ku: "دەستت دەتوانێت گێڕ بەبێ مەبەست بگۆڕێت. بۆچی هەرگیز نابێت لە کاتی لێخوڕیندا دەستت لەسەر دەسکی گێڕ دابنێیت؟" },
    sayB: { en: "The pressure can knock the gearbox into neutral. A wrong gear selection while driving can make you lose control of the car. 745 more questions, free.", ku: "پەستانەکە دەتوانێت گێڕبۆکس بخاتە بۆشەوە. هەڵبژاردنی گێڕی هەڵە لە کاتی لێخوڕیندا دەتوانێت کۆنترۆڵت لەدەست بدات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "engineknock", topic: "Cause of engine knock or pinking", label: "The engine knocks or pinks under load. What ", a: 0, bait: 1,
    hook: { en: "Knocking means the wrong fuel", ku: "دەنگی لێدان واتای سووتەمەنی هەڵەیە" },
    q: { en: "The engine knocks or pinks under load. What is the usual cause?", ku: "بزوێنەر لەژێر بارگرانیدا دەنگی لێدان دەردەکات. هۆکارە باوەکەی چییە؟" },
    o: [
      { en: "Petrol of too low an octane rating", ku: "بەنزینی خاوەن ئۆکتانی زۆر نزم" },
      { en: "Too much oil in the sump", ku: "ڕۆنی زۆر لە کارتێردا" },
      { en: "A loose wheel nut", ku: "بولۆنێکی شل لە چەرخدا" },
    ],
    why: { en: "Low-octane fuel ignites too early against the rising piston. Use the grade the manufacturer specifies.", ku: "سووتەمەنی کەم ئۆکتان زوو زیاتر دەگڕێت بەرامبەر پستۆنی سەرکەوتوو." },
    sayA: { en: "Knocking means the wrong fuel. The engine knocks or pinks under load. What is the usual cause?", ku: "دەنگی لێدان واتای سووتەمەنی هەڵەیە. بزوێنەر لەژێر بارگرانیدا دەنگی لێدان دەردەکات. هۆکارە باوەکەی چییە؟" },
    sayB: { en: "Petrol of too low an octane rating. Low-octane fuel ignites too early against the rising piston — use the grade the maker specifies. 745 more questions, free.", ku: "بەنزینی خاوەن ئۆکتانی زۆر نزم. سووتەمەنی کەم ئۆکتان زوو زیاتر دەگڕێت بەرامبەر پستۆنی سەرکەوتوو — ئەو پلەیە بەکاربهێنە کە بەرهەمهێنەر دیاری دەکات. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "insultofficer", topic: "Penalty for insulting or obstructing a traffic officer", label: "What is the penalty for insulting or obstruc", a: 0, bait: 1,
    hook: { en: "Insulting an officer can cost two years", ku: "سووکایەتی بە ئەفسەر دەتوانێت دوو ساڵت بۆ ببڕێت" },
    q: { en: "What is the penalty for insulting or obstructing a traffic officer on duty?", ku: "سزای سووکایەتیکردن یان بەربەستکردنی ئەفسەرێکی هاتوچۆ لە کاتی ئەرکدا چییە؟" },
    o: [
      { en: "Imprisonment for up to two years", ku: "زیندانیکردن بۆ ماوەیەک کە لە دوو ساڵ زیاتر نەبێت" },
      { en: "A small fine only", ku: "تەنها غەرامەیەکی بچووک" },
      { en: "Nothing — it is not an offence", ku: "هیچ — تاوان نییە" },
    ],
    why: { en: "Insulting or obstructing an officer carries up to two years. Assaulting one carries up to three years, and if the assault causes injury, up to five.", ku: "سووکایەتیکردن یان بەربەستکردنی ئەفسەر تا دوو ساڵی لێدەکەوێتەوە." },
    sayA: { en: "Insulting an officer can cost two years. What is the penalty for insulting or obstructing a traffic officer on duty?", ku: "سووکایەتی بە ئەفسەر دەتوانێت دوو ساڵت بۆ ببڕێت. سزای سووکایەتیکردن یان بەربەستکردنی ئەفسەرێکی هاتوچۆ لە کاتی ئەرکدا چییە؟" },
    sayB: { en: "Imprisonment for up to two years. Assaulting an officer carries up to three years, and up to five if the assault causes injury. 745 more questions, free.", ku: "زیندانیکردن بۆ ماوەیەک کە لە دوو ساڵ زیاتر نەبێت. هێرشکردنە سەریان تا سێ ساڵ، و ئەگەر ببێتە هۆی برینداربوون تا پێنج ساڵ. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "parkdownhill", topic: "Handbrake and wheel position parking downhill", label: "You have parked facing DOWNHILL next to a ke", a: 0, bait: 1,
    hook: { en: "Downhill parking needs the wheels turned", ku: "پارککردنی نشێو پێویستی بە سووڕاندنی تایە هەیە" },
    q: { en: "You have parked facing DOWNHILL next to a kerb. What should you do?", ku: "ڕوو لە نشێو لەتەنیشت شۆستەیەک پارکت کردووە. دەبێت چی بکەیت؟" },
    o: [
      { en: "Apply the handbrake and turn the wheels toward the kerb", ku: "برێکی دەستی دابگرە و تایەکان بەرەو شۆستە بسووڕێنە" },
      { en: "Leave it in neutral with the engine running", ku: "لەسەر بۆش بەجێی بهێڵە بە بزوێنەری کارا" },
      { en: "Leave the key in it so it can be moved", ku: "کلیلەکەی تێدا بهێڵە تا بتوانرێت بجووڵێنرێت" },
    ],
    why: { en: "The handbrake plus wheels turned into the kerb means that if the brake fails the kerb stops the car instead of the traffic below. Never leave the key in it, the engine running, or valuables on a seat.", ku: "برێکی دەستی لەگەڵ تایەی بەرەو شۆستە سووڕاوە واتە ئەگەر برێکەکە شکستی هێنا شۆستەکە ئۆتۆمبیلەکە ڕادەگرێت." },
    sayA: { en: "Downhill parking needs the wheels turned. You have parked facing downhill next to a kerb. What should you do?", ku: "پارککردنی نشێو پێویستی بە سووڕاندنی تایە هەیە. ڕوو لە نشێو لەتەنیشت شۆستەیەک پارکت کردووە. دەبێت چی بکەیت؟" },
    sayB: { en: "Apply the handbrake and turn the wheels toward the kerb. If the brake fails, the kerb stops the car instead of the traffic below. 745 more questions, free.", ku: "برێکی دەستی دابگرە و تایەکان بەرەو شۆستە بسووڕێنە. ئەگەر برێکەکە شکستی هێنا، شۆستەکە ئۆتۆمبیلەکە ڕادەگرێت نەک ئەو هاتوچۆیەی خوارەوە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "lorryblindspot", topic: "Why a lorry's blind spot is dangerous to linger in", label: "Why is it especially dangerous to sit beside", a: 0, bait: 2,
    hook: { en: "If you can't see the mirror, they can't see you", ku: "ئەگەر ئاوێنە نەبینیت، ئەویش تۆ نابینێت" },
    q: { en: "Why is it especially dangerous to sit beside a lorry for a long time?", ku: "بۆچی زۆر مەترسیدارە ماوەیەکی درێژ لەتەنیشت بارهەڵگرێکدا بیت؟" },
    o: [
      { en: "A lorry has much larger blind spots than a car, so the driver may not see you at all", ku: "بارهەڵگر ناوچەی مردووی زۆر گەورەتری هەیە لە ئۆتۆمبیل، بۆیە لەوانەیە شۆفێرەکە هیچ نەتبینێت" },
      { en: "Lorries cannot brake at all", ku: "بارهەڵگرەکان هیچ ناتوانن برێک بگرن" },
      { en: "It is not dangerous if you are in your own lane", ku: "مەترسیدار نییە ئەگەر لە ڕێڕەوی خۆتدا بیت" },
    ],
    why: { en: "Sitting higher does not mean seeing more: a lorry's blind spots are wider and longer than a car's. If you cannot see the driver's mirrors, assume they cannot see you — drop back or pass through decisively.", ku: "بەرزتر دانیشتن واتای زیاتر بینین نییە." },
    sayA: { en: "If you can't see the mirror, they can't see you. Why is it especially dangerous to sit beside a lorry for a long time?", ku: "ئەگەر ئاوێنە نەبینیت، ئەویش تۆ نابینێت. بۆچی زۆر مەترسیدارە ماوەیەکی درێژ لەتەنیشت بارهەڵگرێکدا بیت؟" },
    sayB: { en: "A lorry has much larger blind spots, so the driver may not see you at all. If you cannot see the driver's mirrors, assume they cannot see you. 745 more questions, free.", ku: "بارهەڵگر ناوچەی مردووی زۆر گەورەتری هەیە، بۆیە لەوانەیە شۆفێرەکە هیچ نەتبینێت. ئەگەر ئاوێنەکانی نەبینیت، وابزانە ئەویش ناتبینێت. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "overtakecyclist", topic: "Minimum passing distance for a cyclist", label: "How much room must you leave when overtaking", a: 0, bait: 1,
    hook: { en: "Half a metre is not enough room", ku: "نیو مەتر بۆشایی بەس نییە" },
    q: { en: "How much room must you leave when overtaking a cyclist or motorcyclist?", ku: "کاتێک بە پاسکیلسوار یان ماتۆڕسوارێکدا تێدەپەڕیت چەند بۆشایی دەبێت بهێڵیتەوە؟" },
    o: [
      { en: "At least 1.5 metres", ku: "بەلایەنی کەم ١٫٥ مەتر" },
      { en: "Half a metre is enough", ku: "نیو مەتر بەسە" },
      { en: "As little as possible, to pass quickly", ku: "تا دەکرێت کەمتر، بۆ تێپەڕینی خێرا" },
    ],
    why: { en: "A metre and a half gives them room to swerve round a pothole without meeting your car. Expect exactly that swerve, allow for their tyres slipping in rain, and watch their hand signals before you commit.", ku: "بەلایەنی کەم ١٫٥ مەتر. مەتر و نیوێک بۆشاییان پێدەدات بۆ لادان لە چاڵێک." },
    sayA: { en: "Half a metre is not enough room. How much room must you leave when overtaking a cyclist or motorcyclist?", ku: "نیو مەتر بۆشایی بەس نییە. کاتێک بە پاسکیلسوار یان ماتۆڕسوارێکدا تێدەپەڕیت چەند بۆشایی دەبێت بهێڵیتەوە؟" },
    sayB: { en: "At least 1.5 metres. That gives them room to swerve round a pothole without meeting your car — watch their hand signals before you commit. 745 more questions, free.", ku: "بەلایەنی کەم ١٫٥ مەتر. ئەم بۆشاییە ڕێگەیان پێدەدات لادان لە چاڵێک بەبێ ئەوەی بەر ئۆتۆمبیلەکەت بکەون — پێش دەستپێکردن سەیری ئاماژە دەستییەکانیان بکە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "blindcane", topic: "Priority for a blind pedestrian's white cane", label: "A blind pedestrian raises a white cane to cr", a: 0, bait: 1,
    hook: { en: "Never sound the horn near a blind pedestrian", ku: "هەرگیز لەلای پیادەی نابینا بۆڕی مەدە" },
    q: { en: "A blind pedestrian raises a white cane to cross the road. What must drivers do?", ku: "پیادەیەکی نابینا گۆچانی سپی بەرز دەکاتەوە بۆ پەڕینەوەی ڕێگا. شۆفێرەکان دەبێت چی بکەن؟" },
    o: [
      { en: "All drivers must stop and give them priority", ku: "هەموو شۆفێرەکان دەبێت بوەستن و پێشڕەوی پێبدەن" },
      { en: "Sound the horn to warn them", ku: "بۆڕی لێبدەن بۆ ئاگادارکردنەوەیان" },
      { en: "Drive slowly past them", ku: "بەهێواشی بەلایاندا تێبپەڕن" },
    ],
    why: { en: "The raised white cane — white with a red band — is a formal signal that the person is about to cross, and every driver must stop for it. Never use the horn near a blind pedestrian: they navigate by sound, and a horn takes that away exactly when they need it.", ku: "گۆچانی سپیی بەرزکراوە ئاماژەیەکی فەرمییە کە کەسەکە خەریکە دەپەڕێتەوە." },
    sayA: { en: "Never sound the horn near a blind pedestrian. A blind pedestrian raises a white cane to cross the road. What must drivers do?", ku: "هەرگیز لەلای پیادەی نابینا بۆڕی مەدە. پیادەیەکی نابینا گۆچانی سپی بەرز دەکاتەوە بۆ پەڕینەوەی ڕێگا. شۆفێرەکان دەبێت چی بکەن؟" },
    sayB: { en: "All drivers must stop and give them priority. A blind pedestrian navigates by sound, and a horn takes that away exactly when they need it. 745 more questions, free.", ku: "هەموو شۆفێرەکان دەبێت بوەستن و پێشڕەوی پێبدەن. پیادەی نابینا بە دەنگ ڕێگای خۆیان دەدۆزنەوە، و بۆڕی ئەوەیان لێدەسەنێتەوە هەر لەو کاتەدا کە پێویستیانە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "trampriority", topic: "Priority of a tram or rail vehicle", label: "A tram or other rail vehicle is crossing you", a: 0, bait: 2,
    hook: { en: "Rail vehicles always go first", ku: "سوارڕۆی سەر هێڵ هەمیشە یەکەم دەڕوات" },
    q: { en: "A tram or other rail vehicle is crossing your path. Who goes first?", ku: "تراموای یان سوارڕۆیەکی تری سەر هێڵ ڕێگاکەت دەبڕێت. کێ یەکەم دەڕوات؟" },
    o: [
      { en: "The rail vehicle — it has priority over all other traffic", ku: "سوارڕۆی سەر هێڵ — پێشڕەوی هەیە بەسەر هەموو هاتوچۆیەکی تردا" },
      { en: "Whoever is on the main road", ku: "ئەوەی لەسەر ڕێگای سەرەکییە" },
      { en: "You do, if you are already moving", ku: "تۆ، ئەگەر پێشتر دەجووڵێیت" },
    ],
    why: { en: "Rail vehicles have priority over every other vehicle, for a simple reason: they cannot steer around you and need a very long distance to stop.", ku: "سوارڕۆی سەر هێڵ پێشڕەوی هەیە بەسەر هەموو سوارڕۆیەکی تردا." },
    sayA: { en: "Rail vehicles always go first. A tram or other rail vehicle is crossing your path. Who goes first?", ku: "سوارڕۆی سەر هێڵ هەمیشە یەکەم دەڕوات. تراموای یان سوارڕۆیەکی تری سەر هێڵ ڕێگاکەت دەبڕێت. کێ یەکەم دەڕوات؟" },
    sayB: { en: "The rail vehicle — it has priority over all other traffic. It cannot steer around you and needs a very long distance to stop. 745 more questions, free.", ku: "سوارڕۆی سەر هێڵ — پێشڕەوی هەیە بەسەر هەموو هاتوچۆیەکی تردا. ناتوانێت بەلای تۆدا لابدات و دوورییەکی زۆر درێژی دەوێت بۆ وەستان. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },

  {
    id: "parkedcars", topic: "Main danger when passing parked cars", label: "You are passing a line of parked cars at 35-", a: 0, bait: 2,
    hook: { en: "A parked car can open a door on you", ku: "ئۆتۆمبیلی پارککراو دەتوانێت دەرگات بۆ بکاتەوە" },
    q: { en: "You are passing a line of parked cars at 35 to 40 km/h. What is the main danger to watch for?", ku: "بە خێرایی ٣٥-٤٠ کم/کاتژمێر بەلای ڕیزێک ئۆتۆمبیلی پارککراودا تێدەپەڕیت. سەرەکیترین مەترسی چییە کە دەبێت ئاگات لێی بێت؟" },
    o: [
      { en: "A door opening or someone stepping out — leave clearance and be ready to slow", ku: "کرانەوەی دەرگا یان کەسێک کە دەردەچێت — بۆشایی بهێڵە و ئامادە بە بۆ کەمکردنەوەی خێرایی" },
      { en: "Nothing — keep the same speed close to the cars", ku: "هیچ — بەهەمان خێرایی نزیک بە ئۆتۆمبیلەکان بڕۆ" },
      { en: "Speed up to pass them quickly", ku: "خێرایی زیاد بکە بۆ ئەوەی خێرا تێبپەڕیت" },
    ],
    why: { en: "When passing parked cars, a door can open or a person can step out without warning. Leave as much clearance as you safely can, ease off the accelerator, and be ready to stop.", ku: "کاتێک بەلای ئۆتۆمبیلی پارککراودا تێدەپەڕیت، لەوانەیە دەرگایەک بکرێتەوە یان کەسێک بەبێ ئاگادارکردنەوە دەربچێت." },
    sayA: { en: "A parked car can open a door on you. You are passing a line of parked cars at 35 to 40 km/h. What is the main danger to watch for?", ku: "ئۆتۆمبیلی پارککراو دەتوانێت دەرگات بۆ بکاتەوە. بە خێرایی ٣٥-٤٠ کم/کاتژمێر بەلای ڕیزێک ئۆتۆمبیلی پارککراودا تێدەپەڕیت. سەرەکیترین مەترسی چییە؟" },
    sayB: { en: "A door opening or someone stepping out — leave clearance and be ready to slow. This can happen without warning, so ease off the accelerator. 745 more questions, free.", ku: "کرانەوەی دەرگا یان کەسێک کە دەردەچێت — بۆشایی بهێڵە و ئامادە بە بۆ کەمکردنەوەی خێرایی. ئەمە دەتوانێت بەبێ ئاگادارکردنەوە ڕووبدات، بۆیە پێ لە پێدالی خێرایی هەڵبگرە. ٧٤٥ پرسیاری تر، بەخۆڕایی." },
  },
];
