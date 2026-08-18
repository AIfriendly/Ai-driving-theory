# Audio drop-in

Empty by design. Put files here and the next render picks them up — nothing
else to configure.

```
public/audio/mirrors-ku.mp3    voiceover for that one clip
public/audio/music.mp3         bed under every clip, at 14% volume
```

The filename must match the composition id exactly: `<hook>-<lang>`, so
`alley-ku.mp3`, `sign-priority-en.mp3`, and so on. `npm run render:all`
rebuilds the manifest before rendering; if you call `npx remotion render`
directly, run `node scripts/build-audio-manifest.mjs` first or your new file
is ignored.

## Do not bake music in for TikTok

Add sound inside TikTok instead. Three reasons, in order of how much they
cost you:

1. TikTok pushes videos that use a **trending sound**. A baked-in track
   forfeits that, and it is the single cheapest distribution lever you have.
2. A licensed track in the file itself can get the video **muted or taken
   down**. In-app audio is already cleared.
3. In-app sound can be swapped per video in seconds; a baked track means a
   re-render.

The `music.mp3` slot exists for **YouTube Shorts and Instagram**, where the
in-app libraries are weaker and a bed helps. Use royalty-free audio you have
the rights to.

## Voiceover: record it yourself

ElevenLabs supports Central Kurdish for speech-to-**text** but not for
text-to-speech. A handful of dedicated Kurdish TTS tools exist, of uncertain
quality. A synthetic Kurdish voice that lands slightly wrong will cost you
credibility with exactly the native speakers you are trying to reach, and
they will say so in the comments.

Your own voice is free, better, and it builds a face for the account. Phone
voice memo in a quiet room is enough — no equipment.

See `../VOICEOVER.md` for the script of each clip, timed to the beats.
