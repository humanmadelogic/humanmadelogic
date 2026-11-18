import authorityKit from '@/config/copy/authority-kit.json';
import guideCitedByChatgpt from '@/config/copy/guide-cited-by-chatgpt.json';
import guideSeoVsAeoVsGeo from '@/config/copy/guide-seo-vs-aeo-vs-geo.json';
import guidesHub from '@/config/copy/guides-hub.json';
import industriesBeautySkincare from '@/config/copy/industries-beauty-skincare.json';
import kitsHub from '@/config/copy/kits-hub.json';
import launchKit from '@/config/copy/launch-kit.json';
import localDominationKit from '@/config/copy/local-domination-kit.json';

export type SeoCopyMap = Record<string, string>;

const COPY_BY_FILENAME: Record<string, SeoCopyMap> = {
  'authority-kit.json': authorityKit,
  'guide-cited-by-chatgpt.json': guideCitedByChatgpt,
  'guide-seo-vs-aeo-vs-geo.json': guideSeoVsAeoVsGeo,
  'guides-hub.json': guidesHub,
  'industries-beauty-skincare.json': industriesBeautySkincare,
  'kits-hub.json': kitsHub,
  'launch-kit.json': launchKit,
  'local-domination-kit.json': localDominationKit,
};

/** Load a parsed SEO copy map by JSON filename (e.g. `kits-hub.json`). */
export function loadCopyMap(filename: string): SeoCopyMap {
  const map = COPY_BY_FILENAME[filename];
  if (!map) {
    throw new Error(
      `Unknown SEO copy file: ${filename}. Expected one of: ${Object.keys(COPY_BY_FILENAME).join(', ')}`,
    );
  }
  return map;
}