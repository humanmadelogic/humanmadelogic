/**
 * Crop hero art to OG (1200x630) and index cards (640x480, 1280x960) — no text overlays.
 * Used only when generating derivatives from a hero; final art is shipped via install-blog-art-final.mjs.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function runFfmpeg(args) {
  execFileSync('ffmpeg', ['-y', ...args], { stdio: 'pipe' });
}

/** Center crop to width:height, cover scale. */
export function deriveOgPng(heroPath, outPng) {
  fs.mkdirSync(path.dirname(outPng), { recursive: true });
  runFfmpeg([
    '-i',
    heroPath,
    '-vf',
    'scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630',
    '-frames:v',
    '1',
    outPng,
  ]);
}

export function deriveCardWebp(heroPath, outWebp, width, height) {
  fs.mkdirSync(path.dirname(outWebp), { recursive: true });
  runFfmpeg([
    '-i',
    heroPath,
    '-vf',
    `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`,
    '-frames:v',
    '1',
    outWebp,
  ]);
}