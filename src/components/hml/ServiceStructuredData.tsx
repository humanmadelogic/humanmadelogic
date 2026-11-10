import type { ServiceDefinition } from '@/config/services';
import { servicePageGraph } from '@/lib/schema';
import { JsonLd } from './JsonLd';

export function ServiceStructuredData({ service }: { service: ServiceDefinition }) {
  return <JsonLd data={servicePageGraph(service)} />;
}
