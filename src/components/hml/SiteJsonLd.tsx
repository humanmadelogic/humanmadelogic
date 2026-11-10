import { JsonLd } from './JsonLd';
import { siteGraph } from '@/lib/schema';

/** Organization + WebSite graph — mounted once in the root layout. */
export function SiteJsonLd() {
  return <JsonLd data={siteGraph()} />;
}
