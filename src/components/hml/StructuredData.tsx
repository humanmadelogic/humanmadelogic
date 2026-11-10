import { homeWebPageGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';

type Props = {
  name: string;
  description: string;
};

/** Home route WebPage JSON-LD (Organization + WebSite live in layout). */
export function StructuredData({ name, description }: Props) {
  return <JsonLd data={homeWebPageGraph({ name, description })} />;
}
