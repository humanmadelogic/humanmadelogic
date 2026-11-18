import { kits, kitSlugs } from '@/config/kits';
import { loadCopyMap } from '@/lib/hml/seoCopyTable';
import { kitsHubGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';

export function KitsHubStructuredData() {
  const copy = loadCopyMap('kits-hub.json');
  const kitList = kitSlugs.map((slug) => kits[slug]);
  return (
    <JsonLd
      data={kitsHubGraph({
        name: copy['KITS-META-TITLE'],
        description: copy['KITS-META-DESC'],
        kits: kitList,
      })}
    />
  );
}