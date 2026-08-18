import {Config} from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");

/* Explicit bitrate, not CRF. CRF targets quality, and this content — flat dark
   background, big static text — is so cheap to encode that CRF 18 landed at
   ~810 kbps. That clears TikTok's 516 kbps in-feed minimum but sits far under
   the 2,000-2,500 they recommend for 1080p, and TikTok re-encodes on upload:
   a thin source gives their encoder little to work with, which shows up as
   banding across the dark background and mush on text edges.
   3 Mbps is ~5.6 MB per clip, nowhere near the 500 MB cap. */
Config.setVideoBitrate("3M");
