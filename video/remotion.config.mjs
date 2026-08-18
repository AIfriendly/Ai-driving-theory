import {Config} from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
/* TikTok re-encodes anyway, but a clean source keeps text edges sharp. */
Config.setCrf(18);
