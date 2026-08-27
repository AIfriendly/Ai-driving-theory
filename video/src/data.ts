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
  ku: { a: "٧٤٥ پرسیاری تر — بەخۆڕایی", b: "تیۆریی لێخوڕینی کوردستان · لینک لە بایۆ" },
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
];
