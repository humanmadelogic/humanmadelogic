import { legalWebPageGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';

type Props = {
  path: string;
  name: string;
  description?: string;
};

export function LegalWebPageJsonLd({ path, name, description }: Props) {
  return <JsonLd data={legalWebPageGraph({ path, name, description })} />;
}
