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

  /* ---- batch two ---- */

  {
    id: "hangover", label: "You drank a lot last night. Can you drive to ", a: 0, bait: 1,
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
    id: "helmet", label: "A motorcyclist is injured and unconscious. Th", a: 0, bait: 1,
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
    id: "childseat", label: "Where must a child under 13 travel in a car?", a: 0, bait: 1,
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
    id: "glass", label: "A large piece of glass is embedded deep in a", a: 0, bait: 1,
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
    id: "foglights", label: "Visibility drops below about 100 metres in f", a: 0, bait: 1,
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
    id: "roundabout", label: "You want to take the second exit (straight a", a: 0, bait: 1,
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
    id: "advisory", label: "This warning sign shows bends with '45' bene", a: 0, bait: 1, sign: "bends",
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
    id: "alley", label: "What is the maximum speed in an alley or nar", a: 0, bait: 2,
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
    id: "dazzle", label: "At night an oncoming vehicle keeps its high ", a: 0, bait: 1,
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
    id: "tyredate", label: "A tyre is marked \"DOT ... 0321\". What does 0", a: 0, bait: 1,
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
];
